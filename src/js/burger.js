(function() {
  const burgerMenu = document.querySelector('.burger-menu'),
    burgerMenuBtn = document.querySelector('.burger-btn');

  burgerMenuBtn.addEventListener('click', (event) => {
    event.preventDefault();
    burgerMenu.classList.add('burger-menu_active');
    document.body.style.overflow = 'hidden';
  });

  burgerMenu.addEventListener('click', (event) => {
    event.preventDefault();
    let target = event.target;

    if (target.classList.contains('burger-menu__link') || target.closest('.burger-menu__close')) {
      burgerMenu.classList.remove('burger-menu_active');
      document.body.style.overflow = 'visible';
    }
  });
})();