document.addEventListener('DOMContentLoaded', function() {
    const clients = [
      { name: "Casino Barrière (Deauville, La Baule, Enghien-les-bains)", logo: "assets/images/Barrière.jpg" },
      { name: "Ville d'Halluin", logo: "assets/images/Halluin.jpg" },
      { name: "Ville de Paris", logo: "assets/images/paris.jpg" },
      { name: "Trappes", logo: "assets/images/trappes.jpeg" },
      { name: "Eragny-sur-Oise", logo: "assets/images/eragny-sur-oise.png" },
      { name: "Porsche", logo: "assets/images/Porsche.jpg" },
      { name: "B&M", logo: "assets/images/B&M.svg" },
      { name: "Centrakor", logo: "assets/images/centrakor.jpg" }
    ];
  
    const clientsGrid = document.querySelector('.clients-grid');
  
    function imageExists(url, callback) {
      const img = new Image();
      img.onload = function() { callback(true); };
      img.onerror = function() { callback(false); };
      img.src = url;
    }
  
    function renderClients() {
      clients.forEach((client, index) => {
        const clientCard = document.createElement('div');
        clientCard.className = 'client-card';
        
        const clientContent = document.createElement('div');
        clientContent.className = 'client-content';
        
        imageExists(client.logo, function(exists) {
          if (exists) {
            clientContent.innerHTML = `
              <img 
                src="${client.logo}" 
                alt="${client.name}" 
                class="client-logo"
              />
            `;
          } else {
            clientContent.innerHTML = `
              <div class="client-name">${client.name}</div>
            `;
          }
        });
        
        clientCard.appendChild(clientContent);
        clientsGrid.appendChild(clientCard);
        

        setTimeout(() => {
          clientCard.classList.add('visible');
        }, index * 100);
      });
    }
  
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
      
      document.querySelectorAll('.client-card').forEach(card => {
        observer.observe(card);
      });
    }
  
    renderClients();
    
    setTimeout(initScrollAnimation, 100);
  });