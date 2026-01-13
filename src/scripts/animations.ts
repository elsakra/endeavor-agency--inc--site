import { animate, inView, stagger } from '@motionone/dom';

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAnimations);
} else {
  initAnimations();
}

function initAnimations() {
  // Respect user's motion preferences
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return;
  }

  // Animate elements on scroll
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -100px 0px',
    threshold: 0.1
  };

  // Fade in animation for sections
  const fadeElements = document.querySelectorAll<HTMLElement>('.animate-fade-in');
  fadeElements.forEach((element, index) => {
    inView(element, () => {
      animate(
        element,
        { opacity: [0, 1], transform: ['translateY(40px)', 'translateY(0px)'] },
        { duration: 0.6, delay: index * 0.1 }
      );
    });
  });

  // Slide up animation for cards
  const slideElements = document.querySelectorAll<HTMLElement>('.animate-slide-up');
  slideElements.forEach((element) => {
    inView(element, () => {
      animate(
        element,
        { opacity: [0, 1], transform: ['translateY(60px)', 'translateY(0px)'] },
        { duration: 0.8, easing: 'ease-out' }
      );
    });
  });

  // Stagger animation for service cards
  const serviceCards = document.querySelectorAll<HTMLElement>('.card-hover');
  if (serviceCards.length > 0) {
    inView(serviceCards[0], () => {
      animate(
        serviceCards,
        { opacity: [0, 1], transform: ['translateY(40px)', 'translateY(0px)'] },
        { duration: 0.6, delay: stagger(0.1) }
      );
    });
  }

  // Button hover animations
  const buttons = document.querySelectorAll<HTMLElement>('.btn-primary, .btn-secondary');
  buttons.forEach((button) => {
    button.addEventListener('mouseenter', () => {
      animate(button, { scale: 1.05 }, { duration: 0.2 });
    });
    
    button.addEventListener('mouseleave', () => {
      animate(button, { scale: 1 }, { duration: 0.2 });
    });
  });

  // Navbar scroll effect
  let lastScrollY = window.scrollY;
  const header = document.getElementById('header');
  
  if (header) {
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Smooth scroll for anchor links
  const anchorLinks = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href')?.substring(1);
      const targetElement = targetId ? document.getElementById(targetId) : null;
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Form focus animations
  const formInputs = document.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea, select');
  formInputs.forEach((input) => {
    input.addEventListener('focus', () => {
      animate(input, { scale: 1.02 }, { duration: 0.2 });
    });
    
    input.addEventListener('blur', () => {
      animate(input, { scale: 1 }, { duration: 0.2 });
    });
  });

  // Parallax effect for hero background (subtle)
  const heroSection = document.querySelector<HTMLElement>('.hero-parallax');
  if (heroSection) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = scrolled * 0.5;
      heroSection.style.transform = `translateY(${parallax}px)`;
    });
  }
}