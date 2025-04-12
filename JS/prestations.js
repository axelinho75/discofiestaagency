// prestations.js - Scripts spécifiques pour la page prestations
document.addEventListener('DOMContentLoaded', function() {
    // Animation au scroll pour les cartes de prestation
    const prestationCards = document.querySelectorAll('.prestation-card');
    
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85 &&
        rect.bottom >= 0
      );
    };
    
    // Fonction pour gérer les animations au scroll
    const handleScrollAnimations = () => {
      prestationCards.forEach(card => {
        if (isElementInViewport(card)) {
          // Récupérer le délai éventuel
          const delay = card.getAttribute('data-animation-delay') || 0;
          setTimeout(() => {
            card.classList.add('visible');
          }, delay);
        }
      });
    };
    
    // Ajouter les événements scroll et chargement pour les animations
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('load', handleScrollAnimations);
    window.addEventListener('resize', handleScrollAnimations);
    
    // Déclencher une première fois pour les éléments déjà visibles au chargement
    setTimeout(handleScrollAnimations, 100);
  });