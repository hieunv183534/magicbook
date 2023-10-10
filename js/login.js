(function () {
    $(document).ready(function () {
        $(".login-title .logo h1").on('click', () => {
            window.location.href = "./index.html"
        });

        $('#loginBtn').click(() => {
            const username = $("#usernameInput").val();
            const password = $("#passwordInput").val();
            if (username && password) {
                login(username, password).done(res => {
                    sessionStorage.setItem('TOKEN', res);
                    window.location.href = './index.html'
                }).fail(err => {
                    if (err.status == 401) {
                        alert("Tài khoản hoặc mật khẩu không đúng!");
                    } else {
                        alert("Có lỗi, vui lòng thử lại sau!");
                    }
                });
            } else {
                alert("Vui lòng nhập đủ thông tin!");
            }
        })
    });
}());