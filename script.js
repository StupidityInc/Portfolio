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
});

// 3. Optimized Copy Email
function copyEmail() {
  const email = "contact@urib.me";
  navigator.clipboard.writeText(email).then(() => {
    const feedback = document.getElementById("copy-feedback");
    feedback.style.opacity = "1";

    // Slight tactile bounce effect
    const btn = document.querySelector('.copy-email-btn');
    btn.style.transform = "scale(0.96)";
    setTimeout(() => btn.style.transform = "scale(1)", 150);

    setTimeout(() => {
      feedback.style.opacity = "0";
    }, 2000);
  });
}