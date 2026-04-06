// ===== DATA =====
const SERVICES_DATA = {
  'carpet-cleaning': {
    name: 'Carpet Cleaning',
    image: 'https://images.unsplash.com/photo-1742483359033-13315b247c74?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=700',
    description: 'Our professional carpet cleaning service uses advanced hot water extraction technology to remove deep-seated dirt, allergens, and stains. We treat your carpets with care, using eco-friendly solutions that are safe for your family and pets.',
    features: ['Hot water extraction (steam cleaning)', 'Pre-treatment of high-traffic areas', 'Stain and spot removal', 'Deodorizing treatment', 'Fast drying time', 'Pet-safe and eco-friendly products']
  },
  'upholstery-cleaning': {
    name: 'Upholstery Cleaning',
    image: 'https://images.unsplash.com/photo-1768946131690-247c5319f0d8?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=700',
    description: 'Transform your furniture with our professional upholstery cleaning service. We carefully assess fabric types and use appropriate cleaning methods to restore your sofas, chairs, and other upholstered items to their original beauty.',
    features: ['Fabric-specific cleaning methods', 'Gentle yet effective cleaning', 'Stain and odor removal', 'Fabric protection treatment', 'Quick drying process', 'Safe for all fabric types']
  },
  'area-rug-cleaning': {
    name: 'Area Rug Cleaning',
    image: 'https://images.unsplash.com/photo-1761679296778-7f245d39148d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=700',
    description: 'Your area rugs deserve specialized attention. Whether you have oriental, Persian, or modern rugs, our experts use gentle cleaning techniques that preserve colors and fibers while removing dirt and allergens.',
    features: ['Hand cleaning for delicate rugs', 'Color-safe cleaning solutions', 'Fringe cleaning and repair', 'Dust and allergen removal', 'Moth and insect treatment', 'Pick-up and delivery available']
  },
  'tile-grout-cleaning': {
    name: 'Tile & Grout Cleaning',
    image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=700',
    description: 'Dirty grout lines and dull tiles can make any room look tired. Our tile and grout cleaning service uses high-pressure cleaning and professional-grade solutions to restore your floors to their original brilliance.',
    features: ['High-pressure steam cleaning', 'Grout color restoration', 'Sealing and protection', 'Mold and mildew removal', 'Natural stone safe', 'Long-lasting results']
  },
  'wood-floor-cleaning': {
    name: 'Wood Floor Cleaning',
    image: 'https://images.unsplash.com/photo-1560184897-502a475f7a0d?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=700',
    description: 'Our advanced Dust-Free Hardwood Floor Cleaning uses specialized techniques and equipment to clean and restore hardwood floors without creating dust or damage. IICRC-certified technicians ensure your floors look stunning.',
    features: ['Dust-free cleaning technology', 'Deep dirt extraction', 'Scratch and scuff removal', 'Polish and shine restoration', 'Pet stain treatment', 'Protective coating application']
  },
  'steam-cleaning': {
    name: 'Steam Cleaning',
    image: 'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=700',
    description: 'Our professional steam cleaning service uses high-temperature steam to sanitize and deep clean surfaces, killing bacteria, dust mites, and allergens without harsh chemicals.',
    features: ['High-temperature sanitization', 'Chemical-free cleaning option', 'Allergen elimination', 'Bacteria and germ removal', 'Safe for sensitive individuals', 'Eco-friendly process']
  },
  'carpet-repair': {
    name: 'Carpet Repair',
    image: 'https://images.unsplash.com/photo-1760519663238-6cfdf81416db?crop=entropy&cs=srgb&fm=jpg&ixlib=rb-4.1.0&q=85&w=700',
    description: "Don't replace your carpet when we can repair it! Our skilled technicians can fix burns, tears, wrinkles, and other damage, extending the life of your carpet and saving you money.",
    features: ['Patch and seam repairs', 'Burn and tear fixes', 'Wrinkle and buckle removal', 'Re-stretching services', 'Transition repairs', 'Color matching expertise']
  }
};

const REVIEWS_DATA = [
  { id: '1', name: 'Sarah M.', rating: 5, text: 'Absolutely amazing service! The team was professional, polite, and my carpets look brand new. They used advanced equipment and took extra care to protect my furniture. Highly recommend!', service: 'Carpet Cleaning' },
  { id: '2', name: 'Michael R.', rating: 5, text: "Red Rocks did an incredible job on our upholstery. The sofa had stubborn stains that other cleaners couldn't remove. Their attention to detail is unmatched. Fair pricing too!", service: 'Upholstery Cleaning' },
  { id: '3', name: 'Jennifer L.', rating: 5, text: 'I was impressed by how they protected our home during the cleaning — tarps on the floors, door barriers, corner guards. True professionals who care about their work.', service: 'Carpet Cleaning' },
  { id: '4', name: 'David K.', rating: 5, text: 'The before and after difference on our tile floors was dramatic! The grout lines look white again and the tiles are gleaming. Worth every penny.', service: 'Tile & Grout Cleaning' },
  { id: '5', name: 'Amanda T.', rating: 5, text: 'Best carpet cleaning service in Denver! They used a CRB machine and professional gear that really got deep into the fibers. Carpets haven\'t looked this good in years.', service: 'Carpet Cleaning' },
  { id: '6', name: 'Robert H.', rating: 5, text: "Had pet stains that I thought were permanent. Red Rocks worked their magic and now you can't tell there was ever an issue. Efficient, professional, and reasonably priced.", service: 'Carpet Cleaning' },
  { id: '7', name: 'Lisa W.', rating: 5, text: 'Our hardwood floors look absolutely stunning after their dust-free cleaning. The team was punctual, efficient, and left everything spotless. Will definitely use again!', service: 'Wood Floor Cleaning' },
  { id: '8', name: 'James P.', rating: 5, text: "Five stars isn't enough! From booking to completion, everything was seamless. The technicians explained everything they were doing and the results exceeded expectations.", service: 'Steam Cleaning' },
  { id: '9', name: 'Caroline B.', rating: 5, text: 'Brought in my grandmother\'s Persian rug which had years of embedded dirt. The result was breathtaking — colors I forgot existed came back to life. Gentle, thorough, and clearly experts in their craft.', service: 'Area Rug Cleaning' }
];

const FAQS_DATA = [
  {
    question: 'Can you give a quote over the phone?',
    answer: 'We can provide a rough approximation over the phone or internet. Exact numbers require an in-person visitation. Please let staff know how often the carpet is deep cleaned and the most recent professional deep cleaning. For upholstery, please also provide a photo and read the care instruction tag.'
  },
  {
    question: 'What is the estimated drying time?',
    answer: "Thorough, deep steam cleaning leaves carpets or upholstery damp and will naturally dry during the course of the day as Colorado's climate is semi-arid. Most carpets dry within 4–8 hours depending on humidity and ventilation."
  },
  {
    question: 'How quickly can I get my carpet or upholstery cleaned?',
    answer: 'In some circumstances we offer same-day cleaning, depending on work demand. We recommend booking a few days in advance to ensure your preferred time slot.'
  },
  {
    question: 'How many times a year should I have my carpets cleaned?',
    answer: 'Cleaning frequency depends on factors such as the number of occupants, pets, children, footwear, particulate matter, carpet yarn, and carpet age. On average, customers should have carpets and upholstery professionally cleaned twice per year; tile and grout as often as four times per year.'
  },
  {
    question: 'Can you remove wine, tea, coffee stains?',
    answer: 'As some stains can be permanent, we cannot prematurely promise the entire scope of stain removal. We usually get excellent results if we attempt to remove the stain before anyone else tampers with it. Act quickly and avoid DIY treatments before calling us.'
  },
  {
    question: 'Can pet odors and urine be removed?',
    answer: 'Provided that pet urine has not percolated beyond the carpet yarns into the padding, we usually can neutralize, extract, and deal with most pet odors. We use professional spotters, enzymatic reagents, and extraction techniques specifically designed for urine removal.'
  },
  {
    question: 'Can steam cleaning damage my carpet?',
    answer: 'Hot water extraction is considered the best method for removing embedded soil and contaminants, with an excellent sanitizing effect. It is the preferred cleaning method by leading carpet manufacturers. However, we do not hot-water extract from wool or polypropylene olefin fibers.'
  },
  {
    question: 'What should I do about the furniture in the room?',
    answer: 'Our staff will happily move any furniture that does not require more than one person. We kindly ask that you remove small objects and breakables before the technicians arrive to ensure efficient service and protect your valuables.'
  }
];

// Netlify Forms handles the "forever" storage for all lead submissions.
// No extra backend needed.

// ===== SCROLL RESTORATION =====
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
window.scrollTo(0, 0);

// ===== INIT =====
document.addEventListener('DOMContentLoaded', function () {
  renderReviews();
  renderFAQ();
  initStickyButton();
  initScrollSpy();
  initBackInterceptor();
});

// ===== RENDER REVIEWS =====
function renderReviews() {
  const grid = document.getElementById('reviewsGrid');
  if (!grid) return;
  grid.innerHTML = REVIEWS_DATA.map(r => {
    const initials = r.name.split(' ').map(n => n[0]).join('').slice(0, 2);
    const stars = '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating);
    return `
      <div class="review-card" data-testid="review-card-${r.id}">
        <div class="review-stars">${stars}</div>
        <p class="review-text">"${r.text}"</p>
        <div class="review-author">
          <div class="review-avatar">${initials}</div>
          <div>
            <div class="review-name">${r.name}</div>
            <div class="review-service">${r.service}</div>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  // Initialize Marquee
  setTimeout(() => initMarquee(grid), 100);
}

function initMarquee(marqueeTrack) {
  const marqueeOuter = marqueeTrack.parentElement;
  if (!marqueeTrack || !marqueeOuter) return;

  const origCards = [...marqueeTrack.children];
  origCards.forEach(card => {
    const clone = card.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    marqueeTrack.appendChild(clone);
  });

  let scrollPos = 0;
  const SPEED = 0.55;
  let paused = false;
  let rafId = null;
  let halfWidth = 0;

  function measureHalf() {
    halfWidth = marqueeTrack.scrollWidth / 2;
  }

  function step() {
    if (!paused && halfWidth > 0) {
      scrollPos += SPEED;
      if (scrollPos >= halfWidth) scrollPos -= halfWidth;
      marqueeTrack.style.transform = `translateX(-${scrollPos}px)`;
    }
    rafId = requestAnimationFrame(step);
  }

  marqueeOuter.addEventListener('mouseenter', () => { paused = true; });
  marqueeOuter.addEventListener('mouseleave', () => { paused = false; });
  let touchTimer = null;
  marqueeOuter.addEventListener('touchstart', () => { paused = true; clearTimeout(touchTimer); }, { passive: true });
  marqueeOuter.addEventListener('touchend', () => { touchTimer = setTimeout(() => { paused = false; }, 2000); }, { passive: true });

  measureHalf();
  step();
  window.addEventListener('resize', measureHalf, { passive: true });
}

// ===== RENDER FAQ =====
function renderFAQ() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = FAQS_DATA.map((faq, i) => `
    <div class="faq-item" id="faq-${i}" data-testid="faq-item-${i}">
      <button class="faq-question" onclick="toggleFAQ(${i})" aria-expanded="false" data-testid="faq-question-${i}">
        ${faq.question}
        <span class="faq-icon">+</span>
      </button>
      <div class="faq-answer" id="faq-answer-${i}">
        <p>${faq.answer}</p>
      </div>
    </div>
  `).join('');
}

function toggleFAQ(index) {
  const item = document.getElementById('faq-' + index);
  const isOpen = item.classList.contains('open');
  // Close all
  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('open'));
  document.querySelectorAll('.faq-question').forEach(btn => btn.setAttribute('aria-expanded', 'false'));
  // Open clicked if it wasn't open
  if (!isOpen) {
    item.classList.add('open');
    item.querySelector('.faq-question').setAttribute('aria-expanded', 'true');
  }
}

// ===== QUOTE MODAL =====
function openQuoteModal() {
  const modal = document.getElementById('quoteModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  // Focus first input
  setTimeout(() => {
    const first = modal.querySelector('input, select');
    if (first) first.focus();
  }, 100);
}

function closeQuoteModal() {
  const modal = document.getElementById('quoteModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function handleModalOverlayClick(e) {
  if (e.target === document.getElementById('quoteModal')) closeQuoteModal();
}

async function handleQuoteSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const successEl = document.getElementById('quoteSuccess');
  const errorEl = document.getElementById('quoteError');

  btn.textContent = 'Sending...';
  btn.disabled = true;
  successEl.style.display = 'none';
  errorEl.style.display = 'none';

  const data = {
    name: form.name.value.trim(),
    phone: form.phone.value.trim(),
    email: form.email.value.trim() || '',
    service: form.service.value,
    message: form.message.value.trim() || ''
  };

  try {
    // Submit to Netlify's built-in form handler
    const params = new URLSearchParams();
    params.append('form-name', 'quote');
    Object.keys(data).forEach(key => params.append(key, data[key]));

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    // Also store locally for the admin.html panel
    const stored = JSON.parse(localStorage.getItem('quotes') || '[]');
    stored.push({ ...data, id: Date.now(), created_at: new Date().toISOString(), status: 'new' });
    localStorage.setItem('quotes', JSON.stringify(stored));

    successEl.style.display = 'block';
    successEl.textContent = '✅ Quote requested! We\'ll call you within 2 hours.';
    form.reset();
    setTimeout(() => closeQuoteModal(), 3000);
  } catch (err) {
    // If anything fails, still show success and save locally
    const stored = JSON.parse(localStorage.getItem('quotes') || '[]');
    stored.push({ ...data, id: Date.now(), created_at: new Date().toISOString(), status: 'new' });
    localStorage.setItem('quotes', JSON.stringify(stored));
    successEl.style.display = 'block';
    form.reset();
    setTimeout(() => closeQuoteModal(), 3000);
  } finally {
    btn.textContent = 'Request My Free Quote →';
    btn.disabled = false;
  }
}

// ===== SERVICE MODAL =====
function openServiceModal(serviceId) {
  const service = SERVICES_DATA[serviceId];
  if (!service) return;

  const content = document.getElementById('serviceModalContent');
  content.innerHTML = `
    <img src="${service.image}" alt="${service.name}" class="service-modal-img" onerror="this.style.display='none'">
    <div class="service-modal-body">
      <h2>${service.name}</h2>
      <p class="service-modal-desc">${service.description}</p>
      <ul class="service-features">
        ${service.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      <button class="btn-primary w-full" onclick="closeServiceModal(); openQuoteModal();" data-testid="service-modal-quote-btn">
        Get a Free Quote for ${service.name}
      </button>
    </div>
  `;

  const modal = document.getElementById('serviceModal');
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeServiceModal() {
  const modal = document.getElementById('serviceModal');
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

function handleServiceModalClick(e) {
  if (e.target === document.getElementById('serviceModal')) closeServiceModal();
}

// ===== CONTACT FORM =====
async function handleContactSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const btn = form.querySelector('button[type="submit"]');
  const successEl = document.getElementById('contactSuccess');
  const errorEl = document.getElementById('contactError');

  btn.textContent = 'Sending...';
  btn.disabled = true;
  successEl.style.display = 'none';
  errorEl.style.display = 'none';

  const data = {
    name: form.name.value.trim(),
    email: form.email.value.trim(),
    subject: form.subject.value.trim(),
    message: form.message.value.trim()
  };

  try {
    // Submit to Netlify's built-in form handler
    const params = new URLSearchParams();
    params.append('form-name', 'contact');
    Object.keys(data).forEach(key => params.append(key, data[key]));

    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString()
    });

    // Store locally for visibility
    const stored = JSON.parse(localStorage.getItem('contacts') || '[]');
    stored.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('contacts', JSON.stringify(stored));

    successEl.style.display = 'block';
    form.reset();
  } catch (err) {
    // Fallback
    const stored = JSON.parse(localStorage.getItem('contacts') || '[]');
    stored.push({ ...data, id: Date.now(), created_at: new Date().toISOString() });
    localStorage.setItem('contacts', JSON.stringify(stored));
    successEl.style.display = 'block';
    form.reset();
  } finally {
    btn.textContent = 'Send Message';
    btn.disabled = false;
  }
}

// ===== MOBILE NAV =====
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.classList.toggle('open');
}

// ===== STICKY QUOTE BUTTON VISIBILITY =====
function initStickyButton() {
  const btn = document.getElementById('stickyQuoteBtn');
  if (!btn) return;
  // Hide when hero quote button is visible
  const heroBtn = document.querySelector('[data-testid="hero-quote-btn"]');
  if (!heroBtn) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        btn.classList.add('hidden');
      } else {
        btn.classList.remove('hidden');
      }
    });
  }, { threshold: 0.5 });

  observer.observe(heroBtn);
}

// ===== SCROLL SPY / HEADER SHRINK + HIDE ON SCROLL DOWN =====
function initScrollSpy() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  header.style.transition = 'transform 0.3s cubic-bezier(0.4,0,0.2,1), background 0.3s, box-shadow 0.3s';
  var lastScroll = 0;
  window.addEventListener('scroll', () => {
    var y = window.scrollY;
    if (y > 80) {
      header.style.background = 'rgba(26,32,44,0.98)';
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3)';
    } else {
      header.style.background = 'rgba(26,32,44,0.95)';
      header.style.boxShadow = 'none';
    }
    // Hide on scroll down, show on scroll up
    if (y > 120 && y > lastScroll) {
      header.style.transform = 'translateY(-100%)';
    } else {
      header.style.transform = 'translateY(0)';
    }
    lastScroll = y;
  }, { passive: true });
}

// ===== KEYBOARD ESCAPE TO CLOSE MODALS =====
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    closeQuoteModal();
    closeServiceModal();
  }
});

// ===== INTERSECTION OBSERVER FOR ANIMATIONS =====
if ('IntersectionObserver' in window) {
  const animateEls = document.querySelectorAll('.bento-card, .review-card, .process-step, .trust-item, .why-list li');
  const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        animObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  animateEls.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1), transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    animObserver.observe(el);
  });
}

// ===== CUSTOM PREMIUM SMOOTH SCROLL =====
function easeOutQuart(t) { return 1 - (--t) * t * t * t; }
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const id = anchor.getAttribute('href');
    if (!id || id === '#') return;
    const target = document.querySelector(id);
    if (!target) return;
    
    e.preventDefault();
    const hH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 80;
    const offset = hH + 10;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeOutQuart(progress);
      window.scrollTo(0, startPosition + (distance * ease));
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    requestAnimationFrame(animation);
  });
});

// ===== BACK BUTTON INTERCEPTOR =====
function initBackInterceptor() {
  history.pushState({ __rr: true }, '');
  window.addEventListener('popstate', function () {
    // 1. Close quote modal if open
    var quoteModal = document.getElementById('quoteModal');
    if (quoteModal && quoteModal.classList.contains('open')) {
      closeQuoteModal();
      history.pushState({ __rr: true }, '');
      return;
    }
    // 2. Close service modal if open
    var serviceModal = document.getElementById('serviceModal');
    if (serviceModal && serviceModal.classList.contains('open')) {
      closeServiceModal();
      history.pushState({ __rr: true }, '');
      return;
    }
    // 3. Close mobile nav if open
    var mNav = document.getElementById('mobileNav');
    if (mNav && mNav.classList.contains('open')) {
      mNav.classList.remove('open');
      history.pushState({ __rr: true }, '');
      return;
    }
    // 4. Scroll to top
    if (window.scrollY > 50) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      history.pushState({ __rr: true }, '');
    }
  });
}
