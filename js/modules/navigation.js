export function initNavigation() {
    console.log('Initializing Navigation');

    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('main section');

    // Handle All Internal Hash Navigation
    document.addEventListener('click', (e) => {
        const link = e.target.closest('a');
        if (!link) return;

        const href = link.getAttribute('href');
        if (!href || !href.startsWith('#')) return;

        // Custom sections handling
        const targetId = href.substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            e.preventDefault();

            // Hide all sections
            sections.forEach(s => s.classList.add('hidden'));
            
            // Show target section
            targetSection.classList.remove('hidden');

            // Update Body Context for Dynamic Themes
            document.body.dataset.page = targetId;

            // Update Sidebar Active State
            navLinks.forEach(l => {
                const lHref = l.getAttribute('href');
                if (lHref === href) {
                    l.parentElement.classList.add('active');
                } else {
                    l.parentElement.classList.remove('active');
                }
            });

            // Close Sidebar on Mobile
            const sidebar = document.querySelector('.sidebar');
            if (sidebar) sidebar.classList.remove('open');

            // Dispatch event for other modules
            window.dispatchEvent(new CustomEvent('section-changed', { detail: { targetId } }));
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });

    // Mobile Toggle
    const navToggle = document.getElementById('nav-toggle');
    const sidebar = document.querySelector('.sidebar');

    if (navToggle && sidebar) {
        navToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (sidebar.classList.contains('open') &&
                !sidebar.contains(e.target) &&
                !navToggle.contains(e.target)) {
                sidebar.classList.remove('open');
            }
        });
    }
    // Desktop Toggle
    const desktopToggle = document.getElementById('desktop-nav-toggle');
    if (desktopToggle && sidebar) {
        desktopToggle.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
            // Optional: Rotate icon or change styling when collapsed
            if (sidebar.classList.contains('collapsed')) {
                // desktopToggle.innerHTML = '<i class="fa-solid fa-bars"></i>'; // Change icon if needed
            } else {
                // desktopToggle.innerHTML = '<i class="fa-solid fa-graduation-cap"></i>';
            }
        });
    }

    // Desktop: Closer Button inside Sidebar
    const closeSidebarBtn = document.getElementById('sidebar-close-btn');
    if (closeSidebarBtn && sidebar) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.add('collapsed');
        });
    }
}
