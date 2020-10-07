$(document).ready(function() {
  $('.reviews-slider__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: $('.reviews-slider__prev'),
    nextArrow: $('.reviews-slider__next'),
    appendDots: $('.reviews-slider__dots'),
    dots: true,
    variableWidth: true
  });
});