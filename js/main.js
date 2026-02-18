import { initNavigation } from './modules/navigation.js';
import { initDashboard } from './modules/dashboard.js';
import { initLearning } from './modules/learning.js';
import { initInterview } from './modules/interview.js';
import { initArena } from './modules/arena.js';
import { initResume } from './modules/resume.js';
import { ensureAuth, logout, getCurrentUser } from './modules/auth.js';

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Bootstrapping Selectra AI...');

    // Auth Check
    const user = ensureAuth();
    if (!user) return; // ensureAuth redirects

    // Populate User Info
    const nameDisplay = document.getElementById('user-name-display');
    const avatarImg = document.getElementById('user-avatar-img');
    if (nameDisplay) nameDisplay.innerText = user.name;
    if (avatarImg) avatarImg.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=random`;

    // Logout Handler
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }

    initNavigation();
    initDashboard();
    initLearning();
    initInterview();
    initArena();
    initResume();

    // Theme Toggle Logic
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            const isLight = document.body.classList.contains('light-mode');
            themeToggle.innerHTML = isLight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        });
    }

    // Listen for navigation changes to trigger specific module logic
    window.addEventListener('section-changed', (e) => {
        const sectionId = e.detail.targetId;
        console.log(`Switched to: ${sectionId}`);

        if (sectionId === 'coding-arena') {
            // Maybe refresh CodeMirror
            initArena();
        }
    });
});
