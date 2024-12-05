document.addEventListener('DOMContentLoaded', () => {
    let lastScrollTop = window.pageYOffset;
    let scrollVelocity = 0;
    let ticking = false;
    const plots = document.querySelectorAll('.plot-container');
    
    window.addEventListener('scroll', () => {
      const currentScrollTop = window.pageYOffset;
      scrollVelocity = currentScrollTop - lastScrollTop;
      lastScrollTop = currentScrollTop;
  
      if (!ticking) {
        window.requestAnimationFrame(() => {
          plots.forEach(plot => {
            // Calculate inertia effect based on scroll velocity
            const inertia = Math.min(Math.max(scrollVelocity * 0.1, -10), 10);
            plot.style.transform = `translateY(${inertia}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  });