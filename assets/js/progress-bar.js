// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Only create progress bar if it doesn't exist
    if (!document.querySelector('.progress-container')) {
        // Create progress bar container
        const progressContainer = document.createElement('div');
        progressContainer.className = 'progress-container';
        
        // Create the actual progress bar
        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar';
        
        // Append elements
        progressContainer.appendChild(progressBar);
        
        // Find the appropriate container - try different possible parent elements
        const container = document.querySelector('.container-md') || 
                         document.querySelector('.container') ||
                         document.querySelector('#main_content') ||
                         document.querySelector('main');
                         
        if (container) {
            // Insert as the first child of the container
            container.insertBefore(progressContainer, container.firstChild);
        }

        // Calculate and update progress
        function updateProgress() {
            // Get scrollable height
            const containerHeight = Math.max(
                container.scrollHeight,
                container.offsetHeight,
                container.clientHeight
            );
            const windowHeight = window.innerHeight;
            const scrollableHeight = containerHeight - windowHeight;
            
            // Calculate progress
            const scrolled = window.pageYOffset || document.documentElement.scrollTop;
            const progress = (scrolled / scrollableHeight) * 100;
            
            // Update progress bar
            progressBar.style.height = `${Math.min(progress, 100)}%`;
        }

        // Add scroll listener with throttling
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    updateProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(updateProgress, 100);
        });

        // Initial update
        setTimeout(updateProgress, 100);
    }
});