document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const formContent = document.getElementById('form-content');
    const successMessage = document.getElementById('success-message');
    const newRequestBtn = document.getElementById('new-request-btn');
    
    function validateForm() {
      let isValid = true;
      
      const nom = document.getElementById('nom');
      const nomError = document.getElementById('nom-error');
      if (!nom.value.trim()) {
        nomError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        nomError.textContent = '';
      }
      
      const prenom = document.getElementById('prenom');
      const prenomError = document.getElementById('prenom-error');
      if (!prenom.value.trim()) {
        prenomError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        prenomError.textContent = '';
      }
      
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
      
      const telephone = document.getElementById('telephone');
      const telephoneError = document.getElementById('telephone-error');
      if (!telephone.value.trim()) {
        telephoneError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        telephoneError.textContent = '';
      }
      
      const typeEvenement = document.getElementById('typeEvenement');
      const typeEvenementError = document.getElementById('typeEvenement-error');
      if (!typeEvenement.value) {
        typeEvenementError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        typeEvenementError.textContent = '';
      }
      
      const date = document.getElementById('date');
      const dateError = document.getElementById('date-error');
      if (!date.value) {
        dateError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        dateError.textContent = '';
      }
      
      const nombreInvites = document.getElementById('nombreInvites');
      const nombreInvitesError = document.getElementById('nombreInvites-error');
      if (!nombreInvites.value) {
        nombreInvitesError.textContent = 'Ce champ est requis';
        isValid = false;
      } else {
        nombreInvitesError.textContent = '';
      }
      
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
  
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      if (validateForm()) {
        const formData = new FormData(contactForm);
        const formDataObj = {};
        
        formData.forEach((value, key) => {
          formDataObj[key] = value;
        });
        
        console.log('Données du formulaire:', formDataObj);
        
       
        
        formContent.style.display = 'none';
        successMessage.classList.remove('hidden');
        
        formContent.scrollIntoView({ behavior: 'smooth' });
      }
    });
    
    if (newRequestBtn) {
      newRequestBtn.addEventListener('click', function() {
        contactForm.reset();
        
        successMessage.classList.add('hidden');
        formContent.style.display = 'block';
      });
    }
    
    document.querySelectorAll('.form-control').forEach(input => {
      input.addEventListener('input', function() {
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
        this.dataset.touched = 'true';
        
        const event = new Event('input');
        this.dispatchEvent(event);
      });
    });

    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
      
      document.querySelectorAll('.form-control').forEach(input => {
        input.dataset.touched = 'true';
        const inputEvent = new Event('input');
        input.dispatchEvent(inputEvent);
      });
      
      if (!hasErrors) {
        const formData = new FormData(contactForm);
        
        fetch('https://formspree.io/f/xnnpragq', {
          method: 'POST',
          body: formData,
          headers: {
            'Accept': 'application/json'
          }
        })
        .then(response => {
          if (response.ok) {
            formContent.classList.add('hidden');
            successMessage.classList.remove('hidden');
            contactForm.reset();
          } else {
            throw new Error('Erreur réseau');
          }
        })
        .catch(error => {
          console.error('Erreur:', error);
          alert('Une erreur est survenue lors de l\'envoi du formulaire. Veuillez réessayer.');
        });
      }
    });
    
    document.getElementById('new-request-btn').addEventListener('click', function() {
      successMessage.classList.add('hidden');
      formContent.classList.remove('hidden');
      
      document.querySelectorAll('.form-control').forEach(input => {
        delete input.dataset.touched;
      });
    });
  });