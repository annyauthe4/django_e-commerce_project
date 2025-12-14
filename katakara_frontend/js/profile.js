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
            $("#prof_username").text(data.username);
            $("#prof_email").text(data.email);
            $("#prof_city").text(data.city);
            $("#prof_country").text(data.country);
            $("#prof_gender").text(data.gender);
        },
        error: function () {
            alert("Session expired. Please sign in again.");
            clearAuth();
            window.location.href = "signin.html";
        }
    });
});
