from fastapi import FastAPI, APIRouter, HTTPException, Depends
from fastapi.security import HTTPBasic, HTTPBasicCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone
import secrets

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app
app = FastAPI(title="Red Rocks Carpet Cleaning API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Basic Auth for Admin
security = HTTPBasic()

# Admin credentials (in production, use environment variables)
ADMIN_USERNAME = os.environ.get('ADMIN_USERNAME', 'admin')
ADMIN_PASSWORD = os.environ.get('ADMIN_PASSWORD', '***REMOVED***')

def verify_admin(credentials: HTTPBasicCredentials = Depends(security)):
    correct_username = secrets.compare_digest(credentials.username, ADMIN_USERNAME)
    correct_password = secrets.compare_digest(credentials.password, ADMIN_PASSWORD)
    if not (correct_username and correct_password):
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials",
            headers={"WWW-Authenticate": "Basic"},
        )
    return credentials.username

# Define Models
class QuoteRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    phone: str
    email: Optional[str] = None
    service: str
    message: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class QuoteRequestCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    phone: str = Field(..., min_length=10, max_length=20)
    email: Optional[str] = None
    service: str = Field(..., min_length=2)
    message: Optional[str] = None

class ContactMessage(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    subject: str = Field(..., min_length=2, max_length=200)
    message: str = Field(..., min_length=10)

# Services data
SERVICES = [
    {
        "id": "carpet-cleaning",
        "name": "Carpet Cleaning",
        "shortDescription": "Professional deep cleaning for all carpet types",
        "description": "Our professional carpet cleaning service uses advanced hot water extraction technology to remove deep-seated dirt, allergens, and stains. We treat your carpets with care, using eco-friendly solutions that are safe for your family and pets.",
        "features": [
            "Hot water extraction (steam cleaning)",
            "Pre-treatment of high-traffic areas",
            "Stain and spot removal",
            "Deodorizing treatment",
            "Fast drying time",
            "Pet-safe and eco-friendly products"
        ],
        "image": "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800"
    },
    {
        "id": "upholstery-cleaning",
        "name": "Upholstery Cleaning",
        "shortDescription": "Revitalize your furniture with expert care",
        "description": "Transform your furniture with our professional upholstery cleaning service. We carefully assess fabric types and use appropriate cleaning methods to restore your sofas, chairs, and other upholstered items to their original beauty.",
        "features": [
            "Fabric-specific cleaning methods",
            "Gentle yet effective cleaning",
            "Stain and odor removal",
            "Fabric protection treatment",
            "Quick drying process",
            "Safe for all fabric types"
        ],
        "image": "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"
    },
    {
        "id": "area-rug-cleaning",
        "name": "Area Rug Cleaning",
        "shortDescription": "Specialized care for precious rugs",
        "description": "Your area rugs deserve specialized attention. Whether you have oriental, Persian, or modern rugs, our experts use gentle cleaning techniques that preserve colors and fibers while removing dirt and allergens.",
        "features": [
            "Hand cleaning for delicate rugs",
            "Color-safe cleaning solutions",
            "Fringe cleaning and repair",
            "Dust and allergen removal",
            "Moth and insect treatment",
            "Pick-up and delivery available"
        ],
        "image": "https://images.unsplash.com/photo-1600166898405-da9535204843?w=800"
    },
    {
        "id": "tile-grout-cleaning",
        "name": "Tile & Grout Cleaning",
        "shortDescription": "Restore the shine to your tiles",
        "description": "Dirty grout lines and dull tiles can make any room look tired. Our tile and grout cleaning service uses high-pressure cleaning and professional-grade solutions to restore your floors to their original brilliance.",
        "features": [
            "High-pressure steam cleaning",
            "Grout color restoration",
            "Sealing and protection",
            "Mold and mildew removal",
            "Natural stone safe",
            "Long-lasting results"
        ],
        "image": "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800"
    },
    {
        "id": "wood-floor-cleaning",
        "name": "Wood Floor Cleaning",
        "shortDescription": "Dust-free hardwood restoration",
        "description": "Our advanced Dust-Free Hardwood Floor Cleaning uses specialized techniques and equipment to clean and restore hardwood floors without creating dust or damage. IICRC-certified technicians ensure your floors look stunning.",
        "features": [
            "Dust-free cleaning technology",
            "Deep dirt extraction",
            "Scratch and scuff removal",
            "Polish and shine restoration",
            "Pet stain treatment",
            "Protective coating application"
        ],
        "image": "https://images.unsplash.com/photo-1560184897-502a475f7a0d?w=800"
    },
    {
        "id": "carpet-repair",
        "name": "Carpet Repair",
        "shortDescription": "Expert repairs for damaged carpets",
        "description": "Don't replace your carpet when we can repair it! Our skilled technicians can fix burns, tears, wrinkles, and other damage, extending the life of your carpet and saving you money.",
        "features": [
            "Patch and seam repairs",
            "Burn and tear fixes",
            "Wrinkle and buckle removal",
            "Re-stretching services",
            "Transition repairs",
            "Color matching expertise"
        ],
        "image": "https://images.unsplash.com/photo-1760519663238-6cfdf81416db?w=800"
    },
    {
        "id": "steam-cleaning",
        "name": "Steam Cleaning",
        "shortDescription": "Powerful sanitization for deep clean",
        "description": "Our professional steam cleaning service uses high-temperature steam to sanitize and deep clean surfaces, killing bacteria, dust mites, and allergens without harsh chemicals.",
        "features": [
            "High-temperature sanitization",
            "Chemical-free cleaning option",
            "Allergen elimination",
            "Bacteria and germ removal",
            "Safe for sensitive individuals",
            "Eco-friendly process"
        ],
        "image": "https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800"
    }
]

# Reviews data
REVIEWS = [
    {
        "id": "1",
        "name": "Sarah M.",
        "rating": 5,
        "text": "Absolutely amazing service! The team was professional, polite, and my carpets look brand new. They used advanced equipment and took extra care to protect my furniture. Highly recommend!",
        "service": "Carpet Cleaning",
        "date": "2024-11-15"
    },
    {
        "id": "2",
        "name": "Michael R.",
        "rating": 5,
        "text": "Red Rocks did an incredible job on our upholstery. The sofa had stubborn stains that other cleaners couldn't remove. Their attention to detail is unmatched. Fair pricing too!",
        "service": "Upholstery Cleaning",
        "date": "2024-11-10"
    },
    {
        "id": "3",
        "name": "Jennifer L.",
        "rating": 5,
        "text": "I was impressed by how they protected our home during the cleaning - tarps on the floors, door barriers, corner guards. True professionals who care about their work.",
        "service": "Carpet Cleaning",
        "date": "2024-10-28"
    },
    {
        "id": "4",
        "name": "David K.",
        "rating": 5,
        "text": "The before and after difference on our tile floors was dramatic! The grout lines look white again and the tiles are gleaming. Worth every penny.",
        "service": "Tile & Grout Cleaning",
        "date": "2024-10-20"
    },
    {
        "id": "5",
        "name": "Amanda T.",
        "rating": 5,
        "text": "Best carpet cleaning service in Denver! They used a CRB machine and professional gear that really got deep into the fibers. Carpets haven't looked this good in years.",
        "service": "Carpet Cleaning",
        "date": "2024-10-15"
    },
    {
        "id": "6",
        "name": "Robert H.",
        "rating": 5,
        "text": "Had pet stains that I thought were permanent. Red Rocks worked their magic and now you can't tell there was ever an issue. Efficient, professional, and reasonably priced.",
        "service": "Carpet Cleaning",
        "date": "2024-10-05"
    },
    {
        "id": "7",
        "name": "Lisa W.",
        "rating": 5,
        "text": "Our hardwood floors look absolutely stunning after their dust-free cleaning. The team was punctual, efficient, and left everything spotless. Will definitely use again!",
        "service": "Wood Floor Cleaning",
        "date": "2024-09-28"
    },
    {
        "id": "8",
        "name": "James P.",
        "rating": 5,
        "text": "Five stars isn't enough! From booking to completion, everything was seamless. The technicians explained everything they were doing and the results exceeded expectations.",
        "service": "Steam Cleaning",
        "date": "2024-09-20"
    }
]

# FAQ data
FAQS = [
    {
        "id": "1",
        "question": "Can you give a quote over the phone?",
        "answer": "We can provide a rough approximation over the phone or internet. Exact numbers require an in-person visitation. Please let staff know how often the carpet is deep cleaned and the most recent professional deep cleaning. For upholstery, please also provide a photo and read the care instruction tag to determine whether steam cleaning may be used."
    },
    {
        "id": "2",
        "question": "What is the estimated drying time?",
        "answer": "Thorough, deep steam cleaning leaves carpets or upholstery damp and will naturally dry during the course of the day as Colorado's climate is semi-arid. Most carpets dry within 4-8 hours depending on humidity and ventilation."
    },
    {
        "id": "3",
        "question": "How quickly can I get my carpet or upholstery cleaned?",
        "answer": "In some circumstances we offer same-day cleaning, depending on work demand. We recommend booking a few days in advance to ensure your preferred time slot."
    },
    {
        "id": "4",
        "question": "How many times a year should I have my carpets cleaned?",
        "answer": "Cleaning frequency depends on factors such as the number of occupants, pets, children, footwear, particulate matter, carpet yarn, and carpet age. On average, customers should have carpets and upholstery professionally cleaned twice per year; tile and grout as often as four times per year."
    },
    {
        "id": "5",
        "question": "Can you remove wine, tea, coffee stains?",
        "answer": "As some stains can be permanent, we cannot prematurely promise the entire scope of stain removal. We usually get excellent results if we attempt to remove the stain before anyone else tampers with it. Act quickly and avoid DIY treatments before calling us."
    },
    {
        "id": "6",
        "question": "Can pet odors and urine be removed?",
        "answer": "Provided that pet urine has not percolated beyond the carpet yarns into the padding, or penetrated the semipermeable membrane and hit the subfloor, yes, we usually can neutralize, extract, and deal with most pet odors. We use professional spotters, enzymatic reagents, and extraction techniques specifically designed for urine removal."
    },
    {
        "id": "7",
        "question": "Can steam cleaning damage my carpet?",
        "answer": "Hot water extraction is considered the best method for removing embedded soil and contaminants, with an excellent sanitizing effect. It is the preferred cleaning method by leading carpet manufacturers as synthetic fibers are heat-set well above cleaning temperatures. However, we do not hot-water extract from wool or polypropylene olefin fibers."
    },
    {
        "id": "8",
        "question": "What should I do about the furniture in the room?",
        "answer": "Our staff will happily move any furniture that does not require more than one person. We kindly ask that you remove small objects and breakables before the technicians arrive to ensure efficient service and protect your valuables."
    }
]

# Routes
@api_router.get("/")
async def root():
    return {"message": "Red Rocks Carpet Cleaning API", "status": "online"}

@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

# Quote requests
@api_router.post("/quotes", response_model=QuoteRequest)
async def create_quote_request(input: QuoteRequestCreate):
    quote_dict = input.model_dump()
    quote_obj = QuoteRequest(**quote_dict)
    await db.quotes.insert_one(quote_obj.model_dump())
    return quote_obj

@api_router.get("/quotes", response_model=List[QuoteRequest])
async def get_quote_requests():
    quotes = await db.quotes.find({}, {"_id": 0}).to_list(1000)
    return quotes

# Admin endpoints
@api_router.get("/admin/quotes")
async def get_admin_quotes(username: str = Depends(verify_admin)):
    quotes = await db.quotes.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return quotes

@api_router.put("/admin/quotes/{quote_id}/status")
async def update_quote_status(quote_id: str, status: str, username: str = Depends(verify_admin)):
    result = await db.quotes.update_one(
        {"id": quote_id},
        {"$set": {"status": status}}
    )
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"message": "Status updated", "status": status}

@api_router.delete("/admin/quotes/{quote_id}")
async def delete_quote(quote_id: str, username: str = Depends(verify_admin)):
    result = await db.quotes.delete_one({"id": quote_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"message": "Quote deleted"}

@api_router.get("/admin/contacts")
async def get_admin_contacts(username: str = Depends(verify_admin)):
    contacts = await db.contacts.find({}, {"_id": 0}).sort("created_at", -1).to_list(1000)
    return contacts

@api_router.get("/admin/stats")
async def get_admin_stats(username: str = Depends(verify_admin)):
    total_quotes = await db.quotes.count_documents({})
    new_quotes = await db.quotes.count_documents({"status": "new"})
    contacted_quotes = await db.quotes.count_documents({"status": "contacted"})
    completed_quotes = await db.quotes.count_documents({"status": "completed"})
    return {
        "total": total_quotes,
        "new": new_quotes,
        "contacted": contacted_quotes,
        "completed": completed_quotes
    }

@api_router.post("/admin/verify")
async def verify_admin_credentials(username: str = Depends(verify_admin)):
    return {"authenticated": True, "username": username}

# Contact messages
@api_router.post("/contact", response_model=ContactMessage)
async def create_contact_message(input: ContactMessageCreate):
    contact_dict = input.model_dump()
    contact_obj = ContactMessage(**contact_dict)
    await db.contacts.insert_one(contact_obj.model_dump())
    return contact_obj

@api_router.get("/contact", response_model=List[ContactMessage])
async def get_contact_messages():
    contacts = await db.contacts.find({}, {"_id": 0}).to_list(1000)
    return contacts

# Services
@api_router.get("/services")
async def get_services():
    return SERVICES

@api_router.get("/services/{service_id}")
async def get_service(service_id: str):
    for service in SERVICES:
        if service["id"] == service_id:
            return service
    raise HTTPException(status_code=404, detail="Service not found")

# Reviews
@api_router.get("/reviews")
async def get_reviews():
    return REVIEWS

# FAQs
@api_router.get("/faqs")
async def get_faqs():
    return FAQS

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
