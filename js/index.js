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

        $(".open-form").on('click', () => {
            $(".newbook-popup").attr('status', 'open');
        });
        $(".close-form").on('click', () => {
            $(".newbook-popup").attr('status', 'close');
        });

        document.getElementById('picField').onchange = function (evt) {
            debugger
            var tgt = evt.target || window.event.srcElement,
                files = tgt.files;
            
            // FileReader support
            if (FileReader && files && files.length) {
                var fr = new FileReader();
                fr.onload = function () {
                    document.getElementById("previewImage").src = fr.result;
                }
                fr.readAsDataURL(files[0]);
            }
            
            // Not supported
            else {
                // fallback -- perhaps submit the input to an iframe and temporarily store
                // them on the server until the user's session ends.
            }
        }
    });
}());