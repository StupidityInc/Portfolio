// IDE File Switching Logic
function openFile(fileName) {
    // 1. Remove 'active' from all sidebar items
    document.querySelectorAll('.file-item').forEach(el => el.classList.remove('active'));
    // 2. Hide all content and tabs
    document.querySelectorAll('.code-view').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tab').forEach(el => {
        el.style.display = 'none';
        el.classList.remove('active');
    });

    // 3. Activate selected
    const sidebarItem = document.querySelector(`.file-item[onclick="openFile('${fileName}')"]`);
    if(sidebarItem) sidebarItem.classList.add('active');

    const contentDiv = document.getElementById(`content-${fileName}`);
    if(contentDiv) contentDiv.style.display = 'block';

    const tabDiv = document.getElementById(`tab-${fileName}`);
    if(tabDiv) {
        tabDiv.style.display = 'flex';
        tabDiv.classList.add('active');
    }
}

// Typing Effect
document.addEventListener("DOMContentLoaded", () => {
    const textElement = document.querySelector(".text-typing");
    if(textElement) {
        const words = textElement.getAttribute("data-text").split(",");
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            const currentWord = words[wordIndex];
            textElement.textContent = currentWord.substring(0, charIndex + (isDeleting ? -1 : 1));
            charIndex += isDeleting ? -1 : 1;
            if (!isDeleting && charIndex === currentWord.length) { isDeleting = true; setTimeout(type, 2000); }
            else if (isDeleting && charIndex === 0) { isDeleting = false; wordIndex = (wordIndex + 1) % words.length; setTimeout(type, 500); }
            else setTimeout(type, isDeleting ? 100 : 200);
        }
        type();
    }
});

// Matrix Background Effect
const canvas = document.getElementById('matrixCanvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function drawMatrix() {
        ctx.fillStyle = 'rgba(11, 12, 16, 0.05)'; // Fade trail
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0'; // Green text
        ctx.font = fontSize + 'px monospace';
        for (let i = 0; i < drops.length; i++) {
            const text = chars.charAt(Math.floor(Math.random() * chars.length));
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(drawMatrix, 50);
}
