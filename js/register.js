(function () {
    $(document).ready(function () {
        $(".login-title .logo h1").on('click', () => {
            window.location.href = "./index.html"
        });

        $("#loginBtn").click(() => {
            const username = $("#usernameInput").val();
            const email = $("#emailInput").val();
            const password = $("#passwordInput").val();
            const _password = $("#_passwordInput").val();

            if (username && password) {
                if (password != _password) {
                    alert("Mật khẩu nhập lại không khớp!");
                } else {
                    register(username, email, password).done(res => {
                        alert("Đăng ký tài khoản thành công, đăng nhập để sử dụng dịch vụ!");
                    }).fail(err => {
                        alert("Có lỗi, vui lòng thử lại sau!");
                    })
                }
            } else {
                alert("Chưa nhập đủ thông tin bắt buộc!");
            }
        });
    });
}());