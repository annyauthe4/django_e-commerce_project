// ==================== AUTH.JS ====================

const API_BASE = "http://127.0.0.1:8000";

const ACCESS_KEY = "katakara_access";
const REFRESH_KEY = "katakara_refresh";
const USER_KEY = "katakara_user";

function saveAuth(access, refresh, user) {
    if (access) localStorage.setItem(ACCESS_KEY, access);
    if (refresh) localStorage.setItem(REFRESH_KEY, refresh);
    if (user) localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getAccessToken() {
    return localStorage.getItem(ACCESS_KEY);
}

function getCurrentUser() {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? JSON.parse(raw) : null;
}

function clearAuth() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
}

function logout() {
    clearAuth();
    window.location.href = "signin.html";
}

function updateNavbarAuth() {
    const user = getCurrentUser();
    const isAuth = !!user;

    const navWelcome = $("#nav-welcome");
    const navLinks = $("#nav-auth-links");

    if (!navWelcome.length) return;

    if (isAuth) {
        navWelcome.text(`Welcome ${user.username}!`);
        navLinks.html(`
            <a href="profile.html" class="nav-link">Profile</a>
            <span class="dark-transp"> | </span>
            <a href="#" id="logout-link" class="nav-link">Logout</a>
        `);

        $("#logout-link").on("click", function (e) {
            e.preventDefault();
            logout();
        });

    } else {
        navWelcome.text("Welcome guest!");
        navLinks.html(`
            <a href="signin.html" class="nav-link">Sign in</a>
            <span class="dark-transp"> | </span>
            <a href="register.html" class="nav-link">Register</a>
        `);
    }
}
