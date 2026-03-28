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
    // Multi-Device Showcase (Hero)
    // =============================================
    var deviceBtns = document.querySelectorAll('.device-btn');
    var deviceFrames = document.querySelectorAll('.device-frame');
    var showcaseDots = document.querySelectorAll('.showcase-dot');
    var currentSlide = 0;
    var slideInterval = 3500; // ms

    // --- Device Switching ---
    deviceBtns.forEach(function (btn) {
        btn.addEventListener('click', function () {
            var targetDevice = this.dataset.device;

            // Update buttons
            deviceBtns.forEach(function (b) { b.classList.remove('active'); });
            this.classList.add('active');

            // Update frames
            deviceFrames.forEach(function (frame) {
                if (frame.id === targetDevice + '-frame') {
                    frame.classList.add('active');
                } else {
                    frame.classList.remove('active');
                }
            });
        });
    });

    // --- Synchronized Carousel ---
    function goToSlide(index) {
        // We have slides in multiple frames, we must sync them all
        var allSlideGroups = document.querySelectorAll('.carousel-inner');
        var totalSlides = allSlideGroups[0].querySelectorAll('.slide').length;

        currentSlide = index % totalSlides;

        // Update all images in all frames
        allSlideGroups.forEach(function (group) {
            var slides = group.querySelectorAll('.slide');
            slides.forEach(function (s, i) {
                s.classList.toggle('active', i === currentSlide);
            });
        });

        // Update dots
        showcaseDots.forEach(function (dot, i) {
            dot.classList.toggle('active', i === currentSlide);
        });
    }

    // Auto-rotate
    var carouselTimer = setInterval(function () {
        goToSlide(currentSlide + 1);
    }, slideInterval);

    // Click on dots to navigate
    showcaseDots.forEach(function (dot, i) {
        dot.addEventListener('click', function () {
            clearInterval(carouselTimer); // Stop auto-rotate on manual click
            goToSlide(i);
        });
    });

    // =============================================
    // Available Spots (decreases through the week)
    // =============================================
    (function () {
        // Mon=5, Tue=4, Wed=3, Thu=2, Fri-Sun=1
        var spotsMap = { 0: 1, 1: 5, 2: 4, 3: 3, 4: 2, 5: 1, 6: 1 };
        var spots = spotsMap[new Date().getDay()];
        var word = spots === 1 ? 'lugar' : 'lugares';

        // Hero
        var heroEl = document.getElementById('spots-hero');
        if (heroEl) heroEl.textContent = spots + ' ' + word;

        // Pricing (single span, full text to avoid spacing issues)
        var pricingFull = document.getElementById('spots-pricing-full');
        if (pricingFull) pricingFull.textContent = spots + ' ' + word;

        // If only 1 spot left, pulse the pricing badge
        if (spots === 1) {
            var wrapper = pricingFull && pricingFull.closest('div');
            if (wrapper) wrapper.classList.add('animate-pulse');
        }
    })();


    // =============================================
    // Urgency Countdown (Hero bottom strip)
    // =============================================
    (function () {
        var countdownEl = document.getElementById('countdown');
        if (!countdownEl) return;

        function getNextSunday() {
            var now = new Date();
            var day = now.getDay();
            var daysUntil = day === 0 ? 7 : 7 - day;
            var target = new Date(now);
            target.setDate(now.getDate() + daysUntil);
            target.setHours(23, 59, 59, 0);
            return target;
        }

        function pad(n) { return n < 10 ? '0' + n : '' + n; }

        function updateCountdown() {
            var diff = getNextSunday() - new Date();
            if (diff <= 0) { countdownEl.textContent = '00:00:00'; return; }
            var days = Math.floor(diff / 86400000);
            var hours = Math.floor((diff % 86400000) / 3600000);
            var minutes = Math.floor((diff % 3600000) / 60000);
            var seconds = Math.floor((diff % 60000) / 1000);
            countdownEl.textContent = days > 0
                ? days + 'd ' + pad(hours) + 'h ' + pad(minutes) + 'm'
                : pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    })();


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


    // =============================================
    // Spin Wheel
    // =============================================
    (function () {
        var PRIZES = [
            { label: 'Prioridad\nAbsoluta', detail: 'Tu web se mueve al tope de la cola, lista antes que nadie.', win: true,  color: '#059669' },
            { label: '10% OFF',             detail: '10% de descuento en tu primer mes.',                         win: true,  color: '#1e293b' },
            { label: '2do mes\nal 25%',     detail: 'Tu segundo mes con 25% de descuento.',                       win: true,  color: '#10B981' },
            { label: 'Velocidad\nExpress',  detail: 'Tu sitio web pasa al frente de la cola con atención prioritaria.', win: true,  color: '#1e293b' },
            { label: '15% OFF',             detail: '15% de descuento en tu primer mes.',                         win: true,  color: '#10B981' },
            { label: '1 Mes\nGratis',       detail: 'Tu primer mes completamente sin costo.',                     win: true,  color: '#059669' },
            { label: '😅 Sin\nsuerte',      detail: null,                                                         win: false, color: '#374151' },
        ];
        // Prioridad Absoluta peso 4 (~31%). 1 Mes Gratis y Sin suerte peso 0 (nunca salen).
        var WEIGHTS = [4, 2, 2, 2, 1, 0, 0];
        var STORAGE_KEY   = 'sitiohoy_wheel';
        var PRIZE_EXPIRY  = 48 * 60 * 60 * 1000;  // premio vence en 48hs
        var PLAYED_EXPIRY = 30 * 24 * 60 * 60 * 1000; // ruleta no vuelve por 30 días

        var N   = PRIZES.length;
        var SEG = (2 * Math.PI) / N;
        var currentAngle = -Math.PI / 2;
        var spinning = false, hasSpun = false;
        var SIZE = 280; // logical px

        var overlay     = document.getElementById('wheel-overlay');
        var canvas      = document.getElementById('wheel-canvas');
        var spinBtn     = document.getElementById('wheel-spin-btn');
        var closeBtn    = document.getElementById('wheel-close-btn');
        var backdrop    = document.getElementById('wheel-backdrop');
        var resultEl    = document.getElementById('wheel-result');
        var prizeText   = document.getElementById('wheel-prize-text');
        var prizeDetail = document.getElementById('wheel-prize-detail');
        var waBtn       = document.getElementById('wheel-wa-btn');

        if (!canvas) return;
        var ctx = canvas.getContext('2d');

        // ---- HiDPI canvas setup ----
        var dpr = window.devicePixelRatio || 1;
        canvas.width  = SIZE * dpr;
        canvas.height = SIZE * dpr;
        canvas.style.width  = SIZE + 'px';
        canvas.style.height = SIZE + 'px';
        ctx.scale(dpr, dpr);

        // ---- LocalStorage helpers ----
        function getStored() {
            try {
                return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null;
            } catch (e) { return null; }
        }

        function saveStored(prize) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({
                played: true,
                playedUntil: Date.now() + PLAYED_EXPIRY,  // no vuelve a ver la ruleta por 30 días
                prize: prize,
                prizeExpires: prize ? Date.now() + PRIZE_EXPIRY : null  // el premio vence en 48hs
            }));
        }

        // ---- Draw ----
        function draw() {
            var r  = SIZE / 2 - 6;
            var cx = SIZE / 2, cy = SIZE / 2;
            ctx.clearRect(0, 0, SIZE, SIZE);

            // Outer glow ring
            ctx.save();
            ctx.shadowColor = 'rgba(16,185,129,0.55)';
            ctx.shadowBlur  = 20;
            ctx.beginPath();
            ctx.arc(cx, cy, r + 2, 0, 2 * Math.PI);
            ctx.strokeStyle = '#10B981';
            ctx.lineWidth   = 3;
            ctx.stroke();
            ctx.restore();

            // Segments
            for (var i = 0; i < N; i++) {
                var a0 = currentAngle + i * SEG;
                var a1 = a0 + SEG;

                ctx.save();
                ctx.beginPath();
                ctx.moveTo(cx, cy);
                ctx.arc(cx, cy, r, a0, a1);
                ctx.closePath();
                ctx.fillStyle   = PRIZES[i].color;
                ctx.fill();
                ctx.strokeStyle = 'rgba(255,255,255,0.1)';
                ctx.lineWidth   = 1;
                ctx.stroke();
                ctx.restore();

                // Label
                ctx.save();
                ctx.translate(cx, cy);
                ctx.rotate(a0 + SEG / 2);
                ctx.textAlign    = 'right';
                ctx.fillStyle    = '#ffffff';
                ctx.font         = 'bold 12px Inter, sans-serif';
                ctx.shadowColor  = 'rgba(0,0,0,0.7)';
                ctx.shadowBlur   = 3;
                ctx.shadowOffsetX = 0;
                ctx.shadowOffsetY = 1;
                var lines = PRIZES[i].label.split('\n');
                var tx = r - 12;
                if (lines.length === 1) {
                    ctx.fillText(lines[0], tx, 4);
                } else {
                    ctx.fillText(lines[0], tx, -5);
                    ctx.fillText(lines[1], tx, 9);
                }
                ctx.restore();
            }

            // Center cap
            ctx.save();
            ctx.beginPath();
            ctx.arc(cx, cy, 20, 0, 2 * Math.PI);
            var g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
            g.addColorStop(0, '#1e293b');
            g.addColorStop(1, '#0F172A');
            ctx.fillStyle   = g;
            ctx.fill();
            ctx.strokeStyle = '#10B981';
            ctx.lineWidth   = 2;
            ctx.stroke();
            ctx.restore();
        }

        draw();

        // ---- Weighted random ----
        function pickWinner() {
            var total = WEIGHTS.reduce(function (a, b) { return a + b; }, 0);
            var rand  = Math.random() * total;
            for (var i = 0; i < WEIGHTS.length; i++) {
                rand -= WEIGHTS[i];
                if (rand <= 0) return i;
            }
            return 0;
        }

        // ---- Spin ----
        function spin() {
            if (spinning || hasSpun) return;
            spinning = hasSpun = true;
            spinBtn.disabled    = true;
            spinBtn.textContent = 'Girando...';

            var winner       = pickWinner();
            var targetCenter = -Math.PI / 2 - (winner * SEG + SEG / 2);
            var fullSpins    = 2 * Math.PI * 7;
            var delta        = (targetCenter - currentAngle) + fullSpins;
            while (delta < fullSpins) delta += 2 * Math.PI;

            var startAngle = currentAngle, startTime = null;
            var duration   = 4800;

            function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

            function tick(ts) {
                if (!startTime) startTime = ts;
                var p    = Math.min((ts - startTime) / duration, 1);
                currentAngle = startAngle + delta * easeOut(p);
                draw();
                if (p < 1) {
                    requestAnimationFrame(tick);
                } else {
                    spinning = false;
                    var prize = PRIZES[winner];
                    saveStored(prize.win ? prize : null);
                    showResult(prize);
                    if (prize.win) initGiftWidget(prize);
                }
            }
            requestAnimationFrame(tick);
        }

        // ---- Show result ----
        function showResult(prize) {
            spinBtn.classList.add('hidden');
            closeBtn.textContent = 'Cerrar';
            resultEl.classList.remove('hidden');

            if (prize.win) {
                prizeText.textContent   = prize.label.replace('\n', ' ');
                prizeDetail.textContent = prize.detail;
                waBtn.classList.remove('hidden');
                var msg = encodeURIComponent('Hola SitioHoy! Giré la ruleta y gané: ' + prize.label.replace('\n', ' ') + '. ¿Me lo aplican?');
                waBtn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + msg;
            } else {
                prizeText.textContent   = '¡Mejor suerte la próxima!';
                prizeDetail.textContent = 'Igual podés consultarnos, tenemos opciones para vos.';
                waBtn.classList.add('hidden');
            }
        }

        // ---- Open / Close modal ----
        function openWheel() {
            overlay.style.removeProperty('display');
            document.body.classList.add('overflow-hidden');
        }

        function closeWheel() {
            overlay.classList.add('closing');
            document.body.classList.remove('overflow-hidden');
            setTimeout(function () {
                overlay.style.setProperty('display', 'none', 'important');
                overlay.classList.remove('closing');
            }, 300);
            if (!hasSpun) saveStored(null); // cerró sin girar: no mostrar de nuevo por 48h
        }

        spinBtn.addEventListener('click', spin);
        closeBtn.addEventListener('click', closeWheel);
        backdrop.addEventListener('click', function () { if (!spinning) closeWheel(); });

        // ---- Gift widget ----
        function initGiftWidget(prize) {
            var widget = document.getElementById('gift-widget');
            if (!widget) return;
            widget.style.removeProperty('display');

            var giftPrizeName   = document.getElementById('gift-prize-name');
            var giftPrizeDetail = document.getElementById('gift-prize-detail');
            var giftWaBtn       = document.getElementById('gift-wa-btn');
            var giftTimer       = document.getElementById('gift-countdown');
            var giftTooltip     = document.getElementById('gift-tooltip');
            var giftBtn         = document.getElementById('gift-btn');

            if (giftPrizeName)   giftPrizeName.textContent   = prize.label.replace('\n', ' ');
            if (giftPrizeDetail) giftPrizeDetail.textContent = prize.detail;
            if (giftWaBtn) {
                var msg = encodeURIComponent('Hola SitioHoy! Giré la ruleta y gané: ' + prize.label.replace('\n', ' ') + '. ¿Me lo aplican?');
                giftWaBtn.href = 'https://wa.me/' + WA_NUMBER + '?text=' + msg;
            }

            var stored = getStored();
            var expiresAt = (stored && stored.prizeExpires) ? stored.prizeExpires : (Date.now() + PRIZE_EXPIRY);

            function updateGiftTimer() {
                var diff = expiresAt - Date.now();
                if (diff <= 0) {
                    widget.style.setProperty('display', 'none', 'important');
                    localStorage.removeItem(STORAGE_KEY);
                    return;
                }
                var h = Math.floor(diff / 3600000);
                var m = Math.floor((diff % 3600000) / 60000);
                var s = Math.floor((diff % 60000) / 1000);
                if (giftTimer) giftTimer.textContent = (h > 0 ? h + 'h ' : '') + (m < 10 ? '0' : '') + m + 'm ' + (s < 10 ? '0' : '') + s + 's';
            }

            updateGiftTimer();
            setInterval(updateGiftTimer, 1000);

            // Toggle tooltip
            if (giftBtn && giftTooltip) {
                giftBtn.addEventListener('click', function () {
                    giftTooltip.classList.toggle('hidden');
                });
            }
        }

        // ---- On load: check localStorage ----
        var stored = getStored();

        if (stored && stored.played) {
            // Ya jugó — mostrar widget si el premio aún no venció
            if (stored.prize && stored.prize.win && stored.prizeExpires > Date.now()) {
                initGiftWidget(stored.prize);
            }
            // No mostrar la ruleta de nuevo hasta que venza playedUntil
            if (stored.playedUntil > Date.now()) return;
        }

        // ---- Triggers (primera vez) ----
        var triggered = false;

        document.addEventListener('mouseleave', function (e) {
            if (e.clientY <= 0 && !triggered) {
                triggered = true;
                openWheel();
            }
        });

        setTimeout(function () {
            if (!triggered) {
                triggered = true;
                openWheel();
            }
        }, 40000);

    })();


})();
