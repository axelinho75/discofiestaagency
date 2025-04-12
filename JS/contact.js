// contact.js - Scripts pour la page contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formContent = document.getElementById('form-content');
    const successMessage = document.getElementById('success-message');
    const newRequestBtn = document.getElementById('new-request-btn');
    
    // Fonction pour valider le formulaire
    function validateForm() {
      let isValid = true;
      
      // Nom
      const nom = document.getElementById('nom');
      const nomError = document.getElementById('nom-error');
      if (!nom.value.trim()) {
        nomError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        nomError.textContent = '';
      }
      
      // Prénom
      const prenom = document.getElementById('prenom');
      const prenomError = document.getElementById('prenom-error');
      if (!prenom.value.trim()) {
        prenomError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        prenomError.textContent = '';
      }
      
      // Email
      const email = document.getElementById('email');
      const emailError = document.getElementById('email-error');
      const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
      if (!email.value.trim()) {
        emailError.textContent = 'Ce champ est requis';
        isValid = false;
      } else if (!emailRegex.test(email.value.trim())) {
        emailError.textContent = 'Adresse email invalide';
        isValid = false;
      } else {
        emailError.textContent = '';
      }
      
      // Téléphone
      const telephone = document.getElementById('telephone');
      const telephoneError = document.getElementById('telephone-error');
      if (!telephone.value.trim()) {
        telephoneError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        telephoneError.textContent = '';
      }
      
      // Type d'événement
      const typeEvenement = document.getElementById('typeEvenement');
      const typeEvenementError = document.getElementById('typeEvenement-error');
      if (!typeEvenement.value) {
        typeEvenementError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        typeEvenementError.textContent = '';
      }
      
      // Date
      const date = document.getElementById('date');
      const dateError = document.getElementById('date-error');
      if (!date.value) {
        dateError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        dateError.textContent = '';
      }
      
      // Nombre d'invités
      const nombreInvites = document.getElementById('nombreInvites');
      const nombreInvitesError = document.getElementById('nombreInvites-error');
      if (!nombreInvites.value) {
        nombreInvitesError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        nombreInvitesError.textContent = '';
      }
      
      // Message
      const message = document.getElementById('message');
      const messageError = document.getElementById('message-error');
      if (!message.value.trim()) {
        messageError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        messageError.textContent = '';
      }
      
      return isValid;
    }
  
    // Gestion de la soumission du formulaire
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (validateForm()) {
        // Collecter les données du formulaire
        const formData = new FormData(contactForm);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
          formDataObj[key] = value;
        });
        
        console.log('Données du formulaire:', formDataObj);
        
        // Ici, vous pourriez envoyer les données à un serveur
        // Par exemple avec fetch() ou XMLHttpRequest
        
        // Afficher le message de succès
        formContent.style.display = 'none';
        successMessage.classList.remove('hidden');
        
        // Faire défiler vers le haut du formulaire
        formContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    // Permettre à l'utilisateur de soumettre un nouveau formulaire
    if (newRequestBtn) {
      newRequestBtn.addEventListener('click', function() {
        // Réinitialiser le formulaire
        contactForm.reset();
        
        // Masquer le message de succès et afficher le formulaire
        successMessage.classList.add('hidden');
        formContent.style.display = 'block';
      });
    }
    
    // Ajout de la validation en temps réel sur les champs
    document.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', function() {
        // Validation automatique après la première saisie
        if (this.dataset.touched) {
          if (this.id === 'email') {
            const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
            const emailError = document.getElementById('email-error');
            
            if (!this.value.trim()) {
              emailError.textContent = 'Ce champ est requis';
            } else if (!emailRegex.test(this.value.trim())) {
              emailError.textContent = 'Adresse email invalide';
            } else {
              emailError.textContent = '';
            }
          } else {
            const errorElement = document.getElementById(`${this.id}-error`);
            errorElement.textContent = this.value.trim() ? '' : 'Ce champ est requis';
          }
        }
      });
      
      input.addEventListener('blur', function() {
        // Marquer le champ comme "touché" pour activer la validation en temps réel
        this.dataset.touched = 'true';
        
        // Déclencher l'événement input pour valider immédiatement après un blur
        const event = new Event('input');
        this.dispatchEvent(event);
      });
    });
  });