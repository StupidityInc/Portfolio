document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Custom Cursor ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');
  let mouseX = 0, mouseY = 0;
  let circleX = 0, circleY = 0;

  if (window.matchMedia("(min-width: 768px)").matches) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }
    });

    function animateCursor() {
      const speed = 0.15;
      circleX += (mouseX - circleX) * speed;
      circleY += (mouseY - circleY) * speed;
      if (cursorCircle) {
        cursorCircle.style.left = `${circleX}px`;
        cursorCircle.style.top = `${circleY}px`;
      }
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover Triggers
    const hoverTargets = document.querySelectorAll('a, button, .project-card, .skill-pill');
    hoverTargets.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  // --- 2. Scroll Fade-in Animation ---
  const observerOptions = { threshold: 0.15, rootMargin: "0px 0px -50px 0px" };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-fade');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const fadeElements = document.querySelectorAll('.fade-in, .project-card, .timeline-item');
  fadeElements.forEach(el => {
    el.classList.add('hidden-fade');
    observer.observe(el);
  });

  // --- 3. 3D Tilt Effect for Project Cards ---
  const tiltCards = document.querySelectorAll('.project-card');
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -3; // Subtle tilt
      const rotateY = ((x - centerX) / centerX) * 3;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0)`;
    });
  });

});