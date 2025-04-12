// galerie.js - Scripts pour la page galerie
document.addEventListener('DOMContentLoaded', function() {
    // Données de la galerie
    const galleryItems = [
      {
        id: 1,
        type: "video",
        title: "Soirée au Casino Barrière de Deauville",
        
        src: "assets/images/gallery-1.jpg",
        videoSrc: "assets/videos/video1.mp4",
        description: "Le spectacle iconique qui à fait sensation ses 3 derniers années.",
        category: "spectacle"
      },
      {
        id: 2,
        type: "photo",
        title: "Soirée Privée",
        src: "assets/images/gallery-2.jpg",
        description: "Une prestation sur mesure pour une soirée exclusive.",
        category: "evenement"
      },
      {
        id: 3,
        type: "video",
        title: "Best of Summer Tour",
        src: "assets/images/gallery-3.jpg",
        videoSrc: "assets/videos/video5.mp4",
        description: "Les meilleurs moments de notre tournée estivale.",
        category: "spectacle"
      },
      {
        id: 4,
        type: "photo",
        title: "Séminaire d'entreprise",
        src: "assets/images/photo10.jpg",
        description: "Animation pour le séminaire annuel d'une grande entreprise.",
        category: "evenement"
      },
      {
        id: 5,
        type: "video",
        title: "Show Deauville",
        src: "assets/images/tribute.jpeg",
        videoSrc: "assets/videos/videoDeauville.mp4",
        description: "Le Show Disco à Deauville, un événement inoubliable.",
        category: "evenement"
      },
      {
        id: 6,
        type: "photo",
        title: "Bal du 13 juillet de Paris",
        src: "assets/images/photo11.jpg",
        description: "Bal du 13 juillet de Paris.",
        category: "evenement"
      }
    ];
  
    let selectedFilter = "all";
    let selectedItem = null;
    const galleryGrid = document.querySelector('.gallery-grid');
    const modal = document.getElementById('gallery-modal');
  
    // Fonction pour extraire l'ID YouTube des URLs
    function getYoutubeId(url) {
      if (!url) return '';
      
      // Différents formats d'URL YouTube
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      
      return (match && match[2].length === 11)
        ? match[2]
        : '';
    }
  
    // Fonction pour filtrer et afficher les éléments de la galerie
    function renderGalleryItems() {
      // Filtrer les éléments selon le filtre sélectionné
      const filteredItems = selectedFilter === "all" 
        ? galleryItems 
        : galleryItems.filter(item => item.type === selectedFilter || item.category === selectedFilter);
      
      // Vider la grille
      galleryGrid.innerHTML = '';
      
      // Ajouter les éléments filtrés
      filteredItems.forEach((item, index) => {
        // Créer l'élément de la galerie
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-id', item.id);
        
        // Ajouter le contenu HTML
        galleryItem.innerHTML = `
          <div class="gallery-item-img">
            <img src="${item.src}" alt="${item.title}">
            ${item.type === 'video' ? `
              <div class="play-icon">
                <i class="fas fa-play-circle"></i>
              </div>
            ` : ''}
            <div class="gradient-overlay"></div>
          </div>
          <div class="gallery-item-content">
            <h3>${item.title}</h3>
            <p>${item.description}</p>
          </div>
          <div class="gallery-item-badge badge-${item.type}">
            ${item.type === 'photo' ? 'Photo' : 'Vidéo'}
          </div>
        `;
        
        // Ajouter l'événement de clic
        galleryItem.addEventListener('click', () => openModal(item));
        
        // Ajouter à la grille
        galleryGrid.appendChild(galleryItem);
        
        // Animation d'apparition avec délai
        setTimeout(() => {
          galleryItem.classList.add('visible');
        }, index * 100);
      });
    }
  
    // Fonction pour ouvrir le modal
    function openModal(item) {
      selectedItem = item;
      
      // Préparer le contenu du modal
      const modalTitle = document.getElementById('modal-title');
      const modalDescription = document.getElementById('modal-description');
      const modalMedia = document.querySelector('.modal-media');
      
      modalTitle.textContent = item.title;
      modalDescription.textContent = item.description;
      
      // Préparer le contenu média selon le type
      if (item.type === 'photo') {
        modalMedia.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
      } else if (item.type === 'video') {
        if (item.videoUrl) {
          // Vidéo YouTube
          const youtubeId = getYoutubeId(item.videoUrl);
          modalMedia.innerHTML = `
            <iframe 
              src="https://www.youtube.com/embed/${youtubeId}" 
              title="${item.title}" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          `;
        } else if (item.videoSrc) {
          // Vidéo locale
          modalMedia.innerHTML = `
            <video 
              src="${item.videoSrc}" 
              poster="${item.src}" 
              controls 
              autoplay
            ></video>
          `;
        } else {
          // Pas de vidéo disponible
          modalMedia.innerHTML = `
            <div class="video-unavailable">
              <i class="fas fa-play-circle"></i>
              <p>Vidéo non disponible</p>
            </div>
          `;
        }
      }
      
      // Afficher le modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Empêcher le défilement
    }
  
    // Fonction pour fermer le modal
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = ''; // Restaurer le défilement
      
      // Arrêter les vidéos en cours de lecture
      const videos = modal.querySelectorAll('video, iframe');
      videos.forEach(video => {
        if (video.tagName === 'VIDEO') {
          video.pause();
        } else if (video.tagName === 'IFRAME') {
          video.src = video.src; // Recharger l'iframe pour arrêter la lecture
        }
      });
      
      selectedItem = null;
    }
  
    // Initialiser les filtres
    function initFilters() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          // Mettre à jour le filtre sélectionné
          selectedFilter = button.getAttribute('data-filter');
          
          // Mettre à jour l'état actif des boutons
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          // Recharger les éléments de la galerie
          renderGalleryItems();
        });
      });
    }
  
    // Initialiser le bouton de fermeture du modal
    function initModalClose() {
      const closeButton = document.querySelector('.modal-close-btn');
      closeButton.addEventListener('click', closeModal);
      
      // Fermer le modal en cliquant à l'extérieur du contenu
      modal.addEventListener('click', event => {
        if (event.target === modal) {
          closeModal();
        }
      });
      
      // Fermer le modal avec la touche Escape
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
          closeModal();
        }
      });
    }
  
    // Initialiser la page
    function initGalleryPage() {
      renderGalleryItems();
      initFilters();
      initModalClose();
    }
  
    // Démarrer
    initGalleryPage();
  });