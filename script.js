document.addEventListener('DOMContentLoaded', () => {

  // --- Custom Cursor Logic ---
  const cursorDot = document.querySelector('.cursor-dot');
  const cursorCircle = document.querySelector('.cursor-circle');

  // Only enable custom cursor on desktop
  if (window.matchMedia("(min-width: 768px)").matches) {
    window.addEventListener('mousemove', (e) => {
      const posX = e.clientX;
      const posY = e.clientY;

      // Dot follows immediately
      cursorDot.style.left = `${posX}px`;
      cursorDot.style.top = `${posY}px`;

      // Circle follows with slight lag
      cursorCircle.animate({
        left: `${posX}px`,
        top: `${posY}px`
      }, { duration: 500, fill: "forwards" });
    });

    // Hover effect
    const interactiveElements = document.querySelectorAll('a, button, .bento-box, .timeline-content');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  // --- Mobile Menu Toggle ---
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger) {
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