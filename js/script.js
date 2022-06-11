$(document).ready(function(){
  $('.carousel__inner').slick({
    speed: 1200,
    // adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"> <img src="icons/chevron left solid.svg"> </button>',
    nextArrow: '<button type="button" class="slick-next"><img src="icons/chevron right solid.svg"></button>',
    responsive: [
      {
        breakpoint: 992,
          settings: {
            dots: true,
            arrows: false
          }

      }
    ]
  });

  // ПЕРЕКЛЮЧЕНИЕ МЕЖДУ ТАБАМИ
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  // ОПИСАНИЕ КАЖДОЙ ИЗ КАРТОЧЕК

  // $('.catalog-item__link').each(function (i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   });
  // });

  // ПРИ КЛИКЕ НАЗАД БУДЕТ ВОЗВРАЩАТСЯ ОБРАТНО К ОПИСАНИЮ
  
  // $('.catalog-item__back').each(function (i) {
  //   $(this).on('click', function (e) {
  //     e.preventDefault();
  //     $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
  //     $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
  //   });
  // });


    // СОКРАЩЕНЫЙ КОД
  function toggleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  };

   // ОПИСАНИЕ КАЖДОЙ ИЗ КАРТОЧЕК
  toggleSlide('.catalog-item__link'); 
  // ПРИ КЛИКЕ НАЗАД БУДЕТ ВОЗВРАЩАТСЯ ОБРАТНО К ОПИСАНИЮ
  toggleSlide('.catalog-item__back');

  // Modal
  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('fast');
  });

  // для крестика
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #thank, #order').fadeOut('fast');
  });

  // для отображения текста который в карточке товара + кнопка купить(последняя команда)
  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtittle').eq(i).text());
      $('.overlay, #order').fadeIn('fast');
    });
  });

  function validateForms(form) {
     $(form).validate({
    rules: {
      name: "required",
      phone: "required",
      email: {
        required: true,
        email: true
      }
    },
     messages: {
      name: "Пожалуйста введите свое имя",
      phone: "Введите номер телефона",
      email: {
        required: "Пожалуйста введите почту",
        email: "Не корректная почта"
        }
      }
    });
  };

  validateForms('#consultation form');
  validateForms('#consultation form');
  validateForms('#order form');


  $('input[name=phone]').mask("+38(999) 999-99-99");

  $('form').submit(function () {
    e, preventDefault();
    $.ajax({
      type: "POST",
      url: "maile/smart.php",
      data: $(thus).serialize()
    }).done(function () {
      $(thus).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('slow');
      $('form').trigger('reset');
    });
    return false;
  });
});
