document.addEventListener('DOMContentLoaded', () => {

  // --- 1. Custom Cursor Logic (Optimized) ---
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

    // Hover Effects
    const interactiveElements = document.querySelectorAll('a, button, .bento-box, .timeline-content, .setup-card, .skill-group span');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  // --- 2. Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show-fade');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  // Select elements to animate
  const animateElements = document.querySelectorAll('.hero-content > *, .section-title, .about-text, .skills-card, .timeline-item, .bento-box, .setup-card');
  animateElements.forEach(el => {
    el.classList.add('hidden-fade');
    observer.observe(el);
  });

  // --- 3. 3D Tilt Effect (Brave Mode) ---
  // Applies a subtle 3D tilt to cards when hovered
  const tiltCards = document.querySelectorAll('.bento-box, .setup-card, .timeline-content');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      if (window.innerWidth < 768) return; // Disable on mobile

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
      card.style.transition = 'transform 0.5s ease'; // Smooth reset
    });
  });

  // --- 4. Mobile Menu ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isClosed = navLinks.style.display === 'none' || navLinks.style.display === '';
      if (isClosed) {
        navLinks.style.display = 'flex';
        navLinks.style.flexDirection = 'column';
        navLinks.style.position = 'absolute';
        navLinks.style.top = '80px';
        navLinks.style.left = '0';
        navLinks.style.width = '100%';
        navLinks.style.background = 'rgba(255,255,255,0.95)';
        navLinks.style.backdropFilter = 'blur(10px)';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      } else {
        navLinks.style.display = 'none';
      }
    });
  }
});