$(document).ready(function () {
    updateNavbarAuth();
    loadProducts();
});

function loadProducts() {
    $.ajax({
        url: API_BASE + "/api/products/",
        method: "GET",
        success: function (products) {
            renderProducts(products);
        },
        error: function () {
            // fallback mock data (so UI still works)
            const mockProducts = [
                {
                    id: 1,
                    name: "Sample Product",
                    price: 5000,
                    image: "images/items/1.jpg",
                    category: "General"
                }
            ];
            renderProducts(mockProducts);
        }
    });
}

function renderProducts(products) {
    $("#productGrid").empty();

    products.forEach(product => {
        const card = `
            <div class="col-md-3">
                <div class="card card-product-grid">
                    <a href="product.html?id=${product.id}" class="img-wrap">
                        <img src="${product.image}">
                    </a>
                    <figcaption class="info-wrap">
                        <a href="product.html?id=${product.id}" class="title">
                            ${product.name}
                        </a>
                        <div class="price mt-1">
                            ₦${product.price}
                        </div>
                        <button class="btn btn-sm btn-primary mt-2 add-to-cart"
                                data-id="${product.id}">
                            Add to cart
                        </button>
                    </figcaption>
                </div>
            </div>
        `;
        $("#productGrid").append(card);
    });
}
