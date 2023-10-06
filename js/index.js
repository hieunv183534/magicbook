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


        $("#loginBtn").on('click', () => {
            debugger
            $(".user").attr('status', 'in');
            $("#username").html('hieunv183534');
            window.location.href = "./login.html";
        });
        $("#logoutBtn").on('click', () => {
            $(".user").attr('status', 'out');
            $("#username").html('login_to_write');
        });
    });
}());