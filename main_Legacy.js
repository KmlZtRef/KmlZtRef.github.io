(
    function () {
        const glow = document.getElementById('cursorGlow');
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (prefersReducedMotion) {
            glow.style.display = 'none';
        } else {
            window.addEventListener('mousemove', function (e) {
                glow.style.left = e.clientX + 'px';
                glow.style.top = e.clientY + 'px';
            });
        }

        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.12 });

        reveals.forEach(function (el, i) {
            el.style.transitionDelay = (i * 0.06) + 's';
            observer.observe(el);
        });

        document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
            anchor.addEventListener('click', function (e) {
                const id = anchor.getAttribute('href');
                if (!id || id === '#') return;

                const target = document.querySelector(id);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    }
)();