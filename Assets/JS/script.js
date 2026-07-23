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
