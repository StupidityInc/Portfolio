// Active File State
let currentFile = 'main';

function openTab(fileId) {
    // 1. Update State
    currentFile = fileId;
    
    // 2. Sidebar Highlighting
    document.querySelectorAll('.tree-item').forEach(el => el.classList.remove('active'));
    // Find tree item with specific onclick handler (simple selector)
    const treeItem = document.querySelector(`.tree-item[onclick="openTab('${fileId}')"]`);
    if(treeItem) treeItem.classList.add('active');

    // 3. Tab Highlighting
    document.querySelectorAll('.tab').forEach(el => el.classList.remove('active'));
    document.getElementById(`tab-${fileId}`).classList.add('active');

    // 4. Content Switching
    document.querySelectorAll('.code-content').forEach(el => el.classList.remove('active'));
    document.getElementById(`content-${fileId}`).classList.add('active');

    // 5. Update Breadcrumbs
    const fileNameMap = {
        'main': 'main.py',
        'projects': 'projects.json',
        'about': 'about_me.md',
        'fedora': 'fedora_config.sh'
    };
    document.getElementById('current-file-name').textContent = fileNameMap[fileId];
}

// Terminal Interaction (Fun typing effect)
const terminalInput = document.querySelector('.blinking-cursor');
document.addEventListener('keydown', (e) => {
    // Just a visual fun trick, doesn't actually process commands
    if (e.key.length === 1) {
        // terminalInput.textContent = ... (Optional: Make it typeable)
    }
});

// Run Button Logic
document.querySelector('.btn-run').addEventListener('click', () => {
    const termBody = document.querySelector('.terminal-body');
    const newCmd = document.createElement('div');
    newCmd.className = 'term-line';
    newCmd.innerHTML = `<span class="prompt">[visitor@fedora-portfolio ~]$</span> <span class="cmd">python3 main.py</span>`;
    
    const newOutput = document.createElement('div');
    newOutput.className = 'term-line output';
    newOutput.innerText = "Running application... (Check the 'main.py' tab)";
    
    termBody.insertBefore(newOutput, termBody.lastElementChild);
    termBody.insertBefore(newCmd, newOutput);
    termBody.scrollTop = termBody.scrollHeight;
});