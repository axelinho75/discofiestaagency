// references.js - Scripts pour la page références
document.addEventListener('DOMContentLoaded', function() {
    // Liste des clients
    const clients = [
      { name: "Casino Barrière (Deauville, La Baule, Enghien-les-bains)", logo: "./images/Barriere.jpg" },
      { name: "Ville d'Halluin", logo: "./images/Halluin.jpg" },
      { name: "Ville de Paris", logo: "./images/blason_paris.png" },
      { name: "Trappes", logo: "./images/trappes.jpeg" },
      { name: "Eragny-sur-Oise", logo: "./images/eragny-sur-oise.png" },
      { name: "Porsche", logo: "./images/Porsche.jpg" },
      { name: "B&M", logo: "./images/B&M.svg" },
      { name: "Centrakor", logo: "./images/centrakor.jpg" }
    ];
  
    const clientsGrid = document.querySelector('.clients-grid');
  
    // Fonction pour vérifier si une image existe
    function imageExists(url, callback) {
      const img = new Image();
      img.onload = function() { callback(true); };
      img.onerror = function() { callback(false); };
      img.src = url;
    }
  
    // Fonction pour rendre les clients
    function renderClients() {
      clients.forEach((client, index) => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        
        // Créer le contenu de la carte
        const clientContent = document.createElement('div');
        clientContent.className = 'client-content';
        
        // Vérifier si le logo existe
        imageExists(client.logo, function(exists) {
          if (exists) {
            // Si le logo existe, afficher l'image
            clientContent.innerHTML = `
              <img 
                src="${client.logo}" 
                alt="${client.name}" 
                class="client-logo"
              />
            `;
          } else {
            // Si le logo n'existe pas, afficher le nom du client
            clientContent.innerHTML = `
              <div class="client-name">${client.name}</div>
            `;
          }
        });
        
        clientCard.appendChild(clientContent);
        clientsGrid.appendChild(clientCard);
        
        // Animation d'apparition avec délai
        setTimeout(() => {
          clientCard.classList.add('visible');
        }, index * 100);
      });
    }
  
    // Fonction pour observer le scroll et animer les éléments
    function initScrollAnimation() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1
      });
      
      // Observer tous les éléments
      document.querySelectorAll('.client-card').forEach(card => {
        observer.observe(card);
      });
    }
  
    // Initialiser la page
    renderClients();
    
    // Initialiser l'animation au scroll après un court délai pour s'assurer que tout est chargé
    setTimeout(initScrollAnimation, 100);
  });