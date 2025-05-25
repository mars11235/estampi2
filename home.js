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