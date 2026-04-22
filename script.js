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

    // ── Copy BTC ──
    const btcBtn = document.getElementById('copyBtc');
    const btcToast = document.getElementById('btcToast');
    if (btcBtn && btcToast) {
        btcBtn.addEventListener('click', () => {
            const btc = btcBtn.getAttribute('data-btc') || '';
            navigator.clipboard.writeText(btc).then(() => {
                btcToast.classList.add('show');
                btcBtn.style.transform = 'scale(0.97)';
                setTimeout(() => { btcBtn.style.transform = ''; }, 150);
                setTimeout(() => { btcToast.classList.remove('show'); }, 2000);
            }).catch(() => {
                btcToast.textContent = 'Error!';
                btcToast.classList.add('show');
                setTimeout(() => {
                    btcToast.textContent = 'Copied!';
                    btcToast.classList.remove('show');
                }, 2000);
            });
        });
    }

    // ── Hero Parallax ──
    const heroGrid = document.querySelector('.hero-bg-grid');
    if (heroGrid) {
        window.addEventListener('scroll', () => {
            const y = window.scrollY * 0.15;
            heroGrid.style.transform = `translateY(${y}px)`;
        }, { passive: true });
    }

    // ── Spotlight Effect on Focus Cards ──
    document.querySelectorAll('.focus-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--y', `${e.clientY - rect.top}px`);
        });
    });

    // ── Magnetic Buttons ──
    const magneticEls = document.querySelectorAll('.btn-primary, .btn-ghost, .social-link, .back-to-top');
    magneticEls.forEach(el => {
        el.addEventListener('mousemove', e => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
        });
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    // ── Back to Top Smooth Scroll ──
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        backToTop.addEventListener('click', e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});