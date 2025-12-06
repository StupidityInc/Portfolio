document.addEventListener("DOMContentLoaded", () => {

  // 1. Scroll Reveal Animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // 2. Scroll Progress Bar
  window.addEventListener('scroll', () => {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("progressBar").style.width = scrolled + "%";
  });

  // 3. Mobile Menu Toggle
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');

      // Optional: Toggle icon between bars and times (X)
      const icon = hamburger.querySelector('i');
      if (navLinks.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.querySelector('i').classList.remove('fa-times');
        hamburger.querySelector('i').classList.add('fa-bars');
      });
    });
  }
});

// 4. Optimized Copy Email
function copyEmail() {
  const email = "contact@urib.me";
  navigator.clipboard.writeText(email).then(() => {
    const feedback = document.getElementById("copy-feedback");
    feedback.style.opacity = "1";

    const btn = document.querySelector('.copy-email-btn');
    btn.style.transform = "scale(0.96)";
    setTimeout(() => btn.style.transform = "scale(1)", 150);

    setTimeout(() => {
      feedback.style.opacity = "0";
    }, 2000);
  });
}