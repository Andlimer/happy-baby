(function() {
  $(document).ready(function() {
    $('.reviews-slider').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1,
      prevArrow: $('.reviews-slider__prev'),
      nextArrow: $('.reviews-slider__next'),
      appendDots: $('.reviews-slider__dots'),
      dots: true,
      responsive: [
        {
          breakpoint: 993,
          settings: {
            slidesToShow: 2
          }
        },
        {
          breakpoint: 769,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    });
  });
})();