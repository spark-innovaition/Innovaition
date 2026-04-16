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
      if (btnText) btnText.textContent = 'CLOSE';
      if (btnIcon) {
        btnIcon.classList.remove('fa-bars');
        btnIcon.classList.add('fa-xmark');
      }
      menuTl.timeScale(1).play();
    } else {
      menuOverlay.classList.remove('active');
      document.body.style.overflow = '';
      if (btnText) btnText.textContent = 'MENU';
      if (btnIcon) {
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
      if (btnText) btnText.textContent = 'MENU';
      if (btnIcon) {
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
  const timeStr = now.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' });

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

// ===== "KEY ADVANTAGES" STAGGER ANIMATION =====
const advItems = gsap.utils.toArray('.adv-item');
if (advItems.length > 0) {
  gsap.from(advItems, {
    scrollTrigger: {
      trigger: ".advantage-list",
      start: "top 95%",
      toggleActions: "play none none none",
    },
    x: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.15,
    ease: "back.out(1.2)",
    clearProps: "all",
  });
}

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

// ===== COUNTER ANIMATION =====
const counters = document.querySelectorAll('.counter');
if (counters.length > 0) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.getAttribute('data-target'));
        let current = 0;
        // Adjust the '60' to change how fast the numbers count up
        const increment = target / 60;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target;
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current);
          }
        }, 25); // 25ms interval for smooth counting

        // Stop observing once the animation triggers so it doesn't run again
        observer.unobserve(counter);
      }
    });
  }, { threshold: 0.5 }); // Starts when the counter is 50% visible

  counters.forEach(c => counterObserver.observe(c));
}

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

// ===== INDUSTRY-BASED PRICING DATA =====
const industryPricingData = {
  general: {
    title: "ENGAGEMENT MODELS",
    starter: {
      amount: "1,200", yearly: "12,500",
      features: [
        "AI readiness and opportunity assessment",
        "Strategic consultation sessions (up to 3)",
        "Workflow automation blueprint",
        "Data preparation guidance",
        "Basic AI tool recommendations",
        "2-week implementation roadmap"
      ]
    },
    enterprise: {
      amount: "3,000", yearly: "30,000",
      features: [
        "In-depth AI strategy and roadmap design",
        "Custom AI model and automation development",
        "Integration with internal tools and systems",
        "Predictive analytics and dashboard setup",
        "Continuous performance monitoring",
        "Team training and onboarding",
        "Ongoing technical support"
      ]
    }
  },
  healthcare: {
    title: "HEALTHCARE SOLUTIONS",
    starter: {
      amount: "2,500", yearly: "26,000",
      features: [
        "HIPAA-compliant AI readiness audit",
        "Workflow optimization for patient intake",
        "Basic medical documentation automation",
        "Data privacy impact assessment",
        "Consultation on AI ethics in care",
        "EHR integration feasibility study"
      ]
    },
    enterprise: {
      amount: "6,500", yearly: "68,000",
      features: [
        "Full Clinical AI implementation roadmap",
        "Predictive patient monitoring systems",
        "Advanced medical imaging analysis tools",
        "Secure EHR automation & interoperability",
        "Multi-department AI deployment",
        "Regulatory compliance (HIPAA/GDPR) automation",
        "24/7 mission-critical AI support"
      ]
    }
  },
  ecommerce: {
    title: "E-COMMERCE ENGINES",
    starter: {
      amount: "1,800", yearly: "18,500",
      features: [
        "Customer behavior analysis & insights",
        "Inventory automation roadmap",
        "Basic product recommendation engine",
        "Dynamic pricing strategy workshop",
        "Marketing copy automation setup",
        "Conversion rate optimization audit"
      ]
    },
    enterprise: {
      amount: "4,800", yearly: "50,000",
      features: [
        "Enterprise personalization engine (OMNI)",
        "Predictive inventory & supply chain AI",
        "Real-time visual search implementation",
        "Advanced fraud detection systems",
        "Cross-channel sentiment analysis",
        "Automated CRM & loyalty optimization",
        "Bi-weekly growth strategy sessions"
      ]
    }
  },
  logistics: {
    title: "LOGISTICS ARCHITECTURE",
    starter: {
      amount: "2,200", yearly: "23,000",
      features: [
        "Route optimization health-check",
        "Warehouse automation feasibility",
        "Basic demand forecasting model",
        "Fleet data analytics dashboard",
        "Supply chain bottleneck analysis",
        "Initial IoT integration roadmap"
      ]
    },
    enterprise: {
      amount: "5,800", yearly: "60,000",
      features: [
        "Real-time Global Logistics AI Pod",
        "Advanced route & fuel optimization",
        "Autonomous warehouse workflow design",
        "Predictive delivery & risk management",
        "Full-stack IoT sensor integration",
        "Carrier & vendor automated management",
        "Quarterly logistics efficiency audit"
      ]
    }
  }
};

const industryBtns = document.querySelectorAll('.industry-btn');
const pricingSecBadge = document.querySelector('.pricing-section .badge');

if (industryBtns.length > 0) {
  industryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const mode = btn.dataset.industry;
      const data = industryPricingData[mode];
      if (!data) return;

      industryBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (pricingSecBadge) pricingSecBadge.textContent = data.title;

      const cards = document.querySelectorAll('.pricing-grid .p-card');
      const isYearly = document.getElementById('pricingToggle')?.checked;

      if (cards.length >= 2) {
        updateCardContent(cards[0], data.starter, isYearly);
        updateCardContent(cards[1], data.enterprise, isYearly);
      }
    });
  });
}

function updateCardContent(card, data, isYearly) {
  const amt = card.querySelector('.amount');
  const list = card.querySelector('.p-features');
  const isLight = card.classList.contains('light');

  if (amt) {
    amt.dataset.monthly = data.amount;
    amt.dataset.yearly = data.yearly;
    amt.textContent = isYearly ? data.yearly : data.amount;
  }

  if (list) {
    list.innerHTML = data.features.map(f =>
      `<li ${isLight ? 'style="color:#000;"' : ''}><i class="fa-solid fa-chevron-right" style="color: ${isLight ? '#000' : '#22c55e'};"></i> ${f}</li>`
    ).join('');
  }

  gsap.from(card.querySelectorAll('.p-plan-name, .p-plan-desc, .price-wrap, .p-features li'), {
    opacity: 0,
    y: 15,
    duration: 0.5,
    stagger: 0.05,
    ease: "power2.out"
  });
}

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
    amt.dataset.yearly = data.starter.yearly;
    amt.textContent = isYearly ? data.starter.yearly : data.starter.monthly;
    starterCard.querySelector('.p-features').innerHTML = buildFeatures(data.starter.features);
  }

  const growthCard = document.getElementById('pcard-growth');
  if (growthCard) {
    growthCard.querySelector('.p-plan-desc').textContent = data.growth.desc;
    const amt = growthCard.querySelector('.amount');
    amt.dataset.monthly = data.growth.monthly;
    amt.dataset.yearly = data.growth.yearly;
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
    item.addEventListener('mouseenter', function () {
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
    const cardsPerView = 2; // Locked to 2 cards per view to match CSS styling
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
    const cardsPerView = 2; // Locked to 2
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
    ease: "power2.out",
    scrollTrigger: {
      trigger: '.statement-container',
      start: 'top 80%',
      end: 'bottom 40%',
      scrub: 1.5 // Added a bit of smoothing
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

  // ONLY run these animations on screens WIDER than 768px
  mm.add("(min-width: 769px)", () => {

    // 2. REBUILT PROCESS CARDS (Horizontal Scroll on Desktop)
    const processSection = document.querySelector('#process-section');
    const processTrack = document.querySelector('#process-track');

    if (processSection && processTrack) {
      // Perfectly aligns the track's right padding with the right edge of the container
      const getScrollAmount = () => -(processTrack.scrollWidth - processTrack.parentElement.offsetWidth);

      const processTween = gsap.to(processTrack, {
        x: getScrollAmount,
        ease: "none"
      });

      ScrollTrigger.create({
        trigger: processSection,
        start: "center center",
        end: () => `+=${processTrack.scrollWidth}`, // Links scroll duration to width of the cards
        pin: true,
        animation: processTween,
        scrub: 1,
        invalidateOnRefresh: true // Recalculates perfectly if the user resizes their browser
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
          end: "+=150%", /* Reduced from 300% to bring the next section up much sooner */
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

    for (let i = 0; i < particlesCount; i++) {
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
    gsap.set('.phase-1, .phase-2', { autoAlpha: 0, y: 50 });

    // Initialize ScrollTrigger
    const svcTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroPinWrapper,
        start: "top top",
        end: "+=300%",
        pin: true,
        scrub: 1,
        onUpdate: (self) => {
          window.threeScrollProgress = self.progress;
          const progressFill = document.querySelector('.progress-fill');
          const counterCurrent = document.querySelector('.section-counter-current');

          if (progressFill) progressFill.style.height = `${self.progress * 100}%`;
          if (counterCurrent) {
            const sectionNum = Math.min(Math.floor(self.progress * 3) + 1, 3);
            counterCurrent.innerText = String(sectionNum).padStart(2, '0');
          }
        }
      }
    });

    svcTl.to('.phase-0', { autoAlpha: 0, y: -50, duration: 0.5 }, 0.5)
      .fromTo('.phase-1', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 0.5)
      .to('.phase-1', { autoAlpha: 0, y: -50, duration: 0.5 }, 2.0)
      .fromTo('.phase-2', { autoAlpha: 0, y: 50 }, { autoAlpha: 1, y: 0, duration: 0.5 }, 2.0);

    let smoothCamPos = { x: 0, y: 0, z: 1200 };

    const cameraPositions = [
      { x: 0, y: 0, z: 1200 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: -1200 }
    ];

    const heroRenderLoop = () => {
      requestAnimationFrame(heroRenderLoop);
      const time = Date.now() * 0.0005;

      particleMesh.rotation.z = time * 0.05;
      particleMesh.rotation.y = time * 0.02;

      const totalProg = window.threeScrollProgress * 2;
      const currentSection = Math.floor(totalProg);
      const sectionProg = totalProg % 1;

      const currentPos = cameraPositions[currentSection] || cameraPositions[2];
      const nextPos = cameraPositions[currentSection + 1] || cameraPositions[2];

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
      -1.0, 1.0, 0.0,
      1.0, -1.0, 0.0,
      -1.0, 1.0, 0.0,
      1.0, 1.0, 0.0,
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

/* ==================================================== */
/* 5. BLOG CONTACT: CELESTIAL INK SHADER (THREE.JS)     */
/* ==================================================== */
{
  const energyCanvas = document.getElementById('paper-shader-canvas');

  if (energyCanvas && typeof THREE !== 'undefined') {
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ canvas: energyCanvas, antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);

    const clock = new THREE.Clock();

    const vertexShader = `
      void main() {
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform vec2 iMouse;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(
          mix(random(i), random(i + vec2(1.0, 0.0)), u.x),
          mix(random(i + vec2(0.0, 1.0)), random(i + vec2(1.0, 1.0)), u.x),
          u.y
        );
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        for (int i = 0; i < 6; i++) {
          v += a * noise(p);
          p *= 2.0;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv    = (gl_FragCoord.xy - 0.5 * iResolution.xy) / iResolution.y;
        vec2 mouse = (iMouse      - 0.5 * iResolution.xy) / iResolution.y;
        float t     = iTime * 0.1;

        float d = length(uv - mouse);
        float ripple = 1.0 - smoothstep(0.0, 0.3, d);

        float angle = t * 0.5;
        mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
        vec2 p = rot * uv;

        float pattern = fbm(p * 3.0 + t);
        pattern -= fbm(p * 6.0 - t * 0.5) * 0.3;
        pattern += ripple * 0.5;

        vec3 c1 = vec3(0.01, 0.01, 0.02);
        vec3 c2 = vec3(0.12, 0.12, 0.15);
        vec3 highlight = vec3(0.4, 0.4, 0.45);

        vec3 color = mix(c1, c2, smoothstep(0.4, 0.6, pattern));
        float hl = pow(smoothstep(0.6, 0.8, pattern), 2.0);
        color = mix(color, highlight, hl);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const uniforms = {
      iTime: { value: 0 },
      iResolution: { value: new THREE.Vector2() },
      iMouse: { value: new THREE.Vector2(window.innerWidth / 2, window.innerHeight / 2) }
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms
    });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const handleResize = () => {
      const parent = energyCanvas.parentElement;
      if (parent) {
        const width = parent.clientWidth;
        const height = parent.clientHeight;
        renderer.setSize(width, height, false);
        uniforms.iResolution.value.set(width, height);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    const onMouseMove = (e) => {
      const rect = energyCanvas.getBoundingClientRect();
      uniforms.iMouse.value.set(
        e.clientX - rect.left,
        rect.height - (e.clientY - rect.top)
      );
    };
    window.addEventListener("mousemove", onMouseMove);

    const animate = () => {
      requestAnimationFrame(animate);
      uniforms.iTime.value = clock.getElapsedTime();
      renderer.render(scene, camera);
    };

    animate();
  }
}

// 6. HOME CONTACT: WEBGL SHADER CANVAS
{
  const canvas = document.getElementById('shader-canvas');

  if (canvas) {
    const defaultShaderSource = `#version 300 es
precision highp float;
out vec4 O;
uniform vec2 resolution;
uniform float time;
#define FC gl_FragCoord.xy
#define T time
#define R resolution
#define MN min(R.x,R.y)
// Returns a pseudo random number for a given point (white noise)
float rnd(vec2 p) {
  p=fract(p*vec2(12.9898,78.233));
  p+=dot(p,p+34.56);
  return fract(p.x*p.y);
}
// Returns a pseudo random number for a given point (value noise)
float noise(in vec2 p) {
  vec2 i=floor(p), f=fract(p), u=f*f*(3.-2.*f);
  float a=rnd(i), b=rnd(i+vec2(1,0)), c=rnd(i+vec2(0,1)), d=rnd(i+1.);
  return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);
}
// Returns a pseudo random number for a given point (fractal noise)
float fbm(vec2 p) {
  float t=.0, a=1.; mat2 m=mat2(1.,-.5,.2,1.2);
  for (int i=0; i<5; i++) {
    t+=a*noise(p);
    p*=2.*m;
    a*=.5;
  }
  return t;
}
float clouds(vec2 p) {
    float d=1., t=.0;
    for (float i=.0; i<3.; i++) {
        float a=d*fbm(i*10.+p.x*.2+.2*(1.+i)*p.y+d+i*i+p);
        t=mix(t,d,a);
        d=a;
        p*=2./(i+1.);
    }
    return t;
}
void main(void) {
    vec2 uv=(FC-.5*R)/MN,st=uv*vec2(2,1);
    vec3 col=vec3(0);
    float bg=clouds(vec2(st.x+T*.5,-st.y));
    uv*=1.-.3*(sin(T*.2)*.5+.5);
    for (float i=1.; i<12.; i++) {
        uv+=.1*cos(i*vec2(.1+.01*i, .8)+i*i+T*.5+.1*uv.x);
        vec2 p=uv;
        float d=length(p);
        col+=.00125/d*(cos(sin(i)*vec3(1,2,3))+1.);
        float b=noise(i+p+bg*1.731);
        col+=.002*b/length(max(p,vec2(b*p.x*.02,p.y)));
        col=mix(col,vec3(bg*.25,bg*.137,bg*.05),d);
    }
    O=vec4(col,1);
}`;

    class WebGLRenderer {
      constructor(canvas, scale) {
        this.canvas = canvas;
        this.scale = scale;
        this.gl = canvas.getContext('webgl2');
        if (!this.gl) return;
        this.gl.viewport(0, 0, canvas.width * scale, canvas.height * scale);
        this.shaderSource = defaultShaderSource;
        this.mouseMove = [0, 0];
        this.mouseCoords = [0, 0];
        this.pointerCoords = [0, 0];
        this.nbrOfPointers = 0;
        this.vertexSrc = `#version 300 es\nprecision highp float;\nin vec4 position;\nvoid main(){gl_Position=position;}`;
        this.vertices = [-1, 1, -1, -1, 1, 1, 1, -1];
      }

      updateShader(source) {
        this.reset();
        this.shaderSource = source;
        this.setup();
        this.init();
      }

      updateMove(deltas) { this.mouseMove = deltas; }
      updateMouse(coords) { this.mouseCoords = coords; }
      updatePointerCoords(coords) { this.pointerCoords = coords; }
      updatePointerCount(nbr) { this.nbrOfPointers = nbr; }

      updateScale(scale) {
        this.scale = scale;
        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
      }

      compile(shader, source) {
        const gl = this.gl;
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        }
      }

      test(source) {
        let result = null;
        const gl = this.gl;
        const shader = gl.createShader(gl.FRAGMENT_SHADER);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
          result = gl.getShaderInfoLog(shader);
        }
        gl.deleteShader(shader);
        return result;
      }

      reset() {
        const gl = this.gl;
        if (this.program && !gl.getProgramParameter(this.program, gl.DELETE_STATUS)) {
          if (this.vs) { gl.detachShader(this.program, this.vs); gl.deleteShader(this.vs); }
          if (this.fs) { gl.detachShader(this.program, this.fs); gl.deleteShader(this.fs); }
          gl.deleteProgram(this.program);
        }
      }

      setup() {
        const gl = this.gl;
        this.vs = gl.createShader(gl.VERTEX_SHADER);
        this.fs = gl.createShader(gl.FRAGMENT_SHADER);
        this.compile(this.vs, this.vertexSrc);
        this.compile(this.fs, this.shaderSource);
        this.program = gl.createProgram();
        gl.attachShader(this.program, this.vs);
        gl.attachShader(this.program, this.fs);
        gl.linkProgram(this.program);
      }

      init() {
        const gl = this.gl;
        const program = this.program;
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this.vertices), gl.STATIC_DRAW);

        const position = gl.getAttribLocation(program, 'position');
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        program.resolution = gl.getUniformLocation(program, 'resolution');
        program.time = gl.getUniformLocation(program, 'time');
        program.move = gl.getUniformLocation(program, 'move');
        program.touch = gl.getUniformLocation(program, 'touch');
        program.pointerCount = gl.getUniformLocation(program, 'pointerCount');
        program.pointers = gl.getUniformLocation(program, 'pointers');
      }

      render(now = 0) {
        const gl = this.gl;
        const program = this.program;
        if (!program || gl.getProgramParameter(program, gl.DELETE_STATUS)) return;

        gl.clearColor(0, 0, 0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
        gl.useProgram(program);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);

        gl.uniform2f(program.resolution, this.canvas.width, this.canvas.height);
        gl.uniform1f(program.time, now * 1e-3);
        gl.uniform2f(program.move, ...this.mouseMove);
        gl.uniform2f(program.touch, ...this.mouseCoords);
        gl.uniform1i(program.pointerCount, this.nbrOfPointers);
        gl.uniform2fv(program.pointers, this.pointerCoords);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    }

    class PointerHandler {
      constructor(element, scale) {
        this.scale = scale;
        this.active = false;
        this.pointers = new Map();
        this.lastCoords = [0, 0];
        this.moves = [0, 0];

        const map = (el, s, x, y) => [x * s, el.height - y * s];

        element.addEventListener('pointerdown', (e) => {
          this.active = true;
          this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
        });

        element.addEventListener('pointerup', (e) => {
          if (this.count === 1) this.lastCoords = this.first;
          this.pointers.delete(e.pointerId);
          this.active = this.pointers.size > 0;
        });

        element.addEventListener('pointerleave', (e) => {
          if (this.count === 1) this.lastCoords = this.first;
          this.pointers.delete(e.pointerId);
          this.active = this.pointers.size > 0;
        });

        element.addEventListener('pointermove', (e) => {
          if (!this.active) return;
          this.lastCoords = [e.clientX, e.clientY];
          this.pointers.set(e.pointerId, map(element, this.getScale(), e.clientX, e.clientY));
          this.moves = [this.moves[0] + e.movementX, this.moves[1] + e.movementY];
        });
      }

      getScale() { return this.scale; }
      updateScale(scale) { this.scale = scale; }
      get count() { return this.pointers.size; }
      get move() { return this.moves; }
      get coords() { return this.pointers.size > 0 ? Array.from(this.pointers.values()).flat() : [0, 0]; }
      get first() { return this.pointers.values().next().value || this.lastCoords; }
    }

    if (canvas.getContext('webgl2')) {
      const dpr = Math.max(1, 0.5 * window.devicePixelRatio);
      const renderer = new WebGLRenderer(canvas, dpr);
      const pointers = new PointerHandler(canvas, dpr);

      renderer.setup();
      renderer.init();

      const resize = () => {
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        renderer.updateScale(dpr);
      };

      resize();
      window.addEventListener('resize', resize);

      if (renderer.test(defaultShaderSource) === null) {
        renderer.updateShader(defaultShaderSource);
      }

      let animationFrameId = null;

      const loop = (now) => {
        renderer.updateMouse(pointers.first);
        renderer.updatePointerCount(pointers.count);
        renderer.updatePointerCoords(pointers.coords);
        renderer.updateMove(pointers.move);
        renderer.render(now);
        animationFrameId = requestAnimationFrame(loop);
      };

      // PERFORMANCE FIX: Only render the WebGL shader when the Contact Section is visible on screen
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (!animationFrameId) {
              loop(performance.now());
            }
          } else {
            if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
              animationFrameId = null;
            }
          }
        });
      }, { threshold: 0 });

      observer.observe(canvas);
    }
  }
}