/* ============================
   SitioHoy — Main JavaScript
   ============================ */

(function () {

    // =============================================
    // WhatsApp Configuration
    // =============================================
    var WA_NUMBER = '5491112345678'; // <-- CAMBIAR POR TU NÚMERO REAL
    var WA_MESSAGE = encodeURIComponent('Hola SitioHoy, quiero tener mi página web de $35.000');
    var WA_URL = 'https://wa.me/' + WA_NUMBER + '?text=' + WA_MESSAGE;

    document.querySelectorAll('.wa-link').forEach(function (link) {
        link.href = WA_URL;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
    });


    // =============================================
    // Dark Mode
    // =============================================
    var html = document.documentElement;
    var sunD = document.getElementById('icon-sun');
    var moonD = document.getElementById('icon-moon');
    var sunM = document.querySelector('.dt-sun');
    var moonM = document.querySelector('.dt-moon');

    function setDark(on) {
        if (on) { html.classList.add('dark'); }
        else { html.classList.remove('dark'); }

        localStorage.setItem('theme', on ? 'dark' : 'light');

        if (sunD) {
            sunD.classList.toggle('hidden', !on);
            moonD.classList.toggle('hidden', on);
        }
        if (sunM) {
            sunM.classList.toggle('hidden', !on);
            moonM.classList.toggle('hidden', on);
        }
    }

    // Init from localStorage or system preference
    var saved = localStorage.getItem('theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setDark(true);
    }

    document.getElementById('dark-toggle').addEventListener('click', function () {
        setDark(!html.classList.contains('dark'));
    });

    var mobileToggle = document.getElementById('dark-toggle-mobile');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function () {
            setDark(!html.classList.contains('dark'));
        });
    }


    // =============================================
    // Mobile Menu Toggle
    // =============================================
    var toggleBtn = document.getElementById('menu-toggle');
    var menu = document.getElementById('mobile-menu');
    var lines = toggleBtn.querySelectorAll('.hamburger-line');

    toggleBtn.addEventListener('click', function () {
        var isOpen = menu.classList.toggle('open');
        toggleBtn.classList.toggle('open', isOpen);
        document.body.classList.toggle('overflow-hidden', isOpen);
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // Close on backdrop click
    menu.addEventListener('click', function (e) {
        if (e.target === menu) {
            closeMenu();
        }
    });

    function closeMenu() {
        menu.classList.remove('open');
        toggleBtn.classList.remove('open');
        document.body.classList.remove('overflow-hidden');
    }


    // =============================================
    // Header Scroll Animation (Hide on Scroll Down, Show on Scroll Up)
    // =============================================
    var header = document.getElementById('site-header');
    var lastScrollY = window.scrollY;
    var scrollThreshold = 100; // Small threshold to avoid micro-scroll triggers

    window.addEventListener('scroll', function () {
        var currentScrollY = window.scrollY;
        var mobileMenuOpen = document.getElementById('mobile-menu').classList.contains('open');

        // Add shadow
        header.classList.toggle('shadow-md', currentScrollY > 10);

        // Hide/Show logic
        if (!mobileMenuOpen) {
            if (currentScrollY > lastScrollY && currentScrollY > scrollThreshold) {
                // Scrolling Down
                header.classList.add('nav-hidden');
            } else if (currentScrollY < lastScrollY) {
                // Scrolling Up
                header.classList.remove('nav-hidden');
            }
        } else {
            // Always show header if mobile menu is open
            header.classList.remove('nav-hidden');
        }

        lastScrollY = Math.max(0, currentScrollY);
    }, { passive: true });


    // =============================================
    // Fade-in Observer (Intersection Observer)
    // =============================================
    if ('IntersectionObserver' in window) {
        var fadeObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    fadeObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        document.querySelectorAll('[class*="reveal-"]').forEach(function (el) {
            fadeObs.observe(el);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('[class*="reveal-"]').forEach(function (el) {
            el.classList.add('visible');
        });
    }


    // =============================================
    // Counter Animation (Social Proof)
    // =============================================
    var counters = document.querySelectorAll('.counter');

    if ('IntersectionObserver' in window && counters.length) {
        var counterObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;

                var el = entry.target;
                var target = parseFloat(el.dataset.target);
                var isDecimal = el.dataset.decimal === 'true';
                var duration = 1500;
                var start = performance.now();

                function tick(now) {
                    var progress = Math.min((now - start) / duration, 1);
                    var eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
                    var current = eased * target;

                    el.textContent = isDecimal
                        ? current.toFixed(1)
                        : Math.floor(current).toLocaleString('es-AR');

                    if (progress < 1) {
                        requestAnimationFrame(tick);
                    } else {
                        el.textContent = isDecimal
                            ? target.toFixed(1)
                            : target.toLocaleString('es-AR');
                    }
                }

                requestAnimationFrame(tick);
                counterObs.unobserve(el);
            });
        }, { threshold: 0.5 });

        counters.forEach(function (c) {
            counterObs.observe(c);
        });
    }

    // =============================================
    // Phone Carousel (Hero)
    // =============================================
    var slides = document.querySelectorAll('.phone-slide');
    var dots = document.querySelectorAll('.phone-dot');
    var currentSlide = 0;
    var slideInterval = 3500; // ms

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = index % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    // Auto-rotate
    if (slides.length > 1) {
        setInterval(function () {
            goToSlide(currentSlide + 1);
        }, slideInterval);
    }

    // Click on dots to navigate
    dots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            goToSlide(i);
        });
    });

    // =============================================
    // WhatsApp Tooltip
    // =============================================
    var waTooltip = document.getElementById('wa-tooltip');
    if (waTooltip) {
        // Show tooltip after 5 seconds
        setTimeout(function () {
            waTooltip.classList.add('visible');
        }, 5000);

        // Hide tooltip after 10 seconds total
        setTimeout(function () {
            waTooltip.classList.remove('visible');
        }, 10000);
    }


})();
