$(document).ready(function () {
    updateNavbarAuth();
    loadProducts();


    $("#applyPriceFilter").on("click", function () {
        const minPrice = $("#minPrice").val();
        const maxPrice = $("#maxPrice").val();


        loadProducts({
            min_price: minPrice,
            max_price: maxPrice
        });
    });
});

function loadProducts(filters = {}) {
    $.ajax({
        url: API_BASE + "/api/products/",
        method: "GET",
        data: filters,
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
                    image: "css/images/items/1.jpg",
                    category: "General"
                }
            ];
            renderProducts(mockProducts);
        }
    });
}

function renderProducts(products) {
    $("#productGrid").empty();

    if (products.length === 0) {
        $("#productGrid").html(`
            <div class="col-12 text-center">
                <p class="text-muted">No products found.</p>
            </div>
        `);
        return;
    }

    products.forEach(product => {
        const card = `
            <div class="col-md-4">
                <figure class="card card-product-grid">
                    <div class="img-wrap">
                        <img src="${product.image}">
                    </div>
                    <figcaption class="info-wrap">
                        <div class="fix-height">
                            <a href="product.html?id=${product.id}" class="title">
                                ${product.name}
                            </a>
                            <div class="price mt-2">
                                <span class="price">₦${product.price}</span>
                            </div>
                        </div>
                       <button class="btn btn-sm btn-primary mt-2 add-to-cart"
                            data-id="${product.id}">
                            Add to cart
                        </button>
                    </figcaption>
                </figure>
            </div>
        `;
        $("#productGrid").append(card);
    });
}
