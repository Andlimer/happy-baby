(function() {
  const togglePopUp = () => {
    const popUp = document.querySelectorAll('.popup'),
      popUpOeder = document.querySelector('.popup-order'),
      popUpCallback = document.querySelector('.popup-callback'),
      popUpBtn = document.querySelectorAll('.popup-button');
  
    popUpBtn.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        event.preventDefault();
        let target = event.target;
  
        if (target.classList.contains('catalog-slider__button')) {
          popUpOeder.style.display = 'flex';
        }
  
        if (target.classList.contains('hero__button')) {
          popUpCallback.style.display = 'flex';
        }
      });
    });
  
    popUp.forEach((elem) => {
      elem.addEventListener('click', (event) => {
        
        let target = event.target;
  
        if (target.classList.contains('popup__close') || target.closest('.popup__close')) {
          elem.style.display = 'none';
        } else {
          target = target.closest('.popup__content');
          if (!target) {
            elem.style.display = 'none';
          }
        }
      });
    });
  }
  
  togglePopUp();
})();