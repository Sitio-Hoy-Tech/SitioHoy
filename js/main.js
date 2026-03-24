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
        menu.classList.toggle('open');

        if (menu.classList.contains('open')) {
            lines[0].style.marginTop = '0';
            lines[1].style.marginTop = '0';
            lines[2].style.marginTop = '0';
            lines[0].style.transform = 'translateY(1px) rotate(45deg)';
            lines[1].style.opacity = '0';
            lines[2].style.transform = 'translateY(-1px) rotate(-45deg)';
        } else {
            lines[0].style.marginTop = '';
            lines[1].style.marginTop = '';
            lines[2].style.marginTop = '';
            lines[0].style.transform = '';
            lines[1].style.opacity = '1';
            lines[2].style.transform = '';
        }
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', function () {
            menu.classList.remove('open');
            lines[0].style.marginTop = '';
            lines[1].style.marginTop = '';
            lines[2].style.marginTop = '';
            lines[0].style.transform = '';
            lines[1].style.opacity = '1';
            lines[2].style.transform = '';
        });
    });


    // =============================================
    // Header Shadow on Scroll
    // =============================================
    var header = document.getElementById('site-header');

    window.addEventListener('scroll', function () {
        header.classList.toggle('shadow-md', window.scrollY > 10);
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
        }, { threshold: 0.15 });

        document.querySelectorAll('.fade-in-up').forEach(function (el) {
            fadeObs.observe(el);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('.fade-in-up').forEach(function (el) {
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
