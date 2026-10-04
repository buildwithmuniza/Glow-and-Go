// ==========================================
// GLOW & GO - SHOPPING CART
// ==========================================

let cart = JSON.parse(localStorage.getItem("glowAndGoCart")) || [];


// ==========================================
// ADD PRODUCT TO CART
// ==========================================

const addButtons = document.querySelectorAll(".product-info button");

addButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const product = button.closest(".product");

        const name = product.querySelector("h3").textContent;

        const description = product.querySelector(
            "p:first-of-type"
        ).textContent;

        const priceText = product.querySelector(
            "p:last-of-type"
        ).textContent;

        const price = parseInt(
            priceText.replace(/[^\d]/g, "")
        );

        const image = product.querySelector("img").src;


        // Check if product already exists
        const existingProduct = cart.find(
            item => item.name === name
        );


        if (existingProduct) {

            existingProduct.quantity++;

        } else {

            cart.push({
                name: name,
                description: description,
                price: price,
                image: image,
                quantity: 1
            });

        }


        updateCart();

        showMessage(name);

    });

});


// ==========================================
// CREATE CART SIDEBAR
// ==========================================

const cartSidebar = document.createElement("div");

cartSidebar.className = "cart-sidebar";

cartSidebar.innerHTML = `

    <div class="cart-header">

        <h2>Your Cart 🛍️</h2>

        <button class="close-cart">
            ×
        </button>

    </div>

    <div class="cart-items"></div>

    <div class="cart-bottom">

        <div class="cart-total">
            Total:
            <strong>Rs. 0</strong>
        </div>

        <button class="checkout-button">
            Proceed to Checkout
        </button>

    </div>

`;

document.body.appendChild(cartSidebar);


// ==========================================
// CART OVERLAY
// ==========================================

const overlay = document.createElement("div");

overlay.className = "cart-overlay";

document.body.appendChild(overlay);


// ==========================================
// CART BUTTON
// ==========================================

const cartButton = document.querySelector(".cart");

cartButton.addEventListener("click", () => {

    cartSidebar.classList.add("active");

    overlay.classList.add("active");

});


// ==========================================
// CLOSE CART
// ==========================================

document.querySelector(".close-cart").addEventListener(
    "click",
    closeCart
);

overlay.addEventListener(
    "click",
    closeCart
);


function closeCart() {

    cartSidebar.classList.remove("active");

    overlay.classList.remove("active");

}


// ==========================================
// UPDATE CART
// ==========================================

function updateCart() {

    const cartItems = document.querySelector(".cart-items");

    const totalElement = document.querySelector(
        ".cart-total strong"
    );


    cartItems.innerHTML = "";

    let total = 0;

    let itemCount = 0;


    // Empty cart
    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="empty-cart">
                <div>🛍️</div>
                <p>Your cart is empty.</p>
                <span>Add something you love!</span>
            </div>
        `;

    }


    cart.forEach((item, index) => {

        total += item.price * item.quantity;

        itemCount += item.quantity;


        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

           <div class="checkout-item-image">
    <img
        src="${item.image}"
        alt="${item.name}"
    >
</div>

            <div class="cart-item-info">

                <h3>
                    ${item.name}
                </h3>

                <p>
                    Rs. ${item.price.toLocaleString()}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        −
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

            </div>

            <button
                class="remove-item"
                onclick="removeItem(${index})"
            >
                ×
            </button>

        `;


        cartItems.appendChild(cartItem);

    });


    totalElement.textContent =
        "Rs. " + total.toLocaleString();


    // Update cart counter

    cartButton.innerHTML =
        `🛒 Cart (${itemCount})`;
        localStorage.setItem("glowAndGoCart", JSON.stringify(cart));

}


// ==========================================
// INCREASE QUANTITY
// ==========================================

function increaseQuantity(index) {

    cart[index].quantity++;

    updateCart();

}


// ==========================================
// DECREASE QUANTITY
// ==========================================

function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    updateCart();

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// ==========================================
// PRODUCT ADDED MESSAGE
// ==========================================

function showMessage(productName) {

    const message = document.createElement("div");

    message.className = "added-message";

    message.innerHTML = `
        ✓ ${productName} added to cart!
    `;

    document.body.appendChild(message);


    setTimeout(() => {

        message.classList.add("show");

    }, 10);


    setTimeout(() => {

        message.classList.remove("show");

        setTimeout(() => {
            message.remove();
        }, 300);

    }, 2000);

}


// ==========================================
// INITIAL CART
// ==========================================

updateCart();

// ==========================================
// PRODUCT SEARCH
// ==========================================

const searchInput = document.querySelector("#productSearch");

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase();

    const products = document.querySelectorAll(".product");

    products.forEach((product) => {

        const productName =
            product.querySelector("h3").textContent.toLowerCase();

        if (productName.includes(searchText)) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });

});

// ==========================================
// CHECKOUT
// ==========================================

const checkoutButton = document.querySelector(".checkout-button");

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    cartSidebar.classList.remove("active");
    overlay.classList.remove("active");

    window.location.href = "checkout.html";
});