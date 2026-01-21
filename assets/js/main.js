document.addEventListener("DOMContentLoaded", () => {

    ///////////////////////////////////////////////
    // Articles on top of each others
    ///////////////////////////////////////////////


    const stackImages = document.querySelectorAll('.stack-img');

    function revealStackOnScroll() {
        const scrollY = window.scrollY;
        const windowH = window.innerHeight;

        stackImages.forEach((img, i) => {
            const triggerPoint = i * windowH * 0.1 + 0 * windowH; // adjust distance between reveals before +0.4*windowH
            if (scrollY > triggerPoint && !img.classList.contains('visible')) {
                // staggered delay for cinematic effect
                setTimeout(() => {
                    img.classList.add('visible');
                }, i * 0); // delay between images
            }
        });
    }

    window.addEventListener('scroll', revealStackOnScroll);
    revealStackOnScroll(); // initial check

    ////////////////////////////////////////////////
    // five elements from left to right
    ////////////////////////////////////////////////
    const scrollImages = document.querySelectorAll('.scroll-fade');

    function revealScrollImages() {
        const triggerBottom = window.innerHeight * 0.9;

        scrollImages.forEach(img => {
            const rect = img.getBoundingClientRect();
            if (rect.top < triggerBottom) {
                img.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealScrollImages);
    revealScrollImages();

});

///////////////////////////////////////////
// background newpaper transition to black as black section appears
//////////////////////////////////////////////

const blackSections = document.querySelectorAll('.section.black');
/*
const newsSections = document.querySelectorAll('.section.newspaper');
*/

const observer_black = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.body.classList.add('scrolling-to-black');
            document.body.classList.remove('scrolling-to-newspaper');
        } else {
            document.body.classList.remove('scrolling-to-black');
            document.body.classList.add('scrolling-to-newspaper');
        }
    });
}, {
    threshold: 0.1
});

blackSections.forEach(section => observer_black.observe(section));



////////////////////////////////////////////////////////////
// Make top ribbon change color
//////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const ribbon = document.querySelector(".top-ribbon");
    const links = document.querySelectorAll(".ribbon-links a");
    const sections = document.querySelectorAll(".section");
    const underline = document.querySelector(".ribbon-underline");

    let lastScrollY = window.scrollY;


    /*
    window.addEventListener("scroll", () => {

        const currentScroll = window.scrollY;
    
        if (currentScroll > lastScrollY && currentScroll > 120) {
          ribbon.classList.add("hidden");   // scrolling down
        } else {
          ribbon.classList.remove("hidden"); // scrolling up
        }
    
        lastScrollY = currentScroll;

        updateProgress(); // for progress bar


    });*/



    /* start progress bar */
    const progressFill = document.querySelector(".progress-fill");

    function updateProgress() {
        const scrollTop = window.scrollY;
        const docHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = (scrollTop / docHeight) * 100;
        progressFill.style.width = `${progress}%`;
    }
    /* end progress bar */


    function updateRibbon() {
        updateProgress()
        let currentSection = null;
        let darkMode = false;

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= 80 && rect.bottom > 80) {
                currentSection = section.id;
                darkMode = section.classList.contains("black");
            }
        });

        // Theme fade
        ribbon.classList.toggle("dark", darkMode);

        // Active link + underline
        links.forEach(link => {
            const isActive = link.dataset.section === currentSection;
            link.classList.toggle("active", isActive);

            if (isActive) {
                const rect = link.getBoundingClientRect();
                const parentRect = link.parentElement.getBoundingClientRect();

                underline.style.width = `${rect.width}px`;
                underline.style.transform =
                    `translateX(${rect.left - parentRect.left}px)`;
            }
        });
    }

    function updateRibbonTheme() {
        const ribbonRect = ribbon.getBoundingClientRect();
        const probeY = ribbonRect.bottom + 1; // 1px below ribbon

        let activeTheme = "light";

        sections.forEach(section => {
            const rect = section.getBoundingClientRect();

            if (rect.top <= probeY && rect.bottom >= probeY) {
                activeTheme = section.dataset.theme;
            }
        });

        ribbon.dataset.theme = activeTheme;
    }

    window.addEventListener("scroll", updateRibbon);
    window.addEventListener("resize", updateRibbon);
    /*updateRibbon();*/
    updateRibbonTheme();/*new version that looks what's under*/
});


/////////////////////////////////////////////////////////
// Change font size from ribbon
//////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", () => {
    const toggle = document.querySelector(".font-menu-toggle");
    const menu = document.querySelector(".font-menu");

    // Toggle menu on click
    toggle.addEventListener("click", (e) => {
        e.stopPropagation();
        menu.classList.toggle("open");
    });

    // Keep menu open while hovering
    menu.addEventListener("mouseenter", () => {
        menu.classList.add("open");
    });

    menu.addEventListener("mouseleave", () => {
        menu.classList.remove("open");
    });

    // Click a font-size button
    menu.querySelectorAll("button").forEach(btn => {
        btn.addEventListener("click", () => {
            const root = document.documentElement;

            // Current scale (fallback to 1)
            const current =
                parseFloat(getComputedStyle(root).getPropertyValue("--font-scale")) || 1;

            const step = parseFloat(btn.dataset.step);

            let next;

            if (step === 0) {
                next = 1; // reset
            } else {
                next = current + step;
            }

            // Clamp to reasonable range
            next = Math.min(Math.max(next, 0.8), 1.3);

            root.style.setProperty("--font-scale", next.toFixed(2));

            //menu.classList.remove("open");
        });
    });

    // Optional: close if click outside both toggle & menu
    document.addEventListener("click", (e) => {
        if (!menu.contains(e.target) && e.target !== toggle) {
            menu.classList.remove("open");
        }
    });
});



///////////////////////////////////////////////////////////////
// adapt size of nasdaq question graph
/////////////////////////////////////////////////////////////
/*
function resizeIframeTo(height) {
    const iframe = document.getElementById('nasdaq-iframe');
    if (iframe) {
        iframe.style.height = height + 'px';
    }
}

window.addEventListener("message", (event) => {
    if (event.data?.type === "resize-iframe") {
        resizeIframeTo(event.data.height);
    }
});
*/

////////////////////////////////////////
// for window resizes
/////////////////////////////////////////
window.onresize = () => {
    Plotly.Plots.resize(document.body);
};

