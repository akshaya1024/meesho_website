
// ==========================================
// GET CART FROM LOCAL STORAGE
// ==========================================

let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ==========================================
// GET HTML ELEMENTS
// ==========================================

let productDetails = document.querySelector(".product-details");

let itemCount = document.getElementById("itemCount");

let productPrice = document.getElementById("productPrice");

let orderTotal = document.getElementById("orderTotal");



// ==========================================
// CREATE TOTAL DISCOUNT ELEMENT
// ==========================================

let discountElement = document.getElementById("totalDiscount");


// If totalDiscount is not present in HTML,
// create it automatically
if (!discountElement) {

    discountElement = document.createElement("span");

    discountElement.id = "totalDiscount";

    discountElement.textContent = "-₹0";

    let discountBox = document.querySelector(".discount");

    if (discountBox) {

        discountBox.appendChild(discountElement);

    }

}


// ==========================================
// DISPLAY CART
// ==========================================

function displayCart() {


    // --------------------------------------
    // PRODUCT DETAILS HEADING
    // --------------------------------------

    productDetails.innerHTML = `
        <p>Product Details</p>
    `;


    // --------------------------------------
    // VARIABLES
    // --------------------------------------

    let totalPrice = 0;

    let totalItems = 0;


    // --------------------------------------
    // DISPLAY PRODUCTS
    // --------------------------------------

    cart.forEach(function(product, index) {


        // Product price
        let price = Number(product.price) || 0;


        // Product quantity
        let quantity = Number(product.quantity) || 1;


        // Calculate total price
        totalPrice = totalPrice + (price * quantity);


        // Calculate total items
        totalItems = totalItems + quantity;


        // ----------------------------------
        // CREATE PRODUCT BOX
        // ----------------------------------

        let productBox = document.createElement("div");

        productBox.className = "cart-product";


        // ----------------------------------
        // PRODUCT HTML
        // ----------------------------------

        productBox.innerHTML = `

            <img 
                src="${product.image}" 
                alt="${product.name}"
            >

            <div>

                <p>${product.name}</p>

                <p>₹${price}</p>

                <span>
                    Size: ${product.size}
                </span>

                <span>
                    • Qty: ${quantity}
                </span>

                <br><br>

                <span
                    class="remove-product"
                    data-index="${index}"
                    style="cursor:pointer;"
                >
                    ✕ REMOVE
                </span>

            </div>

        `;


        // Add product to page
        productDetails.appendChild(productBox);

    });


    // ==========================================
    // ₹20 DISCOUNT FOR EACH ITEM
    // ==========================================

    let totalDiscount = totalItems * 20;


    // ==========================================
    // DELIVERY CHARGE
    // ==========================================

    let deliveryCharge = 0;


    // ==========================================
    // ORDER TOTAL
    // ==========================================

    let finalTotal =
        totalPrice -
        totalDiscount +
        deliveryCharge;
    
    orderTotal.textContent = "₹" + finalTotal;


    // ==========================================
    // ITEMS COUNT
    // ==========================================

    itemCount.textContent = totalItems;


    // ==========================================
    // PRODUCT PRICE
    // ==========================================

    productPrice.textContent =
        "₹" + totalPrice;


    // ==========================================
    // TOTAL DISCOUNT
    // ==========================================

    discountElement.textContent ="-₹" + totalDiscount;


    // ==========================================
    // DELIVERY
    // ==========================================

    // Your current HTML uses deliveryCharges
    // element. Keep it as ₹0.

    // deliveryCharges.textContent = "₹" + deliveryCharge;


    // ==========================================
    // ORDER TOTAL
    // ==========================================

    orderTotal.textContent =
        "₹" + finalTotal;


    // ==========================================
    // GREEN DISCOUNT MESSAGE
    // ==========================================

    let discountMessage =
        document.querySelector(".image-total span span");


    if (discountMessage) {

        discountMessage.textContent =
            "₹" + totalDiscount;

    }

}


// ==========================================
// REMOVE PRODUCT
// ==========================================

productDetails.addEventListener(
    "click",
    function(event) {


        // Check REMOVE clicked
        if (
            event.target.classList.contains(
                "remove-product"
            )
        ) {


            // Get product index
            let index =
                Number(
                    event.target.dataset.index
                );


            // Remove product
            cart.splice(index, 1);


            // Save updated cart
            localStorage.setItem(
                "cart",
                JSON.stringify(cart)
            );


            // Display updated cart
            displayCart();

        }

    }
);


// ==========================================
// CONTINUE BUTTON
// ==========================================

let continueButton =
    document.querySelector(".continue button");

if (continueButton) {

    continueButton.addEventListener(
        "click",
        function() {

            if (cart.length === 0) {
                alert("Your cart is empty");
                return;
            }

            localStorage.setItem(
                "checkoutProducts",
                JSON.stringify(cart)
            );

            window.location.href =
                "payment-summary.html";

        }
    );

}

// ==========================================
// DISPLAY CART WHEN PAGE LOADS
// ==========================================

displayCart();