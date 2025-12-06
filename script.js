// Console greeting
console.log("%c Portfolio Loaded ", "background: #3574f0; color: #fff; border-radius: 3px; padding: 2px 5px;");

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});