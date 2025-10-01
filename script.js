// Navegação mobile melhorada
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            // Prevenir scroll do body quando menu estiver aberto
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Fechar menu ao clicar fora dele
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

// Sistema de vídeos YouTube em carrossel
let currentVideo = 0;
const videoCards = document.querySelectorAll('.video-card');
const videosTrack = document.getElementById('videos-track');
const prevBtn = document.getElementById('videos-prev-btn');
const nextBtn = document.getElementById('videos-next-btn');
const dots = document.querySelectorAll('.dot');

function updateVideoCarousel() {
    if (!videosTrack || videoCards.length === 0) return;
    
    // Calcular a posição baseada no índice atual (usando porcentagem)
    const translateX = currentVideo * 100;
    videosTrack.style.transform = `translateX(-${translateX}%)`;
    
    // Atualizar dots
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentVideo);
    });
    
    // Atualizar botões
    if (prevBtn) {
        prevBtn.disabled = currentVideo === 0;
        prevBtn.style.opacity = currentVideo === 0 ? '0.5' : '1';
    }
    if (nextBtn) {
        nextBtn.disabled = currentVideo === videoCards.length - 1;
        nextBtn.style.opacity = currentVideo === videoCards.length - 1 ? '0.5' : '1';
    }
}

function nextVideo() {
    if (currentVideo < videoCards.length - 1) {
        currentVideo++;
        updateVideoCarousel();
    }
}

function prevVideo() {
    if (currentVideo > 0) {
        currentVideo--;
        updateVideoCarousel();
    }
}

function goToSlide(index) {
    if (index >= 0 && index < videoCards.length) {
        currentVideo = index;
        updateVideoCarousel();
    }
}

// Event listeners para os botões do carrossel
if (nextBtn) {
    nextBtn.addEventListener('click', nextVideo);
}

if (prevBtn) {
    prevBtn.addEventListener('click', prevVideo);
}

// Event listeners para os dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => goToSlide(index));
});

// Auto-play do carrossel (opcional)
// setInterval(nextVideo, 8000);

// Sistema de vídeos YouTube otimizado
document.addEventListener('DOMContentLoaded', function() {
    console.log('Inicializando sistema de vídeos...');
    const videoContainers = document.querySelectorAll('.video-container');
    console.log('Encontrados', videoContainers.length, 'containers de vídeo');
    
    videoContainers.forEach((container, index) => {
        const placeholder = container.querySelector('.video-placeholder');
        const player = container.querySelector('.video-player iframe');
        const videoId = container.getAttribute('data-video-id');
        
        console.log(`Vídeo ${index + 1}:`, {
            placeholder: !!placeholder,
            player: !!player,
            videoId: videoId
        });
        
        if (placeholder && player && videoId) {
            placeholder.addEventListener('click', function() {
                console.log('Clicou no vídeo:', videoId);
                // Mostrar loading state
                container.classList.add('loading');
                
                // Construir URL do YouTube otimizada para carregamento rápido
                const youtubeUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&showinfo=0&controls=1&fs=1&cc_load_policy=0&iv_load_policy=3&start=0&end=&origin=${window.location.origin}`;
                
                console.log('URL do YouTube:', youtubeUrl);
                
                // Definir src do iframe
                player.src = youtubeUrl;
                
                // Mostrar player e esconder placeholder
                setTimeout(() => {
                    placeholder.style.display = 'none';
                    player.parentElement.style.display = 'block';
                    container.classList.remove('loading');
                    console.log('Vídeo carregado:', videoId);
                }, 300);
            });
        } else {
            console.error('Erro na configuração do vídeo', index + 1, {
                placeholder: !!placeholder,
                player: !!player,
                videoId: videoId
            });
        }
    });
    
    // Inicializar carrossel
    updateVideoCarousel();
    
    // Recalcular carrossel no resize
    window.addEventListener('resize', () => {
        setTimeout(updateVideoCarousel, 100);
    });
});

// Função para atualizar IDs dos vídeos (chamada quando você enviar os links)
function updateVideoIds(videoIds) {
    const containers = document.querySelectorAll('.video-container');
    
    containers.forEach((container, index) => {
        if (videoIds[index]) {
            container.setAttribute('data-video-id', videoIds[index]);
        }
    });
}

// Função para extrair ID do YouTube a partir da URL
function extractYouTubeId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de scroll para elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos elementos
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.about-card, .speaker-card, .timeline-item, .testimonial-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Header fixo com efeito de transparência e navegação ativa
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    // Efeito de transparência
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    // Detectar seção ativa
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    // Atualizar estado ativo dos links
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.replace('#', '') === currentSection) {
            link.classList.add('active');
        }
    });
});

// Contador de caracteres para campos de texto
const textInputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"]');
textInputs.forEach(input => {
    input.addEventListener('input', function() {
        // Adicionar classe de validação visual
        if (this.value.length > 0) {
            this.style.borderColor = '#10b981';
        } else {
            this.style.borderColor = 'rgba(255,255,255,0.3)';
        }
    });
});

// Timer funcional com 25 minutos
document.addEventListener('DOMContentLoaded', function() {
    const timerNumbers = document.querySelectorAll('.timer-number');
    const timerLabels = document.querySelectorAll('.timer-label');
    
    if (timerNumbers.length >= 3) {
        // Definir tempo inicial: 25 minutos = 1500 segundos
        let totalSeconds = 25 * 60; // 25 minutos em segundos
        
        function updateTimer() {
            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;
            
            // Atualizar os números do timer
            if (timerNumbers[0]) timerNumbers[0].textContent = hours.toString().padStart(2, '0');
            if (timerNumbers[1]) timerNumbers[1].textContent = minutes.toString().padStart(2, '0');
            if (timerNumbers[2]) timerNumbers[2].textContent = seconds.toString().padStart(2, '0');
            
            // Adicionar efeito visual quando restam poucos minutos
            if (totalSeconds <= 300) { // 5 minutos restantes
                timerNumbers.forEach(num => {
                    num.style.color = '#ff4444';
                    num.style.animation = 'pulse 1s infinite';
                });
            }
            
            if (totalSeconds <= 0) {
                // Timer acabou
                timerNumbers.forEach(num => {
                    num.textContent = '00';
                    num.style.color = '#ff4444';
                });
                clearInterval(timerInterval);
            } else {
                totalSeconds--;
            }
        }
        
        // Inicializar timer
        updateTimer();
        
        // Atualizar a cada segundo
        const timerInterval = setInterval(updateTimer, 1000);
    }
});

// Lazy loading para imagens
const images = document.querySelectorAll('img');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.src || img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Função para mostrar/ocultar menu mobile
function toggleMobileMenu() {
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.toggle('show');
        navToggle.classList.toggle('active');
    }
}

// Estilos do menu mobile já estão no CSS principal

// Scroll suave para o indicador
document.addEventListener('DOMContentLoaded', function() {
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.querySelector('#sobre');
            if (aboutSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = aboutSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});

// Sistema de Lightbox para Fotos
document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDescription = document.getElementById('lightbox-description');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');
    const photoCards = document.querySelectorAll('.photo-card');
    
    let currentPhotoIndex = 0;
    const photos = [];
    
    // Coletar dados das fotos
    photoCards.forEach((card, index) => {
        const img = card.querySelector('img');
        
        photos.push({
            src: img.src,
            alt: img.alt,
            title: `Foto ${index + 1}`,
            description: 'Evento anterior'
        });
        
        // Adicionar evento de clique
        card.addEventListener('click', () => {
            openLightbox(index);
        });
    });
    
    function openLightbox(index) {
        currentPhotoIndex = index;
        updateLightboxContent();
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    function updateLightboxContent() {
        const photo = photos[currentPhotoIndex];
        lightboxImage.src = photo.src;
        lightboxImage.alt = photo.alt;
        lightboxTitle.textContent = photo.title;
        lightboxDescription.textContent = photo.description;
        
        // Atualizar botões de navegação
        lightboxPrev.style.display = photos.length > 1 ? 'flex' : 'none';
        lightboxNext.style.display = photos.length > 1 ? 'flex' : 'none';
    }
    
    function showPrevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photos.length) % photos.length;
        updateLightboxContent();
    }
    
    function showNextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photos.length;
        updateLightboxContent();
    }
    
    // Event listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', showPrevPhoto);
    lightboxNext.addEventListener('click', showNextPhoto);
    
    // Fechar lightbox ao clicar no fundo
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navegação por teclado
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevPhoto();
                break;
            case 'ArrowRight':
                showNextPhoto();
                break;
        }
    });
    
    // Prevenir scroll do body quando lightbox estiver aberto
    lightbox.addEventListener('wheel', function(e) {
        e.preventDefault();
    }, { passive: false });
});
