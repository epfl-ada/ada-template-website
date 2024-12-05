document.addEventListener('DOMContentLoaded', () => {
    const plots = document.querySelectorAll('.plot-container');
    let lastScrollTop = window.pageYOffset;
    let velocity = 0;
    let positions = new Array(plots.length).fill(0);
    let isAnimating = false;
  
    // Inertia parameters - feel free to adjust these
    const SCROLL_MULTIPLIER = 0.8;  // How much scroll affects velocity
    const FRICTION = 0.50;          // How quickly motion slows down (0-1)
    const VELOCITY_MIN = 0.9;       // When to stop animation
    const MAX_OFFSET = 200;          // Maximum pixels of movement
  
    function animate() {
      if (Math.abs(velocity) > VELOCITY_MIN) {
        velocity *= FRICTION;
        
        plots.forEach((plot, index) => {
          positions[index] += velocity;
          // Limit the total offset
          positions[index] = Math.max(Math.min(positions[index], MAX_OFFSET), -MAX_OFFSET);
          plot.style.transform = `translateY(${positions[index]}px)`;
        });
        
        requestAnimationFrame(animate);
      } else {
        isAnimating = false;
        // Smoothly return to original position
        plots.forEach((plot, index) => {
          positions[index] = 0;
          plot.style.transform = `translateY(0px)`;
          plot.style.transition = 'transform 0.5s ease-out';
        });
      }
    }
  
    window.addEventListener('scroll', () => {
      const currentScrollTop = window.pageYOffset;
      const delta = currentScrollTop - lastScrollTop;
      lastScrollTop = currentScrollTop;
  
      // Add to current velocity
      velocity += delta * SCROLL_MULTIPLIER;
  
      // Start animation if not already running
      if (!isAnimating) {
        isAnimating = true;
        requestAnimationFrame(animate);
      }
  
      // Reset transition during scroll
      plots.forEach(plot => {
        plot.style.transition = 'none';
      });
    }, { passive: true });
  });