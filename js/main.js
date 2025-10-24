document.addEventListener('DOMContentLoaded', () => {
    const setupTheme = () => {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const applyTheme = (theme) => {
            document.documentElement.classList.toggle('dark-mode', theme === 'dark');
        };

        const savedTheme = localStorage.getItem('theme') || 'light';
        applyTheme(savedTheme);

        themeToggle.addEventListener('click', () => {
            const newTheme = document.documentElement.classList.contains('dark-mode') ? 'light' : 'dark';
            applyTheme(newTheme);
            localStorage.setItem('theme', newTheme);
        });
    };

    const setupMobileMenu = () => {
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const navLinks = document.querySelector('.nav-links');
        if (!hamburgerMenu || !navLinks) return;

        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('open');
        });
    };

    const highlightActiveLink = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        let currentPage = window.location.pathname.split('/').pop();
        if (currentPage === '') currentPage = 'index.html';

        navLinks.forEach(link => {
            const linkPage = link.getAttribute('href').split('/').pop();
            if (linkPage === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };


    const setupContactForm = () => {
        const contactForm = document.getElementById('contact-form');
        const successMessage = document.getElementById('form-success-message');
        if (!contactForm || !successMessage) return;

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Previene que la página se recargue

            // Aquí iría la lógica para enviar los datos a un servidor.
            // Como es una demostración, solo mostraremos el mensaje.
            
            successMessage.style.display = 'block';
            contactForm.reset(); // Limpia el formulario

            // Opcional: Ocultar el mensaje después de unos segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        });
    };

    // Llamar a la nueva función
    setupContactForm();

;

    // Inicializar todos los módulos compartidos
    setupTheme();
    setupMobileMenu();
    highlightActiveLink();
});