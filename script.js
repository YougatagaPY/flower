// Initialisation de GSAP
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Loader Animation
    const loader = document.querySelector('.page-loader');
    const loaderText = document.querySelectorAll('.loader-text span');
    const loaderProgress = document.querySelector('.loader-progress');

    const tl = gsap.timeline();
    tl.to(loaderText, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power3.out"
    })
    .to(loaderProgress, {
        width: "100%",
        duration: 1,
        ease: "power3.inOut"
    })
    .to(loader, {
        yPercent: -100,
        duration: 0.8,
        ease: "power3.inOut",
        onComplete: () => document.body.classList.remove('loading')
    });

    // Curseur personnalisé
    const cursor = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');

    const moveCursor = (e) => {
        const mouseY = e.clientY;
        const mouseX = e.clientX;
        
        cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
        cursorOutline.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    window.addEventListener('mousemove', moveCursor);

    // Effet hover sur les éléments interactifs
    const interactiveElements = document.querySelectorAll('a, button, .flower-item');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => gsap.to(cursorOutline, {scale: 1.5, duration: 0.3}));
        el.addEventListener('mouseleave', () => gsap.to(cursorOutline, {scale: 1, duration: 0.3}));
    });

    // Navigation
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuLinks = document.querySelectorAll('.menu-link');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            gsap.to(navMenu, {opacity: 1, visibility: "visible", duration: 0.3});
            gsap.from(menuLinks, {y: 20, opacity: 0, stagger: 0.1, duration: 0.3});
        } else {
            gsap.to(navMenu, {opacity: 0, visibility: "hidden", duration: 0.3});
        }
    });

    // Animation de texte révélé
    ScrollTrigger.batch('.reveal-text', {
        onEnter: (elements) => gsap.from(elements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        }),
        start: "top 80%"
    });

    // Animation des fleurs
    ScrollTrigger.batch('.flower-item', {
        onEnter: (elements) => gsap.from(elements, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out"
        }),
        start: "top 80%"
    });

    // Changement de couleur de fond au survol des fleurs
    const flowerItems = document.querySelectorAll('.flower-item');
    flowerItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const color = item.getAttribute('data-color');
            gsap.to('body', {backgroundColor: color, duration: 0.3});
        });
        item.addEventListener('mouseleave', () => {
            gsap.to('body', {backgroundColor: 'var(--color-bg)', duration: 0.3});
        });
        
        // Gestion du clic pour la navigation
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const href = item.getAttribute('href');
            gsap.to(window, {duration: 0.5, scrollTo: 0, ease: "power3.inOut", onComplete: () => window.location.href = href});
        });
    });

    // Parallax effect léger
    gsap.utils.toArray('.flower-image img').forEach(img => {
        gsap.to(img, {
            yPercent: -15,
            ease: "none",
            scrollTrigger: {
                trigger: img,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // Smooth scrolling optimisé
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            gsap.to(window, {duration: 0.8, scrollTo: {y: target, offsetY: 50}, ease: "power3.inOut"});
            if (navMenu.classList.contains('active')) {
                navToggle.click();
            }
        });
    });
});
