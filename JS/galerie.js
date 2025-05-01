document.addEventListener('DOMContentLoaded', function() {
    const galleryItems = [
      {
        id: 1,
        type: "video",
        title: "Tribute To Disco au Casino de Barrière de Deauville",
        
        src: "assets/images/gallery-1.jpg",
        videoSrc: "assets/videos/ShowDisco.mp4",
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
  
    function getYoutubeId(url) {
      if (!url) return '';
      
      const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url.match(regExp);
      
      return (match && match[2].length === 11)
        ? match[2]
        : '';
    }
  
    function renderGalleryItems() {
      const filteredItems = selectedFilter === "all" 
        ? galleryItems 
        : galleryItems.filter(item => item.type === selectedFilter || item.category === selectedFilter);
      
      galleryGrid.innerHTML = '';
      
      filteredItems.forEach((item, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.setAttribute('data-id', item.id);
        
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
        
        galleryItem.addEventListener('click', () => openModal(item));
        
        galleryGrid.appendChild(galleryItem);
        
        setTimeout(() => {
          galleryItem.classList.add('visible');
        }, index * 100);
      });
    }
  
    function openModal(item) {
      selectedItem = item;
      
      const modalTitle = document.getElementById('modal-title');
      const modalDescription = document.getElementById('modal-description');
      const modalMedia = document.querySelector('.modal-media');
      
      modalTitle.textContent = item.title;
      modalDescription.textContent = item.description;
      
      if (item.type === 'photo') {
        modalMedia.innerHTML = `<img src="${item.src}" alt="${item.title}">`;
      } else if (item.type === 'video') {
        if (item.videoUrl) {
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
          modalMedia.innerHTML = `
            <video 
              src="${item.videoSrc}" 
              poster="${item.src}" 
              controls 
              autoplay
            ></video>
          `;
        } else {
          modalMedia.innerHTML = `
            <div class="video-unavailable">
              <i class="fas fa-play-circle"></i>
              <p>Vidéo non disponible</p>
            </div>
          `;
        }
      }
      
      modal.classList.add('active');
      modal.scrollTop = 0; // Force le scroll en haut du modal
      const closeBtn = modal.querySelector('.modal-close-btn');
      if (closeBtn) {
        closeBtn.focus();
      }
      document.body.style.overflow = 'hidden'; 
    }
  
    function closeModal() {
      modal.classList.remove('active');
      document.body.style.overflow = ''; 
      
      const videos = modal.querySelectorAll('video, iframe');
      videos.forEach(video => {
        if (video.tagName === 'VIDEO') {
          video.pause();
        } else if (video.tagName === 'IFRAME') {
          video.src = video.src; 
        }
      });
      
      selectedItem = null;
    }
  
    function initFilters() {
      const filterButtons = document.querySelectorAll('.filter-btn');
      
      filterButtons.forEach(button => {
        button.addEventListener('click', () => {
          selectedFilter = button.getAttribute('data-filter');
          
          filterButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
          
          renderGalleryItems();
        });
      });
    }
  
    function initModalClose() {
      const closeButton = document.querySelector('.modal-close-btn');
      closeButton.addEventListener('click', closeModal);
      
      modal.addEventListener('click', event => {
        if (event.target === modal) {
          closeModal();
        }
      });
      
      document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && modal.classList.contains('active')) {
          closeModal();
        }
      });
    }
  
    function initGalleryPage() {
      renderGalleryItems();
      initFilters();
      initModalClose();
    }
  
  
    initGalleryPage();
  });
