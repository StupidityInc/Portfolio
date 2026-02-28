document.addEventListener("DOMContentLoaded", () => {

    // ── Year ──
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ── Live Clock in Nav ──
    const navTime = document.getElementById('navTime');
    if (navTime) {
        const tick = () => {
            const now = new Date();
            navTime.textContent = now.toLocaleTimeString('en-GB', {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        };
        tick();
        setInterval(tick, 1000);
    }

    // ── Cursor Glow ──
    const glow = document.getElementById('cursorGlow');
    if (glow && window.matchMedia('(pointer: fine)').matches) {
        let mx = 0, my = 0, gx = 0, gy = 0;
        document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
        (function animate() {
            gx += (mx - gx) * 0.08;
            gy += (my - gy) * 0.08;
            glow.style.left = gx + 'px';
            glow.style.top = gy + 'px';
            requestAnimationFrame(animate);
        })();
    } else if (glow) {
        glow.style.display = 'none';
    }

    // ── Hide Nav on Scroll Down, Show on Scroll Up ──
    const nav = document.getElementById('mainNav');
    let lastScroll = 0;
    if (nav) {
        window.addEventListener('scroll', () => {
            const current = window.scrollY;
            if (current > lastScroll && current > 120) {
                nav.classList.add('hidden');
            } else {
                nav.classList.remove('hidden');
            }
            lastScroll = current;
        }, { passive: true });
    }

    // ── Hamburger ──
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
            document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
        });
        navLinks.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
                document.body.style.overflow = '';
            });
        });
    }

    // ── Scroll Reveal ──
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-anim]').forEach(el => revealObserver.observe(el));

    // ── Degree Bar Animation ──
    const degreeBar = document.querySelector('.degree-bar-fill');
    if (degreeBar) {
        const degreeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            });
        }, { threshold: 0.5 });
        degreeObserver.observe(degreeBar);
    }

    // ── Copy Email ──
    const copyBtn = document.getElementById('copyEmail');
    const copyToast = document.getElementById('copyToast');
    if (copyBtn && copyToast) {
        copyBtn.addEventListener('click', () => {
            const email = copyBtn.getAttribute('data-email') || 'work@urib.me';
            navigator.clipboard.writeText(email).then(() => {
                copyToast.classList.add('show');
                copyBtn.style.transform = 'scale(0.97)';
                setTimeout(() => { copyBtn.style.transform = ''; }, 150);
                setTimeout(() => { copyToast.classList.remove('show'); }, 2000);
            }).catch(() => {
                copyToast.textContent = 'Error!';
                copyToast.classList.add('show');
                setTimeout(() => {
                    copyToast.textContent = 'Copied!';
                    copyToast.classList.remove('show');
                }, 2000);
            });
        });
    }

    // ── Boot Sequence (only on index page) ──
    const bootOverlay = document.getElementById('bootOverlay');
    if (bootOverlay) {
        // Check if this session already booted
        if (sessionStorage.getItem('booted')) {
            bootOverlay.style.display = 'none';
            // Remove delays on hero elements
            document.querySelectorAll('.hero-tag, .name-line, .hero-role, .hero-desc, .hero-actions, .hero-stats, .hero-scroll-hint').forEach(el => {
                el.style.animationDelay = '0.1s';
            });
        } else {
            sessionStorage.setItem('booted', '1');
        }
    }
});
