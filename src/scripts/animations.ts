import { animate, inView, scroll } from '@motionone/dom';

// Initialize animations when DOM is loaded
if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Navbar background on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
      scroll(
        ({ y }) => {
          if (y.current > 50) {
            navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
            navbar.classList.remove('bg-transparent');
          } else {
            navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-sm');
            navbar.classList.add('bg-transparent');
          }
        },
        {
          target: document.documentElement,
        }
      );
    }

    // Animate elements on scroll
    const animateOnScroll = (selector: string, animation: any) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        inView(element, () => {
          animate(element, animation.to, {
            duration: animation.duration || 0.6,
            easing: animation.easing || 'ease-out',
            delay: animation.delay || 0,
          });
        });
      });
    };

    // Service cards
    animateOnScroll('.service-card', {
      to: { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      duration: 0.6,
    });

    // Process steps
    animateOnScroll('.process-step', {
      to: { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      duration: 0.6,
    });

    // Testimonial cards
    animateOnScroll('.testimonial-card', {
      to: { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      duration: 0.6,
    });

    // About section
    animateOnScroll('.about-content', {
      to: { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      duration: 0.8,
    });

    animateOnScroll('.about-image', {
      to: { opacity: [0, 1], transform: ['translateY(20px)', 'translateY(0)'] },
      duration: 0.8,
      delay: 0.3,
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
        }
      });
    });
  });
}