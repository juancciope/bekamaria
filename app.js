/* ================================
   BÉKA MARIA — Premium Interactivity
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ---- Loading Screen ----
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('loaded');
    }, 1800);


    // ---- Cursor Glow (Desktop only) ----
    const cursorGlow = document.getElementById('cursor-glow');
    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let glowX = 0, glowY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorGlow.classList.add('active');
        });

        document.addEventListener('mouseleave', () => {
            cursorGlow.classList.remove('active');
        });

        const animateGlow = () => {
            glowX += (mouseX - glowX) * 0.08;
            glowY += (mouseY - glowY) * 0.08;
            cursorGlow.style.left = glowX + 'px';
            cursorGlow.style.top = glowY + 'px';
            requestAnimationFrame(animateGlow);
        };
        animateGlow();
    }


    // ---- Scroll Reveal ----
    const revealElements = document.querySelectorAll('.reveal');
    const staggerElements = document.querySelectorAll('.reveal-stagger');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // Stagger observer with delay
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Find index among siblings
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children).filter(c => c.classList.contains('reveal-stagger'));
                const idx = siblings.indexOf(entry.target);

                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, idx * 100);

                staggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05 });

    staggerElements.forEach(el => staggerObserver.observe(el));


    // ---- Navbar on Scroll ----
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('nav-scrolled', window.scrollY > 80);
    }, { passive: true });


    // ---- Mobile Menu ----
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = mobileMenu.querySelectorAll('a');
    let menuOpen = false;

    const toggleMenu = () => {
        menuOpen = !menuOpen;
        mobileMenu.classList.toggle('open', menuOpen);
        menuToggle.classList.toggle('menu-active', menuOpen);
        document.body.style.overflow = menuOpen ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => menuOpen && toggleMenu()));


    // ---- Smooth Scroll ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const id = anchor.getAttribute('href');
            if (id === '#') return;
            const target = document.querySelector(id);
            if (!target) return;
            e.preventDefault();
            const offset = navbar.offsetHeight;
            window.scrollTo({
                top: target.getBoundingClientRect().top + window.scrollY - offset,
                behavior: 'smooth'
            });
        });
    });


    // ---- Gallery Drag Scroll ----
    const gallery = document.getElementById('gallery-scroll');
    if (gallery) {
        let isDown = false;
        let startX;
        let scrollLeft;

        gallery.addEventListener('mousedown', (e) => {
            isDown = true;
            gallery.style.cursor = 'grabbing';
            startX = e.pageX - gallery.offsetLeft;
            scrollLeft = gallery.scrollLeft;
        });

        gallery.addEventListener('mouseleave', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });

        gallery.addEventListener('mouseup', () => {
            isDown = false;
            gallery.style.cursor = 'grab';
        });

        gallery.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - gallery.offsetLeft;
            const walk = (x - startX) * 2;
            gallery.scrollLeft = scrollLeft - walk;
        });
    }


    // ---- Contact Form ----
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = contactForm.querySelector('#name').value;
            const email = contactForm.querySelector('#email').value;
            const message = contactForm.querySelector('#message').value;

            const subject = encodeURIComponent(`Website Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            window.location.href = `mailto:bekahjaynemusic@gmail.com?subject=${subject}&body=${body}`;

            const btn = contactForm.querySelector('button[type="submit"]');
            const original = btn.innerHTML;
            btn.innerHTML = '<span class="relative">Opening Mail...</span>';
            setTimeout(() => {
                btn.innerHTML = original;
                contactForm.reset();
            }, 2000);
        });
    }


    // ---- Parallax on Hero Image ----
    const heroImg = document.querySelector('#hero img');
    if (heroImg && window.innerWidth > 768) {
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY;
            const heroH = document.getElementById('hero').offsetHeight;
            if (scrolled < heroH) {
                const translate = scrolled * 0.1;
                heroImg.style.transform = `translateY(${translate}px)`;
            }
        }, { passive: true });
    }


    // ---- Active Nav Highlight ----
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY + 200;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    const isActive = link.getAttribute('href') === `#${id}`;
                    link.style.color = isActive ? '#f0eef2' : '';
                });
            }
        });
    }, { passive: true });

});
