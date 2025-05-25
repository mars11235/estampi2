// MAIN.JS - Funcionalidades principales del sitio

class MainApp {
  constructor() {
    this.init();
  }

  init() {
    document.addEventListener('DOMContentLoaded', () => {
      this.setupMobileMenu();
      this.setupSmoothScrolling();
      this.setupHeaderScrollEffect();
      this.setupCounters();
    });
  }

  setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navbar = document.querySelector('.navbar');
    
    if (mobileMenuBtn && navbar) {
      mobileMenuBtn.addEventListener('click', () => {
        navbar.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
      });

      // Cerrar menú al hacer clic en un enlace
      document.querySelectorAll('.navbar a').forEach(link => {
        link.addEventListener('click', () => {
          navbar.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
        });
      });
    }
  }

  setupSmoothScrolling() {
    // Smooth scrolling para anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupHeaderScrollEffect() {
    const header = document.querySelector('.header');
    
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      });
    }
  }

  setupCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    if (counters.length > 0) {
      const animateCounters = () => {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-count');
          const count = +counter.innerText;
          const increment = target / speed;
          
          if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
          } else {
            counter.innerText = target;
          }
        });
      };
      
      // Activar cuando la sección sea visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounters();
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      document.querySelectorAll('.stats-section').forEach(section => {
        observer.observe(section);
      });
    }
  }
}

// Inicializar la aplicación
new MainApp();