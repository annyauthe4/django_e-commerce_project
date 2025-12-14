// ==================== PROFILE.JS ====================

$(document).ready(function () {
    updateNavbarAuth();

    if (!getAccessToken()) {
        window.location.href = "signin.html";
        return;
    }

    $.ajax({
        url: API_BASE + "/api/accounts/profile/",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getAccessToken()
        },
        success: function (data) {
            $("#prof_username").text(data.user.username);
            $("#prof_email").text(data.user.email);
            $("#prof_first").text(data.user.first_name);
            $("#prof_last").text(data.user.last_name);
            $("#prof_city").text(data.profile.city);
            $("#prof_country").text(data.profile.country);
            $("#prof_gender").text(data.profile.gender);
        },
        error: function () {
            alert("Session expired. Please sign in again.");
            clearAuth();
            window.location.href = "signin.html";
        }
    });
});
