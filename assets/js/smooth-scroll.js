// Intersection Observer for fade-in effects
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe all sections and plot containers
  document.addEventListener('DOMContentLoaded', () => {
    // Wrap each major section in a section tag if not already wrapped
    const mainContent = document.querySelector('.main-content');
    const plotContainers = document.querySelectorAll('.plot-container');
    const sections = document.querySelectorAll('section');
  
    // Observe plot containers
    plotContainers.forEach(container => {
      observer.observe(container);
    });
  
    // Observe sections
    sections.forEach(section => {
      observer.observe(section);
    });
  
    // Smooth scrolling with inertia
    let scrolling = false;
    let scrollTimeout;
    let lastScrollTop = 0;
    let scrollVelocity = 0;
    const friction = 0.95;
  
    function smoothScroll() {
      if (Math.abs(scrollVelocity) > 0.1) {
        scrollVelocity *= friction;
        window.scrollBy(0, scrollVelocity);
        requestAnimationFrame(smoothScroll);
      } else {
        scrolling = false;
      }
    }
  
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      scrollVelocity = currentScroll - lastScrollTop;
      lastScrollTop = currentScroll;
  
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (!scrolling) {
          scrolling = true;
          requestAnimationFrame(smoothScroll);
        }
      }, 15);
    }, { passive: true });
  
    // Parallax effect for headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    let ticking = false;
  
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          headings.forEach(heading => {
            const speed = 0.2;
            const yPos = -(scrolled * speed);
            heading.style.transform = `translateY(${yPos}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  });