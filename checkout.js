// ==========================================
// CHECKOUT - ORDER SUMMARY
// ==========================================

let cart = JSON.parse(localStorage.getItem("glowAndGoCart")) || [];

const checkoutItems = document.querySelector("#checkoutItems");
const checkoutTotal = document.querySelector("#checkoutTotal");


function renderCheckout() {

    checkoutItems.innerHTML = "";

    let total = 0;

    if (cart.length === 0) {

        checkoutItems.innerHTML = `
            <p>Your cart is empty.</p>
        `;

        checkoutTotal.textContent = "Rs. 0";
        return;
    }

    cart.forEach((item, index) => {

        const itemTotal = item.price * item.quantity;

        total += itemTotal;

        checkoutItems.innerHTML += `
            <div class="checkout-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                    class="checkout-item-image"
                >

                <div class="checkout-item-info">

                    <h3>${item.name}</h3>

                    <p>Rs. ${item.price.toLocaleString()}</p>

                    <div class="checkout-quantity">

                        <button
                            type="button"
                            onclick="decreaseCheckoutQuantity(${index})"
                        >
                            −
                        </button>

                        <span>${item.quantity}</span>

                        <button
                            type="button"
                            onclick="increaseCheckoutQuantity(${index})"
                        >
                            +
                        </button>

                    </div>

                </div>

                <strong>
                    Rs. ${itemTotal.toLocaleString()}
                </strong>

            </div>
        `;

    });

   
}


// Show checkout when page loads
renderCheckout();


   




checkoutTotal.textContent =
    "Rs. " + total.toLocaleString();

    // ==========================================
// CHECKOUT QUANTITY CONTROLS
// ==========================================

function increaseCheckoutQuantity(index) {

    cart[index].quantity++;

    localStorage.setItem(
        "glowAndGoCart",
        JSON.stringify(cart)
    );

    renderCheckout();

}


function decreaseCheckoutQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }

    localStorage.setItem(
        "glowAndGoCart",
        JSON.stringify(cart)
    );

    renderCheckout();

}