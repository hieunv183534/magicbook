(function () {
    $(document).ready(function () {
        $(".owl-carousel").owlCarousel(
            {
                autoplay: true,
                lazyLoad: true,
                loop: true,
                margin: 20,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn',
                autoplayTimeout: 7000,
                smartSpeed: 800,
                nav: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1
                    },

                    600: {
                        items: 2
                    },

                    1024: {
                        items: 3
                    },

                    1366: {
                        items: 4
                    }
                }
            }
        );

        // $('.owl-carousel').on('changed.owl.carousel', function (event) {
        //     $('.owl-item').css('height', '300px');
        // });
    });
}());