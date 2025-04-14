document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('year').textContent = new Date().getFullYear();
    
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        const spans = menuBtn.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('rotate-neg-45');
      });
    }
  
    const prestationCards = document.querySelectorAll('.prestation-card');
    
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };
    
    const handleScrollAnimations = () => {
      prestationCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 100);
        }
      });
    };
    
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('load', handleScrollAnimations);
    
    handleScrollAnimations();
  });