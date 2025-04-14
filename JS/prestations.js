document.addEventListener('DOMContentLoaded', function() {
    const prestationCards = document.querySelectorAll('.prestation-card');
    
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    };
    
    const handleScrollAnimations = () => {
      prestationCards.forEach(card => {
        if (isElementInViewport(card)) {
          const delay = card.getAttribute('data-animation-delay') || 0;
          setTimeout(() => {
            card.classList.add('visible');
          }, delay);
        }
      });
    };
    
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('load', handleScrollAnimations);
    window.addEventListener('resize', handleScrollAnimations);
    
    setTimeout(handleScrollAnimations, 100);
  });