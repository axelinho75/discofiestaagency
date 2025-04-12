// main.js - Scripts pour le site Disco-Fiesta
document.addEventListener('DOMContentLoaded', function() {
    // Mise à jour de l'année dans le footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // Gestion du menu mobile
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        
        // Animation du bouton hamburger
        const spans = menuBtn.querySelectorAll('span');
        spans[0].classList.toggle('rotate-45');
        spans[1].classList.toggle('opacity-0');
        spans[2].classList.toggle('rotate-neg-45');
      });
    }
  
    // Animation au scroll pour les cartes de prestation
    const prestationCards = document.querySelectorAll('.prestation-card');
    
    // Fonction pour vérifier si un élément est visible dans la fenêtre
    const isElementInViewport = (el) => {
      const rect = el.getBoundingClientRect();
      return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
      );
    };
    
    // Fonction pour gérer les animations au scroll
    const handleScrollAnimations = () => {
      prestationCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
          // Ajout d'un délai progressif pour chaque carte
          setTimeout(() => {
            card.classList.add('visible');
          }, index * 100);
        }
      });
    };
    
    // Ajouter les événements scroll et chargement pour les animations
    window.addEventListener('scroll', handleScrollAnimations);
    window.addEventListener('load', handleScrollAnimations);
    
    // Déclencher une première fois pour les éléments déjà visibles au chargement
    handleScrollAnimations();
  });