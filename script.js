document.addEventListener('DOMContentLoaded', () => {

  // --- Custom Cursor Logic (Performance Optimized) ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');

  // Mouse position state
  let mouseX = 0;
  let mouseY = 0;
  // Circle position state (for trailing effect)
  let circleX = 0;
  let circleY = 0;

  // Only enable on desktop
  if (window.matchMedia("(min-width: 768px)").matches) {

    // 1. Track mouse position on move
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Move dot instantly
      if (cursorDot) {
        cursorDot.style.left = `${mouseX}px`;
        cursorDot.style.top = `${mouseY}px`;
      }
    });

    // 2. Animate circle with a smooth loop (No crashes!)
    function animateCursor() {
      // Linear interpolation for smooth trailing (0.1 = speed)
      const speed = 0.15;

      circleX += (mouseX - circleX) * speed;
      circleY += (mouseY - circleY) * speed;

      if (cursorCircle) {
        cursorCircle.style.left = `${circleX}px`;
        cursorCircle.style.top = `${circleY}px`;
      }

      requestAnimationFrame(animateCursor);
    }

    // Start the loop
    animateCursor();

    // 3. Hover Effects
    const interactiveElements = document.querySelectorAll('a, button, .bento-box, .timeline-content');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  // --- Mobile Menu Toggle ---
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
        navLinks.style.background = '#fff';
        navLinks.style.padding = '20px';
        navLinks.style.boxShadow = '0 10px 20px rgba(0,0,0,0.1)';
      } else {
        navLinks.style.display = 'none';
      }
    });
  }
});