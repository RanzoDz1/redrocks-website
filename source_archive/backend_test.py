import requests
import sys
from datetime import datetime
import json

class RedRocksAPITester:
    def __init__(self, base_url="https://redrocks-premium.preview.emergentagent.com/api"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.failed_tests = []

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        if headers is None:
            headers = {'Content-Type': 'application/json'}

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:200]}...")
                self.failed_tests.append({
                    'name': name,
                    'expected': expected_status,
                    'actual': response.status_code,
                    'response': response.text[:200]
                })

            return success, response.json() if success and response.text else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            self.failed_tests.append({
                'name': name,
                'error': str(e)
            })
            return False, {}

    def test_health_endpoints(self):
        """Test basic health endpoints"""
        print("\n=== TESTING HEALTH ENDPOINTS ===")
        
        # Test root endpoint
        self.run_test("Root Endpoint", "GET", "", 200)
        
        # Test health endpoint
        self.run_test("Health Check", "GET", "health", 200)

    def test_services_endpoints(self):
        """Test services endpoints"""
        print("\n=== TESTING SERVICES ENDPOINTS ===")
        
        # Test get all services
        success, services_data = self.run_test("Get All Services", "GET", "services", 200)
        
        if success and services_data:
            print(f"   Found {len(services_data)} services")
            
            # Test individual service endpoints
            service_ids = ['carpet-cleaning', 'upholstery-cleaning', 'area-rug-cleaning', 
                          'tile-grout-cleaning', 'wood-floor-cleaning', 'carpet-repair', 'steam-cleaning']
            
            for service_id in service_ids:
                self.run_test(f"Get Service: {service_id}", "GET", f"services/{service_id}", 200)
            
            # Test non-existent service
            self.run_test("Get Non-existent Service", "GET", "services/non-existent", 404)

    def test_reviews_endpoint(self):
        """Test reviews endpoint"""
        print("\n=== TESTING REVIEWS ENDPOINT ===")
        
        success, reviews_data = self.run_test("Get All Reviews", "GET", "reviews", 200)
        
        if success and reviews_data:
            print(f"   Found {len(reviews_data)} reviews")

    def test_faqs_endpoint(self):
        """Test FAQs endpoint"""
        print("\n=== TESTING FAQS ENDPOINT ===")
        
        success, faqs_data = self.run_test("Get All FAQs", "GET", "faqs", 200)
        
        if success and faqs_data:
            print(f"   Found {len(faqs_data)} FAQs")

    def test_quotes_endpoints(self):
        """Test quote request endpoints"""
        print("\n=== TESTING QUOTES ENDPOINTS ===")
        
        # Test creating a quote request
        quote_data = {
            "name": "Test User",
            "phone": "3035551234",
            "email": "test@example.com",
            "service": "Carpet Cleaning",
            "message": "Test quote request"
        }
        
        success, response = self.run_test("Create Quote Request", "POST", "quotes", 200, quote_data)
        
        if success:
            print("   Quote created successfully")
        
        # Test with missing required fields
        invalid_quote = {
            "name": "Test User"
            # Missing required fields
        }
        
        self.run_test("Create Invalid Quote", "POST", "quotes", 422, invalid_quote)
        
        # Test getting all quotes
        self.run_test("Get All Quotes", "GET", "quotes", 200)

    def test_contact_endpoints(self):
        """Test contact message endpoints"""
        print("\n=== TESTING CONTACT ENDPOINTS ===")
        
        # Test creating a contact message
        contact_data = {
            "name": "Test User",
            "email": "test@example.com",
            "subject": "Test Subject",
            "message": "This is a test contact message"
        }
        
        success, response = self.run_test("Create Contact Message", "POST", "contact", 200, contact_data)
        
        if success:
            print("   Contact message created successfully")
        
        # Test with invalid email
        invalid_contact = {
            "name": "Test User",
            "email": "invalid-email",
            "subject": "Test",
            "message": "Test message"
        }
        
        self.run_test("Create Invalid Contact", "POST", "contact", 422, invalid_contact)
        
        # Test getting all contact messages
        self.run_test("Get All Contact Messages", "GET", "contact", 200)

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Red Rocks Carpet Cleaning API Tests")
        print(f"Base URL: {self.base_url}")
        
        try:
            self.test_health_endpoints()
            self.test_services_endpoints()
            self.test_reviews_endpoint()
            self.test_faqs_endpoint()
            self.test_quotes_endpoints()
            self.test_contact_endpoints()
            
        except Exception as e:
            print(f"\n❌ Test suite failed with error: {str(e)}")
            return False
        
        # Print summary
        print(f"\n📊 TEST SUMMARY")
        print(f"Tests run: {self.tests_run}")
        print(f"Tests passed: {self.tests_passed}")
        print(f"Tests failed: {self.tests_run - self.tests_passed}")
        print(f"Success rate: {(self.tests_passed / self.tests_run * 100):.1f}%")
        
        if self.failed_tests:
            print(f"\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                error_msg = test.get('error', f"Expected {test.get('expected')}, got {test.get('actual')}")
                print(f"   - {test['name']}: {error_msg}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = RedRocksAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())