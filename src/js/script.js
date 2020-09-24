(function() {
  // Плавный скролл
  const smoothScroll = function(reqmove, duration) {
    const requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame;

    window.requestAnimationFrame = requestAnimationFrame;

    const scrollHeight = window.scrollY;

    const diffY = scrollHeight < reqmove ? reqmove - scrollHeight : reqmove;

    const animate = (draw, duration) => {
      const start = performance.now();

      requestAnimationFrame(function move(time) {
        let timePassed = time - start;

        if (timePassed > duration) timePassed = duration
        draw(timePassed);
        if (timePassed < duration) requestAnimationFrame(move)
      });
    }

    animate(timePassed => {
      window.scroll(0, scrollHeight + diffY * (timePassed / duration))
    }, duration);
  }

  const menu = document.querySelector('.nav__list');

  menu.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('nav__link')) {
      const targetSection = document.querySelector(`#${target.dataset.section}`);
      const targetSectionPos = targetSection.getBoundingClientRect().y;
      smoothScroll(targetSectionPos, 500);
    }
  });
})();