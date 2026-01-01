$(document).ready(function () {
    updateNavbarAuth();
    updateCartCount();

    const productId = new URLSearchParams(window.location.search).get("id");

    if (!productId) {
        showError("Invalid product.");
        return;
    }

    loadProduct(productId);

    $("#addToCartBtn").on("click", function () {
        addToCart(productId);
    });
});

function loadProduct(productId) {
    $.ajax({
        url: API_BASE + "/api/products/" + productId + "/",
        method: "GET",
        success: function (product) {
            $(".title").text(product.name);
            $(".price").text(product.price);
            $(".description").text(product.description || "No description available.");
            $(".img-big-wrap img").attr("src", product.image);
        },
        error: function () {
            showError("Failed to load product.");
        }
    });
}

function addToCart(productId) {
    if (!isAuthenticated()) {
        window.location.href = "signin.html";
        return;
    }

    $.ajax({
        url: API_BASE + "/api/cart/",
        method: "POST",
        headers: {
            "Authorization": "Bearer " + getAccessToken()
        },
        data: {
            product_id: productId,
            quantity: 1
        },
        success: function () {
            updateCartCount();
            alert("Product added to cart!");
        },
        error: function () {
            alert("Failed to add product to cart.");
        }
    });
}

function showError(message) {
    $("#productError").removeClass("d-none").text(message);
}
