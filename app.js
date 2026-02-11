document.addEventListener('DOMContentLoaded', () => {

    // ---- Scroll Reveal ----
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    // ---- Navbar ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('nav-scrolled', window.scrollY > 80);
    }, { passive: true });

    // ---- Mobile Menu ----
    const toggle = document.getElementById('menu-toggle');
    const menu = document.getElementById('mobile-menu');
    const links = menu.querySelectorAll('a');
    let open = false;

    const toggleMenu = () => {
        open = !open;
        menu.classList.toggle('open', open);
        toggle.classList.toggle('menu-active', open);
        document.body.style.overflow = open ? 'hidden' : '';
    };

    toggle.addEventListener('click', toggleMenu);
    links.forEach(link => link.addEventListener('click', () => open && toggleMenu()));

    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - 80,
                behavior: 'smooth'
            });
        });
    });

});
