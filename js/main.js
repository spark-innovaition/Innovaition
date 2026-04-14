// ===== GSAP SETUP =====
gsap.registerPlugin(ScrollTrigger);

// ===== NAVBAR SCROLL =====
const navbar = document.querySelector('.navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ===== FULL SCREEN MENU OVERLAY LOGIC =====
const menuBtn = document.querySelector('.menu-btn');
const menuOverlay = document.querySelector('.menu-overlay');
const menuLinks = document.querySelectorAll('.menu-nav-item a');
const btnText = menuBtn ? menuBtn.querySelector('span') : null;
const btnIcon = menuBtn ? menuBtn.querySelector('i') : null;
let isMenuOpen = false;

const menuTl = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

menuTl.from(".menu-nav-item", {
  y: 50,
  opacity: 0,
  duration: 0.6,
  stagger: 0.1
}, 0.3)
.from(".menu-info-top, .location-block, .contact-block, .menu-social-row a", {
  y: 30,
  opacity: 0,
  duration: 0.6,
  stagger: 0.05
}, 0.4);

if (menuBtn && menuOverlay) {
  menuBtn.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    
    if (isMenuOpen) {
      menuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
      if(btnText) btnText.textContent = 'CLOSE';
      if(btnIcon) {
        btnIcon.classList.remove('fa-bars');
        btnIcon.classList.add('fa-xmark');
      }
      menuTl.timeScale(1).play();
    } else {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if(btnText) btnText.textContent = 'MENU';
      if(btnIcon) {
        btnIcon.classList.remove('fa-xmark');
        btnIcon.classList.add('fa-bars');
      }
      menuTl.timeScale(2).reverse();
    }
  });

  menuLinks.forEach(link => {
    link.addEventListener('click', () => {
      isMenuOpen = false;
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if(btnText) btnText.textContent = 'MENU';
      if(btnIcon) {
        btnIcon.classList.remove('fa-xmark');
        btnIcon.classList.add('fa-bars');
      }
      menuTl.timeScale(2).reverse();
    });
  });
}

// ===== HERO & MENU TIME =====
function updateTime() {
  const now = new Date();
  const timeStr = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute:'2-digit' });
  
  const heroEl = document.getElementById('heroTime');
  const menuEl = document.getElementById('menuTime');
  const contactEl = document.getElementById('contactTime'); 
  
  if (heroEl) heroEl.textContent = timeStr;
  if (menuEl) menuEl.textContent = timeStr;
  if (contactEl) contactEl.textContent = timeStr;
}
updateTime();
setInterval(updateTime, 1000);

// ===== INTERACTIVE SPOTLIGHT =====
const spotlight = document.querySelector('.hero-spotlight');
const heroEl = document.querySelector('.hero');

if (spotlight && heroEl) {
  heroEl.addEventListener('mouseenter', () => spotlight.classList.add('active'));
  heroEl.addEventListener('mouseleave', () => spotlight.classList.remove('active'));

  heroEl.addEventListener('mousemove', (e) => {
    const rect = heroEl.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlight.style.setProperty('--spotlight-x', x + '%');
    spotlight.style.setProperty('--spotlight-y', y + '%');
  });
}

// ===== INITIAL LOAD ANIMATIONS =====
window.addEventListener('load', () => {
  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.from(".global-grid .grid-line", { scaleY: 0, transformOrigin: "top", duration: 1.5, stagger: 0.2 })
    .from(".navbar", { y: -80, opacity: 0, duration: 1 }, "-=1")
    .from(".hero-title-row", { y: 100, opacity: 0, duration: 1.2, stagger: 0.15 }, "-=0.5")
    .from(".gs-reveal", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1 }, "-=0.8");
});

// ===== GSAP SCROLL REVEAL =====
gsap.utils.toArray(".gs-reveal-up").forEach(elem => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 85%", 
      toggleActions: "play none none none"
    },
    y: 60,
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
});

gsap.utils.toArray(".gs-reveal").forEach(elem => {
  gsap.from(elem, {
    scrollTrigger: {
      trigger: elem,
      start: "top 85%", 
    },
    opacity: 0,
    duration: 1,
    ease: "power3.out"
  });
});

// ===== WHY PARTNER GRID STAGGER ANIMATION =====
const whyGrid = document.querySelector('.why-grid');
if (whyGrid) {
  const whyCards = whyGrid.querySelectorAll('.why-card');
  gsap.from(whyCards, {
    scrollTrigger: {
      trigger: whyGrid,
      start: "top 80%", 
      toggleActions: "play none none none"
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15, 
    ease: "power3.out"
  });
}

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = parseInt(counter.dataset.target);
      let current = 0;
      const increment = target / 60;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 25);
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });
counters.forEach(c => counterObserver.observe(c));

// ===== PRICING TOGGLE =====
const pricingToggle = document.getElementById('pricingToggle');
const toggleLabels = document.querySelectorAll('.toggle-label');
const periods = document.querySelectorAll('.period');

if (pricingToggle && toggleLabels.length > 0) {
  pricingToggle.addEventListener('change', () => {
    const isYearly = pricingToggle.checked;
    toggleLabels.forEach(l => l.classList.remove('active'));
    toggleLabels[isYearly ? 1 : 0].classList.add('active');

    document.querySelectorAll('.amount[data-monthly]').forEach(a => {
      a.textContent = isYearly ? a.dataset.yearly : a.dataset.monthly;
    });

    periods.forEach(p => {
      p.textContent = isYearly ? '/Per year' : '/Per month';
    });
  });
}

// ===== SERVICE-BASED PRICING TABS =====
const pricingData = {
  strategy: {
    starter: {
      desc: 'For businesses exploring their AI strategy.',
      monthly: '800', yearly: '8,500',
      features: [
        'AI readiness assessment',
        'Opportunity mapping',
        '2 strategy consultation sessions',
        'Basic strategic roadmap',
        'Market benchmarking report'
      ]
    },
    growth: {
      desc: 'For companies ready to scale their AI vision.',
      monthly: '2,000', yearly: '20,000',
      features: [
        'Custom AI strategy design',
        'Competitive landscape analysis',
        '90-day implementation roadmap',
        'Team alignment workshops',
        'Quarterly strategy reviews',
        'KPI & success metrics development'
      ]
    },
    enterprise: {
      desc: 'Full strategic engagement at enterprise scale.',
      features: [
        'Executive AI advisory program',
        'Board-level reporting & insights',
        'Ongoing strategic partnership',
        'Priority access & dedicated support'
      ]
    }
  },
  automation: {
    starter: {
      desc: 'Automate your most critical manual processes.',
      monthly: '1,200', yearly: '12,000',
      features: [
        'Up to 3 workflow automations',
        'Basic system integrations',
        'Process mapping & documentation',
        '30-day setup & deployment',
        'Basic monitoring & alerts'
      ]
    },
    growth: {
      desc: 'Comprehensive automation for growing teams.',
      monthly: '2,800', yearly: '28,000',
      features: [
        'Up to 15 workflow automations',
        'Custom triggers & conditional logic',
        'Real-time monitoring dashboard',
        'API & third-party integrations',
        'Monthly performance reporting',
        'Ongoing optimization support'
      ]
    },
    enterprise: {
      desc: 'End-to-end automation transformation at scale.',
      features: [
        'Unlimited workflow automations',
        'Custom workflow development',
        'Dedicated automation engineer',
        '24/7 monitoring & incident response'
      ]
    }
  },
  tools: {
    starter: {
      desc: 'Start leveraging AI tools in your existing stack.',
      monthly: '1,500', yearly: '15,000',
      features: [
        '1–2 AI tool integrations',
        'Setup & full configuration',
        'Staff onboarding & training',
        'Performance tracking setup',
        '30-day post-launch support'
      ]
    },
    growth: {
      desc: 'Build a connected multi-tool AI ecosystem.',
      monthly: '3,200', yearly: '32,000',
      features: [
        'Up to 5 AI tool integrations',
        'Custom connectors & middleware',
        'Performance optimization',
        'Advanced team training',
        'Quarterly tech stack reviews',
        'Priority technical support'
      ]
    },
    enterprise: {
      desc: 'Full AI technology stack for large organizations.',
      features: [
        'Unlimited AI integrations',
        'Custom AI development',
        'Dedicated integration specialist',
        'Enterprise SLA guarantees'
      ]
    }
  },
  data: {
    starter: {
      desc: 'Get your data organized and AI-ready.',
      monthly: '1,000', yearly: '10,000',
      features: [
        'Data audit & quality assessment',
        'Basic pipeline setup',
        'Reporting dashboard (1 view)',
        'Data governance basics',
        'Team data literacy training'
      ]
    },
    growth: {
      desc: 'Build a scalable, insight-driven data foundation.',
      monthly: '2,400', yearly: '24,000',
      features: [
        'Data architecture design',
        'ETL pipeline development',
        'Analytics platform setup',
        'Data quality framework',
        'Business intelligence dashboards',
        'Monthly data health reports'
      ]
    },
    enterprise: {
      desc: 'Enterprise-grade data platform built for scale.',
      features: [
        'Full data platform engineering',
        'ML-ready infrastructure',
        'Data governance framework',
        'Real-time analytics capabilities',
        'Dedicated data engineer'
      ]
    }
  }
};

function updatePricingPanel(serviceKey) {
  const data = pricingData[serviceKey];
  if (!data) return;
  const isYearly = pricingToggle && pricingToggle.checked;

  const buildFeatures = list =>
    list.map(f => `<li><i class="fa-solid fa-chevron-right"></i> ${f}</li>`).join('');

  const starterCard = document.getElementById('pcard-starter');
  if (starterCard) {
    starterCard.querySelector('.p-plan-desc').textContent = data.starter.desc;
    const amt = starterCard.querySelector('.amount');
    amt.dataset.monthly = data.starter.monthly;
    amt.dataset.yearly  = data.starter.yearly;
    amt.textContent = isYearly ? data.starter.yearly : data.starter.monthly;
    starterCard.querySelector('.p-features').innerHTML = buildFeatures(data.starter.features);
  }

  const growthCard = document.getElementById('pcard-growth');
  if (growthCard) {
    growthCard.querySelector('.p-plan-desc').textContent = data.growth.desc;
    const amt = growthCard.querySelector('.amount');
    amt.dataset.monthly = data.growth.monthly;
    amt.dataset.yearly  = data.growth.yearly;
    amt.textContent = isYearly ? data.growth.yearly : data.growth.monthly;
    growthCard.querySelector('.p-features').innerHTML = buildFeatures(data.growth.features);
  }

  const enterpriseCard = document.getElementById('pcard-enterprise');
  if (enterpriseCard) {
    enterpriseCard.querySelector('.p-plan-desc').textContent = data.enterprise.desc;
    enterpriseCard.querySelector('.p-features').innerHTML = buildFeatures(data.enterprise.features);
  }
}

const svcTabs = document.querySelectorAll('.svc-tab');
if (svcTabs.length > 0) {
  svcTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      svcTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      updatePricingPanel(tab.dataset.panel);
    });
  });
}

// ===== HOVER ACCORDION =====
const accordionItems = document.querySelectorAll('.accordion-item');
if (accordionItems.length > 0) {
  accordionItems.forEach(item => {
    item.addEventListener('mouseenter', function() {
      accordionItems.forEach(el => el.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

// ===== CASE STUDY FOLDER IMAGE SWAP =====
const listItems = document.querySelectorAll('.cs-list-item');
const folderImage = document.querySelector('.folder-image');

if (listItems.length > 0 && folderImage) {
  listItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const newSrc = item.getAttribute('data-img');
      if (newSrc && folderImage.src !== newSrc) {
        gsap.to(folderImage, {
          opacity: 0,
          duration: 0.15,
          onComplete: () => {
            folderImage.src = newSrc;
            gsap.to(folderImage, { opacity: 1, duration: 0.15 });
          }
        });
      }
    });
  });
}

// ===== IMPACT SECTION ANIMATION =====
const impactWrap = document.querySelector('#impact-text-wrap');
const impactLogos = gsap.utils.toArray('.client-logo-item');

if (impactWrap && impactLogos.length > 0) {
  gsap.from(impactWrap.children, {
    scrollTrigger: {
      trigger: ".impact-section",
      start: "top 70%",
    },
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out"
  });

  gsap.from(impactLogos, {
    scrollTrigger: {
      trigger: "#impact-logo-grid",
      start: "top 85%",
    },
    opacity: 0,
    y: 20,
    duration: 0.6,
    stagger: 0.05,
    ease: "power2.out"
  });
}

// ===== BENTO GRID ANIMATION =====
const bentoGrid = document.querySelector('.bento-grid');
if (bentoGrid) {
  gsap.from(bentoGrid.querySelectorAll('.bento-card, .bento-split-col > div'), {
    scrollTrigger: {
      trigger: bentoGrid,
      start: "top 80%",
    },
    y: 60,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    ease: "power3.out"
  });
}

// ===== TIMELINE CAROUSEL =====
const tlTrack = document.getElementById('timelineTrack');
const tlPrev = document.getElementById('tlPrev');
const tlNext = document.getElementById('tlNext');
let tlIndex = 0;

if (tlTrack && tlPrev && tlNext) {
  const tlCards = tlTrack.querySelectorAll('.tl-card');
  
  function updateTlCarousel() {
    const cardsPerView = window.innerWidth <= 600 ? 1 : 2;
    const maxIndex = tlCards.length - cardsPerView;
    
    tlIndex = Math.max(0, Math.min(tlIndex, maxIndex));
    
    const cardPercentage = 100 / cardsPerView;
    tlTrack.style.transform = `translateX(-${tlIndex * cardPercentage}%)`;
    
    tlPrev.style.opacity = tlIndex === 0 ? '0.5' : '1';
    tlPrev.style.cursor = tlIndex === 0 ? 'not-allowed' : 'pointer';
    
    tlNext.style.opacity = tlIndex === maxIndex ? '0.5' : '1';
    tlNext.style.cursor = tlIndex === maxIndex ? 'not-allowed' : 'pointer';
  }

  tlNext.addEventListener('click', () => {
    const cardsPerView = window.innerWidth <= 600 ? 1 : 2;
    if (tlIndex < tlCards.length - cardsPerView) {
      tlIndex++;
      updateTlCarousel();
    }
  });

  tlPrev.addEventListener('click', () => {
    if (tlIndex > 0) {
      tlIndex--;
      updateTlCarousel();
    }
  });

  window.addEventListener('resize', updateTlCarousel);
  updateTlCarousel(); 
}

// ===== PRICING CARDS REVEAL =====
const pricingCards = gsap.utils.toArray('.p-card-anim');
if (pricingCards.length > 0) {
  gsap.from(pricingCards, {
    scrollTrigger: {
      trigger: ".pricing-grid",
      start: "top 80%",
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "power3.out"
  });
}

// ===== FAQ ACCORDION LOGIC =====
const questionItems = document.querySelectorAll('.faq-question-item');
const answerTexts = document.querySelectorAll('.faq-answer-text');

if (questionItems.length > 0) {
  questionItems.forEach(item => {
    item.addEventListener('click', () => {
      if (item.classList.contains('active')) return;

      const targetId = item.getAttribute('data-target');

      questionItems.forEach(q => {
        q.classList.remove('active');
        const icon = q.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-minus');
          icon.classList.add('fa-plus');
        }
      });

      answerTexts.forEach(a => {
        a.classList.remove('active');
      });

      item.classList.add('active');
      const activeIcon = item.querySelector('i');
      if (activeIcon) {
        activeIcon.classList.remove('fa-plus');
        activeIcon.classList.add('fa-minus');
      }

      const targetAnswer = document.getElementById(targetId);
      if (targetAnswer) {
        targetAnswer.classList.add('active');
      }
    });
  });
}

// ===== ABOUT PAGE PARALLAX EFFECT =====
const parallaxImages = gsap.utils.toArray('.parallax-img');
if (parallaxImages.length > 0) {
  parallaxImages.forEach(img => {
    gsap.to(img, {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: img.parentElement,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  });
}

// ===== MASSIVE TEXT REVEAL SCROLL ANIMATION =====
const revealText = document.getElementById('reveal-text');
if (revealText) {
  const text = revealText.innerText;
  revealText.innerHTML = '';
  const words = text.split(' ');
  words.forEach((word, i) => {
    const span = document.createElement('span');
    span.innerText = word + (i < words.length - 1 ? ' ' : '');
    span.style.color = 'rgba(255, 255, 255, 0.15)'; 
    revealText.appendChild(span);
  });

  gsap.to('#reveal-text span', {
    color: '#ffffff',
    stagger: 0.1,
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: '#statement-sec',
      start: 'top 60%',
      end: 'bottom 70%',
      scrub: true
    }
  });
}

// ===== CONTACT TITLE ROTATING TEXT (SPRING ANIM) ====
const rotTexts = gsap.utils.toArray('.rot-text');
if (rotTexts.length > 0) {
  let currentIndex = 0;
  gsap.set(rotTexts, { y: 150, opacity: 0 });
  gsap.set(rotTexts[0], { y: 0, opacity: 1 });

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % rotTexts.length;
    gsap.to(rotTexts[currentIndex], { y: -150, opacity: 0, duration: 0.6, ease: "power2.in" });
    gsap.fromTo(rotTexts[nextIndex], 
      { y: 150, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "back.out(1.5)", delay: 0.1 }
    );
    currentIndex = nextIndex;
  }, 2000); 
}

// ===== LAMP EFFECT ANIMATION LOGIC =====
const lampContainer = document.querySelector('.lamp-container');
if (lampContainer) {
  gsap.set('.lamp-glow-main', { autoAlpha: 0, width: "14rem" });
  gsap.set('.lamp-glow-oval', { autoAlpha: 0, width: "8rem" });
  gsap.set('.lamp-line', { autoAlpha: 0, width: "15rem" });
  gsap.set('.lamp-cone', { autoAlpha: 0, width: "15rem" });
  gsap.set('.gs-lamp-content', { autoAlpha: 0, y: 100 });

  const lampTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about-hero-sec",
      start: "top 80%",
      once: true
    },
    defaults: { ease: "power2.inOut", duration: 0.8 }
  });

  lampTl.to('.lamp-glow-main', { autoAlpha: 0.8, width: "28rem" }, 0.3)
        .to('.lamp-glow-oval', { autoAlpha: 1, width: "16rem" }, 0.3)
        .to('.lamp-line', { autoAlpha: 1, width: "30rem" }, 0.3)
        .to('.lamp-cone', { autoAlpha: 1, width: "30rem" }, 0.3)
        .to('.gs-lamp-content', { autoAlpha: 1, y: 0 }, 0.3);
}


// =================================================================
// ===== ALL PINNED SCROLLTRIGGERS (DESKTOP/TABLET ONLY)       =====
// =================================================================
window.addEventListener('load', () => {

  // Create a GSAP MatchMedia instance
  let mm = gsap.matchMedia();

  // ONLY run these pinning animations on screens WIDER than 768px
  mm.add("(min-width: 769px)", () => {

    // 1. FLOATING CARDS ANIMATION (Phase 3 - Home Page)
    const cards = gsap.utils.toArray('.anim-card');
    const phase3Pin = document.querySelector('#phase3-pin-wrapper'); 

    if (cards.length > 0 && phase3Pin) {
        gsap.set([cards[0], cards[1], cards[3], cards[4]], { scale: 1, xPercent: 0, yPercent: 0, rotation: 0, autoAlpha: 0 });

        const cardsTl = gsap.timeline({
            scrollTrigger: {
                trigger: phase3Pin,
                start: "top top",
                end: "+=200%", 
                pin: true,
                scrub: 1
            }
        });

// Reduces the spread and rotation slightly so they don't clash aggressively
cardsTl.to([cards[0], cards[1], cards[3], cards[4]], { autoAlpha: 1, duration: 0.1 }, 0)
       .to(cards[0], { xPercent: -130, rotation: -15, scale: 0.9, duration: 1 }, 0)
       .to(cards[1], { xPercent: -65,  rotation: -8,  scale: 0.95, duration: 1 }, 0)
       .to(cards[3], { xPercent: 65,   rotation: 8,   scale: 0.95, duration: 1 }, 0)
       .to(cards[4], { xPercent: 130,  rotation: 15,  scale: 0.9, duration: 1 }, 0);
    }

    // SEAMLESS CROSS-SECTION PIN (Home Page)
    const aboutCardWrapper = document.querySelector(".about-card-wrapper");
    if (aboutCardWrapper && phase3Pin) {
      ScrollTrigger.create({
        trigger: ".about-card-wrapper", 
        start: "center center", 
        endTrigger: "#phase3-pin-wrapper",
        end: "bottom bottom", 
        pin: true,
        pinSpacing: false, 
      });
    }

    // 2. PROCESS CARDS ANIMATION (Home Page)
    const processWrapper = document.querySelector('#process-pin-wrapper');
    const processCards = gsap.utils.toArray('.process-card');

    if (processWrapper && processCards.length > 0) {
      // Set initial state: Card 1 visible, others hidden and shifted down
      gsap.set(processCards[0], { autoAlpha: 1, y: 0 });
      gsap.set(processCards.slice(1), { autoAlpha: 0, y: 40 });

      const processTl = gsap.timeline({
        scrollTrigger: {
          trigger: processWrapper,
          start: "top top",
          end: "+=400%", // Extended for smoother transitions across all 4 cards
          pin: true,
          scrub: 1
        }
      });

      processCards.forEach((card, i) => {
        // Animate the next card in
        if (i > 0) {
          processTl.to(card, { 
            autoAlpha: 1, 
            y: 0, 
            duration: 1 
          }, i * 1.5); // Staggered entry
        }
        
        // Animate the current card out (except for the last card)
        if (i !== processCards.length - 1) {
          processTl.to(card, { 
            autoAlpha: 0, 
            y: -40, // Shift up slightly as it disappears to prevent clipping
            scale: 0.95, 
            duration: 1 
          }, (i + 1) * 1.5 - 0.5); 
        }
      });
    }

    // 3. SPLIT SCREEN PINNED SCROLL (Services Page)
    const splitWrapper = document.querySelector('#split-pin-wrapper');
    const splitTexts = gsap.utils.toArray('.split-text-item');
    const splitCards = gsap.utils.toArray('.split-card-item');

    if (splitWrapper && splitTexts.length > 0 && splitCards.length > 0) {
      gsap.set(splitTexts, { autoAlpha: 0, yPercent: 100 }); 
      gsap.set(splitCards, { autoAlpha: 0, yPercent: -100 }); 
      gsap.set(splitTexts[0], { autoAlpha: 1, yPercent: 0 });
      gsap.set(splitCards[0], { autoAlpha: 1, yPercent: 0 });

      const splitTl = gsap.timeline({
        scrollTrigger: {
          trigger: splitWrapper,
          start: "top top",
          end: "+=300%", 
          pin: true,
          scrub: 1
        }
      });

      for (let i = 0; i < splitTexts.length - 1; i++) {
        splitTl
          .to(splitTexts[i], { autoAlpha: 0, yPercent: -100, duration: 1 }, i)
          .to(splitCards[i], { autoAlpha: 0, yPercent: 100, duration: 1 }, i)
          .to(splitTexts[i + 1], { autoAlpha: 1, yPercent: 0, duration: 1 }, i)
          .to(splitCards[i + 1], { autoAlpha: 1, yPercent: 0, duration: 1 }, i);
      }
    }

    // Call refresh after pinning is initialized
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
  });
});

// ====================================================
// ===== ISOLATED THREE.JS CANVAS ENGINES         =====
// ====================================================

// 1. SERVICES HERO: 3D STARFIELD
{
  const heroCanvasEl = document.getElementById('hero-canvas');
  const heroPinWrapper = document.getElementById('services-pin-wrapper');

  if (heroCanvasEl && heroPinWrapper && typeof THREE !== 'undefined') {
    const heroScene = new THREE.Scene();
    heroScene.fog = new THREE.FogExp2(0x0a0a1a, 0.0008); 
    
    const heroCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 8000);
    heroCamera.position.set(0, 0, 1200);

    const heroRenderer = new THREE.WebGLRenderer({ canvas: heroCanvasEl, antialias: true, alpha: true });
    heroRenderer.setSize(window.innerWidth, window.innerHeight);
    heroRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const particlesCount = 10000;
    const geometry = new THREE.BufferGeometry();
    const posArray = new Float32Array(particlesCount * 3);
    const colorsArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount; i++) {
      posArray[i * 3] = (Math.random() - 0.5) * 5000;
      posArray[i * 3 + 1] = (Math.random() - 0.5) * 5000;
      posArray[i * 3 + 2] = (Math.random() - 0.5) * 8000;

      const starColor = new THREE.Color(0xffffff); 
      if (Math.random() > 0.85) starColor.setHex(0xddeeff); 
      else if (Math.random() > 0.85) starColor.setHex(0xffffee); 

      colorsArray[i * 3] = starColor.r;
      colorsArray[i * 3 + 1] = starColor.g;
      colorsArray[i * 3 + 2] = starColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colorsArray, 3));

    const canvasText = document.createElement('canvas');
    canvasText.width = 32; 
    canvasText.height = 32;
    const ctx = canvasText.getContext('2d');
    ctx.beginPath();
    ctx.arc(16, 16, 14, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
    const texture = new THREE.CanvasTexture(canvasText);

    const material = new THREE.PointsMaterial({
      size: 6, 
      vertexColors: true,
      map: texture,
      transparent: true,
      opacity: 0.9, 
      depthWrite: false, 
      blending: THREE.AdditiveBlending 
    });

    const particleMesh = new THREE.Points(geometry, material);
    heroScene.add(particleMesh);

    window.threeScrollProgress = 0;
    gsap.set('.phase-1, .phase-2, .phase-3', { autoAlpha: 0, y: 50 });

    // Initialize ScrollTrigger
    const svcTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroPinWrapper,
        start: "top top",
        end: "+=400%", 
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          window.threeScrollProgress = self.progress;
          const progressFill = document.querySelector('.progress-fill');
          const counterCurrent = document.querySelector('.section-counter-current');
          
          if(progressFill) progressFill.style.height = `${self.progress * 100}%`;
          if(counterCurrent) {
              const sectionNum = Math.min(Math.floor(self.progress * 4) + 1, 4);
              counterCurrent.innerText = String(sectionNum).padStart(2, '0');
          }
        }
      }
    });

    svcTl.to('.phase-0', { autoAlpha: 0, y: -50, duration: 0.5 }, 0.5)
         .fromTo('.phase-1', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.5)
         .to('.phase-1', { autoAlpha: 0, y: -50, duration: 0.5 }, 2.0)
         .fromTo('.phase-2', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 2.0)
         .to('.phase-2', { autoAlpha: 0, y: -50, duration: 0.5 }, 3.5)
         .fromTo('.phase-3', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 3.5);

    let smoothCamPos = { x: 0, y: 0, z: 1200 };
    
    const cameraPositions = [
      { x: 0, y: 0, z: 1200 },   
      { x: 0, y: 0, z: 0 },      
      { x: 0, y: 0, z: -1200 },  
      { x: 0, y: 0, z: -2400 }   
    ];

    const heroRenderLoop = () => {
      requestAnimationFrame(heroRenderLoop);
      const time = Date.now() * 0.0005;

      particleMesh.rotation.z = time * 0.05;
      particleMesh.rotation.y = time * 0.02;

      const totalProg = window.threeScrollProgress * 3; 
      const currentSection = Math.floor(totalProg);
      const sectionProg = totalProg % 1;

      const currentPos = cameraPositions[currentSection] || cameraPositions[3];
      const nextPos = cameraPositions[currentSection + 1] || cameraPositions[3];

      const targetX = currentPos.x + (nextPos.x - currentPos.x) * sectionProg;
      const targetY = currentPos.y + (nextPos.y - currentPos.y) * sectionProg;
      const targetZ = currentPos.z + (nextPos.z - currentPos.z) * sectionProg;

      smoothCamPos.x += (targetX - smoothCamPos.x) * 0.05;
      smoothCamPos.y += (targetY - smoothCamPos.y) * 0.05;
      smoothCamPos.z += (targetZ - smoothCamPos.z) * 0.05;

      heroCamera.position.set(
        smoothCamPos.x + Math.sin(time) * 10, 
        smoothCamPos.y + Math.cos(time * 0.8) * 10,
        smoothCamPos.z
      );
      
      heroCamera.lookAt(0, 0, smoothCamPos.z - 500);

      heroRenderer.render(heroScene, heroCamera);
    };
    heroRenderLoop();

    window.addEventListener('resize', () => {
      heroCamera.aspect = window.innerWidth / window.innerHeight;
      heroCamera.updateProjectionMatrix();
      heroRenderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}

// 2. D3 GLOBE ANIMATION (APPROACH SEC)
{
  const globeCanvas = document.getElementById('d3-globe-canvas');

  if (globeCanvas && typeof d3 !== 'undefined') {
    const context = globeCanvas.getContext("2d");
    const container = globeCanvas.parentElement;

    let width = container.clientWidth;
    let height = container.clientHeight;
    let radius = Math.min(width, height) / 2.5;

    const dpr = window.devicePixelRatio || 1;
    globeCanvas.width = width * dpr;
    globeCanvas.height = height * dpr;
    context.scale(dpr, dpr);

    const projection = d3.geoOrthographic()
      .scale(radius)
      .translate([width / 2, height / 2])
      .clipAngle(90);

    const path = d3.geoPath().projection(projection).context(context);

    const pointInPolygon = (point, polygon) => {
      const [x, y] = point;
      let inside = false;
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i];
        const [xj, yj] = polygon[j];
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside;
        }
      }
      return inside;
    };

    const pointInFeature = (point, feature) => {
      const geometry = feature.geometry;
      if (geometry.type === "Polygon") {
        const coordinates = geometry.coordinates;
        if (!pointInPolygon(point, coordinates[0])) return false;
        for (let i = 1; i < coordinates.length; i++) {
          if (pointInPolygon(point, coordinates[i])) return false;
        }
        return true;
      } else if (geometry.type === "MultiPolygon") {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false;
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) {
                inHole = true;
                break;
              }
            }
            if (!inHole) return true;
          }
        }
        return false;
      }
      return false;
    };

    const generateDotsInPolygon = (feature, dotSpacing = 16) => {
      const dots = [];
      const bounds = d3.geoBounds(feature);
      const [[minLng, minLat], [maxLng, maxLat]] = bounds;
      const stepSize = dotSpacing * 0.08;

      for (let lng = minLng; lng <= maxLng; lng += stepSize) {
        for (let lat = minLat; lat <= maxLat; lat += stepSize) {
          const point = [lng, lat];
          if (pointInFeature(point, feature)) {
            dots.push(point);
          }
        }
      }
      return dots;
    };

    const allDots = [];
    let landFeatures;

    const render = () => {
      context.clearRect(0, 0, width, height);

      const currentScale = projection.scale();
      const scaleFactor = currentScale / radius;

      // Draw ocean
      context.beginPath();
      context.arc(width / 2, height / 2, currentScale, 0, 2 * Math.PI);
      context.fillStyle = "#000000";
      context.fill();
      context.strokeStyle = "rgba(255, 255, 255, 0.1)"; 
      context.lineWidth = 2 * scaleFactor;
      context.stroke();

      if (landFeatures) {
        // Draw graticule
        const graticule = d3.geoGraticule();
        context.beginPath();
        path(graticule());
        context.strokeStyle = "#ffffff";
        context.lineWidth = 1 * scaleFactor;
        context.globalAlpha = 0.15;
        context.stroke();
        context.globalAlpha = 1;

        // Draw land outlines
        context.beginPath();
        landFeatures.features.forEach((feature) => path(feature));
        context.strokeStyle = "rgba(255, 255, 255, 0.3)";
        context.lineWidth = 1 * scaleFactor;
        context.stroke();

        // Draw halftone dots
        allDots.forEach((dot) => {
          const projected = projection([dot[0], dot[1]]);
          if (projected && projected[0] >= 0 && projected[0] <= width && projected[1] >= 0 && projected[1] <= height) {
            context.beginPath();
            context.arc(projected[0], projected[1], 1.2 * scaleFactor, 0, 2 * Math.PI);
            context.fillStyle = "#ffffff"; 
            context.fill();
          }
        });
      }
    };

    const loadWorldData = async () => {
      try {
        const response = await fetch("https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json");
        if (!response.ok) throw new Error("Failed to load land data");

        landFeatures = await response.json();

        landFeatures.features.forEach((feature) => {
          const dots = generateDotsInPolygon(feature, 16);
          dots.forEach(([lng, lat]) => allDots.push([lng, lat]));
        });

        render();
      } catch (err) {
        console.error("Failed to load land map data", err);
      }
    };

    // Rotation and Interaction
    const rotation = [0, 0];
    let autoRotate = true;
    const rotationSpeed = 0.5;

    const rotate = () => {
      if (autoRotate) {
        rotation[0] += rotationSpeed;
        projection.rotate(rotation);
        render();
      }
    };

    const rotationTimer = d3.timer(rotate);

    const handleMouseDown = (event) => {
      autoRotate = false;
      const startX = event.clientX;
      const startY = event.clientY;
      const startRotation = [...rotation];

      const handleMouseMove = (moveEvent) => {
        const sensitivity = 0.5;
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;

        rotation[0] = startRotation[0] + dx * sensitivity;
        rotation[1] = startRotation[1] - dy * sensitivity;
        rotation[1] = Math.max(-90, Math.min(90, rotation[1]));

        projection.rotate(rotation);
        render();
      };

      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        setTimeout(() => { autoRotate = true; }, 10);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    };

    const handleWheel = (event) => {
      event.preventDefault();
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1;
      const newRadius = Math.max(radius * 0.5, Math.min(radius * 3, projection.scale() * scaleFactor));
      projection.scale(newRadius);
      render();
    };

    globeCanvas.addEventListener("mousedown", handleMouseDown);
    globeCanvas.addEventListener("wheel", handleWheel);

    window.addEventListener('resize', () => {
      width = container.clientWidth;
      height = container.clientHeight;
      radius = Math.min(width, height) / 2.5;
      
      globeCanvas.width = width * dpr;
      globeCanvas.height = height * dpr;
      
      projection.scale(radius).translate([width / 2, height / 2]);
      render();
    });

    loadWorldData();
  }
}

// 3. CTA GLOBE WIREFRAME
{
  const ctaGlobeCanvas = document.getElementById('cta-globe-canvas');
  if (ctaGlobeCanvas && typeof THREE !== 'undefined') {
    
    const ctaScene = new THREE.Scene();
    
    const ctaCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    ctaCamera.position.z = 15; 

    const ctaRenderer = new THREE.WebGLRenderer({ 
      canvas: ctaGlobeCanvas, 
      alpha: true, 
      antialias: true 
    });
    ctaRenderer.setSize(window.innerWidth, window.innerHeight);
    ctaRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const globeRadius = 6;
    const geometry = new THREE.SphereGeometry(globeRadius, 32, 32);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffffff, 
      transparent: true, 
      opacity: 0.05, 
      wireframe: true 
    });
    
    const ctaGlobe = new THREE.Mesh(geometry, material);
    ctaScene.add(ctaGlobe);

    const rotationSpeed = 0.005;

    const ctaRenderLoop = () => {
      requestAnimationFrame(ctaRenderLoop);
      
      ctaGlobe.rotation.y += rotationSpeed;
      ctaGlobe.rotation.x += rotationSpeed * 0.3;
      ctaGlobe.rotation.z += rotationSpeed * 0.1;
      
      ctaRenderer.render(ctaScene, ctaCamera);
    };
    ctaRenderLoop();

    window.addEventListener('resize', () => {
      const ctaContainer = ctaGlobeCanvas.parentElement;
      if (ctaContainer) {
        const width = ctaContainer.clientWidth;
        const height = ctaContainer.clientHeight;
        ctaCamera.aspect = width / height;
        ctaCamera.updateProjectionMatrix();
        ctaRenderer.setSize(width, height);
      }
    });
    
    const initialContainer = ctaGlobeCanvas.parentElement;
    if (initialContainer) {
       const width = initialContainer.clientWidth;
       const height = initialContainer.clientHeight;
       ctaCamera.aspect = width / height;
       ctaCamera.updateProjectionMatrix();
       ctaRenderer.setSize(width, height);
    }

    gsap.to('.gradient-underline', {
      scrollTrigger: {
        trigger: '.cta-globe-sec',
        start: 'top 70%'
      },
      width: '100%',
      duration: 1.5,
      delay: 0.5,
      ease: "power3.out"
    });
  }
}

// 4. CTA CHROMATIC WAVE SHADER
{
  const ctaLiquidCanvas = document.getElementById('cta-liquid-canvas');

  if (ctaLiquidCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ canvas: ctaLiquidCanvas, alpha: true, antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(new THREE.Color(0x000000));

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1);

    const uniforms = {
      resolution: { value: [ctaLiquidCanvas.clientWidth, ctaLiquidCanvas.clientHeight] },
      time: { value: 0.0 },
      xScale: { value: 1.0 },
      yScale: { value: 0.5 },
      distortion: { value: 0.05 },
    };

    const vertexShader = `
      attribute vec3 position;
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 resolution;
      uniform float time;
      uniform float xScale;
      uniform float yScale;
      uniform float distortion;

      void main() {
        vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
        
        float d = length(p) * distortion;
        
        float rx = p.x * (1.0 + d);
        float gx = p.x;
        float bx = p.x * (1.0 - d);

        float r = 0.05 / abs(p.y + sin((rx + time) * xScale) * yScale);
        float g = 0.05 / abs(p.y + sin((gx + time) * xScale) * yScale);
        float b = 0.05 / abs(p.y + sin((bx + time) * xScale) * yScale);
        
        gl_FragColor = vec4(r, g, b, 1.0);
      }
    `;

    const positions = new Float32Array([
      -1.0, -1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0, -1.0, 0.0,
      -1.0,  1.0, 0.0,
       1.0,  1.0, 0.0,
    ]);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      side: THREE.DoubleSide,
      transparent: true
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const container = ctaLiquidCanvas.parentElement;
      if (container) {
        const width = container.clientWidth;
        const height = container.clientHeight;
        renderer.setSize(width, height, false);
        uniforms.resolution.value = [width, height];
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); 

    const animate = () => {
      uniforms.time.value += 0.01;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    
    animate();
  }
}

// 5. BLOG CONTACT: BACKGROUND PAPER SHADER (THREE.JS)
{
  const energyCanvas = document.getElementById('paper-shader-canvas');

  if (energyCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 2.5; 

    const renderer = new THREE.WebGLRenderer({ canvas: energyCanvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const planeUniforms = {
      time: { value: 0 },
      intensity: { value: 1.0 },
      color1: { value: new THREE.Color("#ff5722") }, 
      color2: { value: new THREE.Color("#ffffff") }  
    };

    const planeVertexShader = `
      uniform float time;
      uniform float intensity;
      varying vec2 vUv;
      varying vec3 vPosition;
      
      void main() {
        vUv = uv;
        vPosition = position;
        
        vec3 pos = position;
        pos.y += sin(pos.x * 10.0 + time) * 0.1 * intensity;
        pos.x += cos(pos.y * 8.0 + time * 1.5) * 0.05 * intensity;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `;

    const planeFragmentShader = `
      uniform float time;
      uniform float intensity;
      uniform vec3 color1;
      uniform vec3 color2;
      varying vec2 vUv;
      
      void main() {
        vec2 uv = vUv;
        
        float noise = sin(uv.x * 20.0 + time) * cos(uv.y * 15.0 + time * 0.8);
        noise += sin(uv.x * 35.0 - time * 2.0) * cos(uv.y * 25.0 + time * 1.2) * 0.5;
        
        vec3 color = mix(color1, color2, noise * 0.5 + 0.5);
        color = mix(color, vec3(1.0), pow(abs(noise), 2.0) * intensity);
        
        float glow = 1.0 - length(uv - 0.5) * 2.0;
        glow = pow(max(glow, 0.0), 2.0);
        
        gl_FragColor = vec4(color * glow, glow * 0.8);
      }
    `;

    const planeGeo = new THREE.PlaneGeometry(8, 8, 64, 64);
    const planeMat = new THREE.ShaderMaterial({
      vertexShader: planeVertexShader,
      fragmentShader: planeFragmentShader,
      uniforms: planeUniforms,
      transparent: true,
      side: THREE.DoubleSide
    });
    
    const shaderPlane = new THREE.Mesh(planeGeo, planeMat);
    shaderPlane.position.z = -1; 
    scene.add(shaderPlane);

    const ringGeo = new THREE.RingGeometry(1.6, 2.0, 64);
    const ringMat = new THREE.MeshBasicMaterial({ 
      color: 0xff5722, 
      transparent: true, 
      opacity: 0.6, 
      side: THREE.DoubleSide 
    });
    const energyRing = new THREE.Mesh(ringGeo, ringMat);
    scene.add(energyRing);

    const handleResize = () => {
      const parent = energyCanvas.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    };
    
    window.addEventListener("resize", handleResize);
    handleResize();

    const clock = new THREE.Clock();
    
    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      
      planeUniforms.time.value = elapsedTime;
      planeUniforms.intensity.value = 1.0 + Math.sin(elapsedTime * 2) * 0.3;
      
      energyRing.rotation.z = elapsedTime;
      energyRing.material.opacity = 0.5 + Math.sin(elapsedTime * 3) * 0.3;
      
      renderer.render(scene, camera);
    };
    
    animate();
  }
}
