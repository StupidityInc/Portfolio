document.addEventListener("DOMContentLoaded", () => {

    // 1. Dynamic Year Update (Auto-updates the footer year)
    const yearSpan = document.getElementById('year');
    if(yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Scroll Reveal Animation (Triggers fade-in effects)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

    // 3. Scroll Progress Bar (Top of the screen line)
    const progressBar = document.getElementById("progressBar");
    if(progressBar) {
        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + "%";
        });
    }

    // 4. Mobile Menu Logic (Hamburger menu)
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-link');

    if (hamburger && navLinks) {
        // Toggle menu on hamburger click
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Icon Toggle (Bars <-> Times)
            const icon = hamburger.querySelector('i');
            if (icon) {
                if(navLinks.classList.contains('active')){
                    icon.classList.replace('fa-bars', 'fa-times');
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                }
            }
        });

        // Close menu when a link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if(icon) icon.classList.replace('fa-times', 'fa-bars');
            });
        });
    }

    // 5. Copy Email Logic (Works for both pages)
    const copyBtn = document.querySelector('.copy-email-btn');
    const feedback = document.getElementById("copy-feedback");

    if(copyBtn && feedback) {
        copyBtn.addEventListener('click', () => {
            // Tries to get email from HTML data-email="...", falls back to default
            const email = copyBtn.getAttribute('data-email') || "work@urib.me";

            navigator.clipboard.writeText(email).then(() => {
                // Success Animation
                feedback.style.opacity = "1";
                copyBtn.style.transform = "scale(0.96)";

                setTimeout(() => {
                    copyBtn.style.transform = "scale(1)";
                }, 150);

                setTimeout(() => {
                    feedback.style.opacity = "0";
                }, 2000);
            }).catch(err => {
                console.error("Failed to copy:", err);
                feedback.textContent = "ERROR COPYING";
                feedback.style.opacity = "1";
            });
        });
    }
    // 6. Animate Degree Bar
    const degreeBar = document.querySelector('.progress-fill');
    if(degreeBar) {
        // Force width to 0 initially
        const targetWidth = degreeBar.style.width;
        degreeBar.style.width = '0%';

        const degreeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    // Restore width to trigger CSS transition
                    entry.target.style.width = targetWidth;
                }
            });
        }, { threshold: 0.5 });

        degreeObserver.observe(degreeBar);
    }
});