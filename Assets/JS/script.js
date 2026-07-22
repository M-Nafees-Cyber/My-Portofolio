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

    if (form && message) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const name = form.elements.name.value.trim() || 'Guest';
            message.textContent = `Thanks, ${name}! Your message has been sent.`;
            message.classList.add('visible');
            form.reset();

            setTimeout(() => {
                message.classList.remove('visible');
            }, 3500);
        });
    }
});
