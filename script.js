// Performance optimized script
document.addEventListener('DOMContentLoaded', function () {
    // Utility: Debounce function
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // CTA buttons - Simple and fast
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            // Se for um link (tag <a>) com href válido, não previne o comportamento padrão
            if (this.tagName === 'A' && this.href && this.href !== '#') {
                // Apenas adiciona o efeito visual
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
                return; // Permite que o link funcione normalmente
            }

            // Para botões "QUERO PARTICIPAR" e "GARANTIR MINHA VAGA"
            if (this.id === 'nav-cta' || this.id === 'hero-cta') {
                e.preventDefault();
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);

                // Rola até a seção de preços
                const pricingSection = document.getElementById('pricing');
                if (pricingSection) {
                    pricingSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
                return;
            }

            e.preventDefault();
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);

            const ctaSection = document.getElementById('cta');
            if (ctaSection && this.id !== 'main-cta') {
                ctaSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                alert('Redirecionando para a página de inscrição...\n\nAqui você conectaria com sua plataforma de pagamento ou formulário de inscrição.');
            }
        }, { passive: false });
    });

    // Intersection Observer - Optimized
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);

    // Observe benefit cards - Batch processing
    const benefitCards = document.querySelectorAll('.benefit-card');
    benefitCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.5s ease-out ${index * 0.08}s, transform 0.5s ease-out ${index * 0.08}s`;
        observer.observe(card);
    });

    // Mentor section - Optimized
    const mentorImage = document.querySelector('.mentor-image-wrapper');
    const mentorInfo = document.querySelector('.mentor-info');

    if (mentorImage && mentorInfo) {
        mentorImage.style.opacity = '0';
        mentorImage.style.transform = 'translateX(-30px)';
        mentorImage.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';

        mentorInfo.style.opacity = '0';
        mentorInfo.style.transform = 'translateX(30px)';
        mentorInfo.style.transition = 'opacity 0.6s ease-out 0.15s, transform 0.6s ease-out 0.15s';

        observer.observe(mentorImage);
        observer.observe(mentorInfo);
    }

    // Optimized parallax - Only on desktop and with reduced frequency
    const isDesktop = window.innerWidth > 768;
    if (isDesktop) {
        let ticking = false;
        const glowOrbs = document.querySelectorAll('.glow-orb');

        const updateParallax = () => {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight * 1.5) { // Only animate in viewport
                glowOrbs.forEach((orb, index) => {
                    orb.style.transform = `translateY(${scrolled * (index + 1) * 0.2}px)`;
                });
            }
            ticking = false;
        };

        window.addEventListener('scroll', function () {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        }, { passive: true });
    }

    // Scroll indicator - Simple toggle
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        const toggleIndicator = debounce(() => {
            scrollIndicator.style.opacity = window.scrollY > 100 ? '0' : '1';
        }, 100);

        window.addEventListener('scroll', toggleIndicator, { passive: true });
    }

    // Counter animation - Optimized
    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 50); // Fewer steps

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = current + '+';
            }
        }, 30); // Slower interval
    }

    // Stat counter observer
    const statObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target.querySelector('.stat-number');
                if (number && !number.classList.contains('animated')) {
                    number.classList.add('animated');
                    const text = number.textContent;
                    if (text.includes('800')) {
                        number.textContent = '0+';
                        animateCounter(number, 800);
                    }
                    statObserver.unobserve(entry.target);
                }
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.stat-card').forEach(card => {
        statObserver.observe(card);
    });

    // Mouse glow - Heavily debounced and only on desktop
    if (isDesktop) {
        const ctaGlow = document.querySelector('.cta-glow');
        const ctaSection = document.querySelector('.cta-section');

        if (ctaGlow && ctaSection) {
            let isInSection = false;

            const updateGlow = debounce((e) => {
                if (!isInSection) return;
                const rect = ctaSection.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                ctaGlow.style.left = x + '%';
                ctaGlow.style.top = y + '%';
            }, 50);

            const checkSection = debounce(() => {
                const rect = ctaSection.getBoundingClientRect();
                isInSection = rect.top < window.innerHeight && rect.bottom > 0;
            }, 100);

            window.addEventListener('scroll', checkSection, { passive: true });
            document.addEventListener('mousemove', updateGlow, { passive: true });
            checkSection();
        }
    }

    // Viral Gallery Carousel
    const viralGallery = document.querySelector('.viral-gallery');
    const dots = document.querySelectorAll('.viral-gallery-dots .dot');
    const photoCards = document.querySelectorAll('.viral-photo-card');

    if (viralGallery && dots.length > 0) {
        // Update active dot based on scroll position
        const updateActiveDot = debounce(() => {
            const scrollLeft = viralGallery.scrollLeft;
            const cardWidth = photoCards[0].offsetWidth;
            const activeIndex = Math.round(scrollLeft / cardWidth);

            dots.forEach((dot, index) => {
                if (index === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }, 100);

        viralGallery.addEventListener('scroll', updateActiveDot, { passive: true });

        // Click on dots to scroll to specific card
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const cardWidth = photoCards[0].offsetWidth;
                viralGallery.scrollTo({
                    left: cardWidth * index,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Fast page load
    document.body.style.opacity = '1';
});
