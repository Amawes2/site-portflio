(function($) {

    "use strict";

    var searchPopup = function() {
      // open search box
      $('#header-nav').on('click', '.search-button', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });

      $('#header-nav').on('click', '.btn-close-search', function(e) {
        $('.search-popup').toggleClass('is-visible');
      });
      
      $(".search-popup-trigger").on("click", function(b) {
          b.preventDefault();
          $(".search-popup").addClass("is-visible"),
          setTimeout(function() {
              $(".search-popup").find("#search-popup").focus()
          }, 350)
      }),
      $(".search-popup").on("click", function(b) {
          ($(b.target).is(".search-popup-close") || $(b.target).is(".search-popup-close svg") || $(b.target).is(".search-popup-close path") || $(b.target).is(".search-popup")) && (b.preventDefault(),
          $(this).removeClass("is-visible"))
      }),
      $(document).keyup(function(b) {
          "27" === b.which && $(".search-popup").removeClass("is-visible")
      })
    }

    var initProductQty = function(){

      $('.product-qty').each(function(){

        var $el_product = $(this);
        var quantity = 0;

        $el_product.find('.quantity-right-plus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            $el_product.find('#quantity').val(quantity + 1);
        });

        $el_product.find('.quantity-left-minus').click(function(e){
            e.preventDefault();
            var quantity = parseInt($el_product.find('#quantity').val());
            if(quantity>0){
              $el_product.find('#quantity').val(quantity - 1);
            }
        });

      });

    }

    var initScrollAnimations = function() {
      var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      var selectors = [
        '#company-services .icon-box',
        '.product-card',
        '#latest-blog .post-grid > [class^="col-"]',
        '.review-item',
        '.subscribe-content',
        '#instagram .instagram-item',
        '#footer .footer-menu',
        '#footer-bottom .row > [class^="col-"]'
      ];
      var targets = document.querySelectorAll(selectors.join(','));

      if (!targets.length) {
        return;
      }

      if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        Array.prototype.forEach.call(targets, function(target) {
          target.classList.add('is-visible');
        });
        return;
      }

      document.body.classList.add('motion-ready');

      var observer = new IntersectionObserver(function(entries, currentObserver) {
        Array.prototype.forEach.call(entries, function(entry) {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add('is-visible');
          currentObserver.unobserve(entry.target);
        });
      }, {
        threshold: 0.18,
        rootMargin: '0px 0px -40px 0px'
      });

      Array.prototype.forEach.call(targets, function(target, index) {
        target.style.setProperty('--reveal-delay', ((index % 4) * 0.08) + 's');
        observer.observe(target);
      });
    }

    var initSwipers = function() {
      var prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (typeof Swiper === 'undefined') {
        return;
      }

      new Swiper(".main-swiper", {
        loop: true,
        speed: prefersReducedMotion ? 0 : 900,
        effect: prefersReducedMotion ? "slide" : "fade",
        fadeEffect: {
          crossFade: true,
        },
        autoplay: prefersReducedMotion ? false : {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        },
        navigation: {
          nextEl: "#billboard .swiper-arrow-next",
          prevEl: "#billboard .swiper-arrow-prev",
        },
      });

      var buildProductSwiper = function(selector, paginationSelector) {
        return new Swiper(selector, {
          speed: prefersReducedMotion ? 0 : 700,
          grabCursor: true,
          watchOverflow: true,
          observer: true,
          observeParents: true,
          slidesPerView: 1.12,
          spaceBetween: 16,
          pagination: {
            el: paginationSelector,
            clickable: true,
            dynamicBullets: true,
          },
          breakpoints: {
            480: {
              slidesPerView: 1.45,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 22,
            },
            992: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 24,
            }
          },
        });
      };

      buildProductSwiper(".product-swiper", "#mobile-products .swiper-pagination");
      buildProductSwiper(".product-watch-swiper", "#smart-watches .swiper-pagination");

      new Swiper(".testimonial-swiper", {
        loop: true,
        autoHeight: true,
        speed: prefersReducedMotion ? 0 : 700,
        autoplay: prefersReducedMotion ? false : {
          delay: 5500,
          disableOnInteraction: false,
        },
        navigation: {
          nextEl: "#testimonials .swiper-arrow-next",
          prevEl: "#testimonials .swiper-arrow-prev",
        },
        pagination: {
          el: "#testimonials .swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
      });
    }

    $(document).ready(function() {

      searchPopup();
      initProductQty();
      initScrollAnimations();
      initSwipers();

    }); // End of a document ready

})(jQuery);
