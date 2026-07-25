document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const timeDisplay = document.getElementById('live-time');
    const form = document.getElementById('contact-form');
    const message = document.getElementById('form-message');
    const storedTheme = localStorage.getItem('cyber-theme');

    if (storedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.textContent = 'Dark Mode';
    }

    if (timeDisplay) {
        const updateTime = () => {
            const now = new Date();
            timeDisplay.textContent = now.toLocaleString([], {
                dateStyle: 'medium',
                timeStyle: 'short'
            });
        };

        updateTime();
        setInterval(updateTime, 1000);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            themeToggle.textContent = isLight ? 'Dark Mode' : 'Light Mode';
            localStorage.setItem('cyber-theme', isLight ? 'light' : 'dark');
        });
    }

    // Mobile menu toggle with animated hamburger + overlay
    const menuToggle = document.getElementById('menu-toggle');
    const navBar = document.querySelector('.nav_bar');
    const overlay = document.getElementById('nav-overlay');

    if (menuToggle && navBar) {
        const closeMenu = () => {
            navBar.classList.remove('open');
            menuToggle.classList.remove('open');
            menuToggle.setAttribute('aria-expanded', 'false');
            if (overlay) { overlay.hidden = true; overlay.classList.remove('open'); }
        };

        menuToggle.addEventListener('click', () => {
            const isOpen = navBar.classList.toggle('open');
            menuToggle.classList.toggle('open', isOpen);
            menuToggle.setAttribute('aria-expanded', String(isOpen));
            if (overlay) { overlay.hidden = !isOpen; overlay.classList.toggle('open', isOpen); }
        });

        if (overlay) overlay.addEventListener('click', closeMenu);

        // Close menu on Escape or when resizing to desktop
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navBar.classList.contains('open')) closeMenu();
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 900) closeMenu();
        });
    }

    if (form && message) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = form.elements.name.value.trim() || 'Guest';
            const email = form.elements.email.value.trim();
            const messageText = form.elements.message.value.trim();
            const recipient = 'nafeezasnfs@gmail.com';
            const subject = encodeURIComponent(`Portfolio contact from ${name}`);
            const body = encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\n\nMessage:\n${messageText}`
            );

            window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;

            message.textContent = `Thanks, ${name}! Your email app should open with your message ready to send.`;
            message.classList.add('visible');
            form.reset();

            setTimeout(() => {
                message.classList.remove('visible');
            }, 5000);
        });
    }
});
