;(function ($) {
    $(function () {

        // Toggle mobile-menu
        function menuToggle() {
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('.nav__btn-field')
                    .toggleClass('nav__btn-field--active')
                    .attr('aria-label',
                        (_, attr) => attr === 'Open Menu' ? 'Close Menu' : 'Open Menu'
                    )
                    .attr('aria-expanded',
                        (_, attr) => attr === 'false' ? 'true' : 'false'
                    );
                $('.nav__btn-icon').toggleClass('nav__btn-icon--active');
                $('.nav__list').toggleClass('nav__list--active');
                $('.header__top').toggleClass('header__top--active');
                $('body').toggleClass('no-scroll');
            }
        }

        $('.nav__btn-field').on('click', menuToggle);

        // Close mobile menu after press button "Escape"
        $(document).on('keyup', function (e) {
            if (e.key === 'Escape' && $('.nav__btn-field').attr('aria-label') === 'Close Menu') {
                menuToggle();
            }
        });

        $('.main-menu__item').on('click', function () {

            // Active state of a main-menu item
            $('.main-menu__link').removeClass('main-menu__link--active');
            $(this).find('.main-menu__link').addClass('main-menu__link--active');

            // Close mobile menu after click main-menu item
            menuToggle();
        });

        // Toggle mobile-menu after choose product's nav-link
        $('.nav-link').on('click', function () {

            // Close mobile menu after click main-menu item
            menuToggle();
        });

        // Menu & submenu work
        $('.nav__item').mouseenter(function () {
            $(this).find('.nav__menu-link')
                .toggleClass('nav__menu-link--active');
            $(this).find('.nav__submenu')
                .fadeToggle();
            $('.nav__product').mouseenter(function () {
                $(this)
                    .closest('.nav__submenu-item')
                    .find('.nav__submenu-link')
                    .addClass('nav__submenu-link--active');
            });
            $('.nav__product').mouseleave(function () {
                $(this)
                    .closest('.nav__submenu-item')
                    .find('.nav__submenu-link')
                    .removeClass('nav__submenu-link--active');
            });
            $(this).mouseleave(function () {
                $('.nav__item .nav__menu-link')
                    .removeClass('nav__menu-link--active');
                $('.nav__item .nav__submenu-link')
                    .removeClass('nav__submenu-link--active');
                $('.nav__submenu').hide();
            });
        });

        // Moving main-menu & buttons into mobile-menu
        function mediaSize() {
            if (window.matchMedia('(max-width: 767px)').matches) {
                $('.nav__list').prepend($('.header__top'));
                $('.header__top').prepend($('.header__btn-cart'));
                $('.header__top').prepend($('.header__btn-call'));
            } else {
                $('.header__container').prepend($('.header__top'));
                $('.nav__bottom').append($('.header__btn-cart'));
                $('.nav__bottom').append($('.header__btn-call'));
            }
        }

        mediaSize();
        window.addEventListener('resize', mediaSize, false);


        // Slider of Promo
        const helpers = {
            addZeros: function (n) {
                return (n < 10) ? '0' + n : '' + n;
            }
        };

        function promoSliderInit() {
            $('.promo__slider').each(function () {
                $(this).slick({
                    speed: 1000,
                    cssEase: 'linear',
                    autoplay: true,
                    autoplaySpeed: 4000,
                    arrows: true,
                    dots: false,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    fade: true
                });

                if ($('.slider__item').length > 1) {
                    $('.slider__counter').show();
                }

                $(this).on('afterChange', function (event, slick, currentSlide) {
                    $('.slider__counter .active').html(helpers.addZeros(currentSlide + 1));
                });

                let sliderItemsNum = $(this).find('.slick-slide').not('.slick-cloned').length;
                $('.slider__counter .total').html(helpers.addZeros(sliderItemsNum));
            });
        }

        promoSliderInit();

        // Slider of Preferences
        $('.preferences__slider').slick({
            speed: 1000,
            autoplay: true,
            autoplaySpeed: 4000,
            arrows: true,
            dots: false,
            infinite: false,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 2
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        dots: false,
                    }
                }
            ]
        });

        $(window).on('scroll', function () {

            // Show button "Up" after scroll 100px
            if ($(this).scrollTop() > 100) {
                $('.scroll-top').fadeIn();
            } else {
                $('.scroll-top').fadeOut();
            }
        });

        // Button "Up"
        $('.scroll-top').on('click', function () {

            $('html, body').animate({
                scrollTop: 0
            }, 100);

            return false;
        });
    });
})(jQuery);

function categoriesInit() {
    const productsList = document.querySelector('.product__list');
    const productItem = new Isotope(productsList, {
        itemSelector: '.product__item',
        masonry: {
            fitWidth: true,
            gutter: 30
        }
    });

    document.addEventListener('click', documentAction);

    function documentAction(e) {
        const targetElement = e.target;
        if (targetElement.closest('.filter-categories__item')) {
            const filterItem = targetElement.closest('.filter-categories__item');
            const filterValue = filterItem.dataset.filter;
            const filterActiveItem = document.querySelector('.filter-categories__item.active');

            filterValue === 'all'
                ? productItem.arrange({filter: ``})
                : productItem.arrange({filter: `[data-filter="${filterValue}"]`});

            filterActiveItem.classList.remove('active');
            filterItem.classList.add('active');

            e.preventDefault();
        }
    }
}

window.addEventListener('load', categoriesInit);