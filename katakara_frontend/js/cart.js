$(document).ready(function () {
    if (!isAuthenticated()) {
        window.location.href = "signin.html";
        return;
    }

    updateNavbarAuth();
    loadCart();
});

function loadCart() {
    $.ajax({
        url: API_BASE + "/api/cart/",
        method: "GET",
        headers: {
            "Authorization": "Bearer " + getAccessToken()
        },
        success: function (items) {
            renderCart(items);
        },
        error: function () {
            showError("Failed to load cart.");
        }
    });
}

function renderCart(items) {
    let total = 0;
    $("#cartItems").empty();

    if (items.length === 0) {
        $("#cartItems").html(`
            <tr>
                <td colspan="5" class="text-center">Your cart is empty.</td>
            </tr>
        `);
        $("#cartTotal").text("0");
        return;
    }

    items.forEach(item => {
        const itemTotal = item.product_price * item.quantity;
        total += itemTotal;

        const row = `
            <tr>
                <td>
                    <img src="${item.product_image}" width="50" class="mr-2">
                    ${item.product_name}
                </td>
                <td>₦${item.product_price}</td>
                <td>
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <button class="btn btn-outline-secondary qty-minus" data-id="${item.id}">−</button>
                        </div>
                        <input type="text" class="form-control text-center" value="${item.quantity}" readonly>
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary qty-plus" data-id="${item.id}">+</button>
                        </div>
                    </div>
                </td>
                <td>₦${itemTotal}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-danger remove-item" data-id="${item.id}">
                        ×
                    </button>
                </td>
            </tr>
        `;
        $("#cartItems").append(row);
    });

    $("#cartTotal").text(total);
}

function updateQuantity(itemId, quantity) {
    $.ajax({
        url: API_BASE + "/api/cart/item/" + itemId + "/",
        method: "PATCH",
        headers: {
            "Authorization": "Bearer " + getAccessToken()
        },
        data: { quantity },
        success: loadCart,
        error: function () {
            showError("Failed to update quantity.");
        }
    });
}

function removeItem(itemId) {
    $.ajax({
        url: API_BASE + "/api/cart/item/" + itemId + "/",
        method: "DELETE",
        headers: {
            "Authorization": "Bearer " + getAccessToken()
        },
        success: loadCart,
        error: function () {
            showError("Failed to remove item.");
        }
    });
}

$(document).on("click", ".qty-plus", function () {
    const id = $(this).data("id");
    updateQuantity(id, 1);
});

$(document).on("click", ".qty-minus", function () {
    const id = $(this).data("id");
    updateQuantity(id, -1);
});

$(document).on("click", ".remove-item", function () {
    const id = $(this).data("id");
    removeItem(id);
});

function showError(message) {
    $("#cartError").removeClass("d-none").text(message);
}
