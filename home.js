/**
 * HOME.JS - Funcionalidades específicas de la página de inicio
 */

class HomePage {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initVideoHero();
      this.initContestCards();
      this.initGalleryHoverEffects();
    });
  }

  initVideoHero() {
    const videoHero = document.querySelector('.video-hero');
    const video = document.querySelector('.video-background video');
    
    if (!videoHero || !video) return;

    // Fallback para móviles
    if (window.innerWidth < 768) {
      videoHero.style.backgroundImage = 'url("img/hero-fallback-mobile.jpg")';
      videoHero.style.backgroundSize = 'cover';
      video.style.display = 'none';
      return;
    }

    // Forzar autoplay en desktop
    const playPromise = video.play();
    
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        videoHero.style.backgroundImage = 'url("img/hero-fallback.jpg")';
        video.style.display = 'none';
      });
    }
  }

  initContestCards() {
    const cards = document.querySelectorAll('.contest-card');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        if (window.innerWidth > 768) {
          card.style.transform = 'translateY(-10px)';
          card.style.boxShadow = '0 15px 30px rgba(0,0,0,0.3)';
        }
      });

      card.addEventListener('mouseleave', () => {
        if (window.innerWidth > 768) {
          card.style.transform = '';
          card.style.boxShadow = '';
        }
      });
    });
  }

  initGalleryHoverEffects() {
    const galleryItems = document.querySelectorAll('.winner-item');
    
    galleryItems.forEach(item => {
      item.addEventListener('touchstart', () => {
        item.classList.add('hover-effect');
      });
      
      item.addEventListener('touchend', () => {
        setTimeout(() => {
          item.classList.remove('hover-effect');
        }, 500);
      });
    });
  }
}

// Iniciar solo en la página de inicio
if (document.querySelector('.video-hero')) {
  new HomePage();
}
class HomePage {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.initVideoHero();
      this.initContestCards();
      this.initGalleryHoverEffects();
      this.initParticipantButton(); // Nueva función para el botón
    });
  }

  // ... (mantén tus otras funciones existentes) ...

  initParticipantButton() {
    const participantButton = document.querySelector('.contest-button');
    
    if (!participantButton) return;

    // Efecto GSAP al cargar (opcional)
    gsap.from(participantButton, {
      opacity: 0,
      y: 20,
      duration: 1,
      delay: 0.5,
      ease: 'back.out'
    });

    // Efecto hover con GSAP
    participantButton.addEventListener('mouseenter', () => {
      gsap.to(participantButton, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out'
      });
      
      // Efecto de partículas (opcional)
      this.createParticles(participantButton);
    });

    participantButton.addEventListener('mouseleave', () => {
      gsap.to(participantButton, {
        scale: 1,
        duration: 0.3
      });
    });

    // Sonido al hacer clic (opcional)
    participantButton.addEventListener('click', (e) => {
      e.preventDefault();
      this.playClickSound();
      
      // Animación de clic + redirección
      gsap.to(participantButton, {
        scale: 0.9,
        duration: 0.1,
        onComplete: () => {
          window.location.href = participantButton.getAttribute('href');
        }
      });
    });
  }

  // Efecto de partículas (requiere GSAP)
  createParticles(button) {
    const particles = [];
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4'];
    
    for (let i = 0; i < 5; i++) {
      const particle = document.createElement('div');
      particle.className = 'particle';
      particle.style.background = colors[Math.floor(Math.random() * colors.length)];
      button.appendChild(particle);
      
      gsap.to(particle, {
        x: Math.random() * 40 - 20,
        y: Math.random() * 40 - 20,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5,
        duration: 1,
        onComplete: () => particle.remove()
      });
      
      particles.push(particle);
    }
  }

  // Sonido al clic (opcional)
  playClickSound() {
    const sound = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-ui-click-1119.mp3');
    sound.volume = 0.3;
    sound.play().catch(e => console.log('El navegador bloqueó el sonido automático.'));
  }
}

// Inicialización condicional (como antes)
if (document.querySelector('.video-hero')) {
  new HomePage();
}