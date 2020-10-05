$(document).ready(function() {
  $('.reviews-slider__slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    prevArrow: $('.reviews-slider__prev'),
    nextArrow: $('.reviews-slider__next'),
    dots: true,
    variableWidth: true
  });
});