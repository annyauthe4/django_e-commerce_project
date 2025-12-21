$(document).ready(function () {
    updateNavbarAuth();

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
            $("#productName").text(product.name);
            $("#productPrice").text(product.price);
            $("#productDescription").text(product.description || "No description available.");
            $("#productImage").attr("src", product.image);
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
            product_id: productId
        },
        success: function () {
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
