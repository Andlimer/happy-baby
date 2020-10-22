(function() {
  $(document).ready(function() {
    $('.catalog-slider').slick({
      prevArrow: $('.catalog-slider__prev'),
      nextArrow: $('.catalog-slider__next'),
      appendDots: $('.catalog-slider__dots'),
      dots: true,
      infinite: false
    });
  });
})();