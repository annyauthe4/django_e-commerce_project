// ==================== SIGNIN.JS ====================

$(document).ready(function () {
    updateNavbarAuth();

    $("#loginForm").on("submit", function (e) {
        e.preventDefault();

        const payload = {
            username: $("#login_username").val(),
            password: $("#login_password").val(),
        };

        $.ajax({
            url: API_BASE + "/api/auth/login/",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(payload),
            success: function (res) {
                saveAuth(res.access, res.refresh, res.user);
                window.location.href = "profile.html";
            },
            error: function (xhr) {
                $("#loginErrors").text(xhr.responseJSON?.detail || "Invalid login");
            }
        });
    });
});
