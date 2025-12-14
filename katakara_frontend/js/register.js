// ==================== REGISTER.JS ====================

$(document).ready(function () {
    updateNavbarAuth();

    $("#registerForm").on("submit", function (e) {
        e.preventDefault();

        let payload = {
            username: $("#username").val(),
            email: $("#email").val(),
            password1: $("#password1").val(),
            password2: $("#password2").val(),
            first_name: $("#first_name").val(),
            last_name: $("#last_name").val(),
            gender: $("input[name='gender']:checked").val(),
            city: $("#city").val(),
            country: $("#country").val(),
        };

        $.ajax({
            url: API_BASE + "/api/auth/registration/",
            method: "POST",
            data: payload,
            success: function (res) {
                saveAuth(res.access, res.refresh, res.user);
                window.location.href = "profile.html";
            },
            error: function (xhr) {
                $("#registerErrors").text(JSON.stringify(xhr.responseJSON));
            }
        });
    });
});
