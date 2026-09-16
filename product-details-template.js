// ==========================================
// GET PRODUCT ID FROM URL
// ==========================================

let urlParams = new URLSearchParams(window.location.search);

let productId = urlParams.get("id");


// ==========================================
// GET ALL PRODUCTS
// ==========================================

let products = JSON.parse(localStorage.getItem("products")) || [];


// ==========================================
// FIND SELECTED PRODUCT
// ==========================================

let product = products.find(function (item) {
    return String(item.id) === String(productId);
});


// ==========================================
// IF PRODUCT NOT FOUND
// ==========================================

if (!product) {

    document.body.innerHTML = `
        <h2 style="text-align:center;margin-top:100px;">
            Product not found
        </h2>
    `;

} else {


    // ==========================================
    // SHOW PRODUCT INFORMATION
    // ==========================================

    document.getElementById("productImage").src = product.image;

    document.getElementById("productName").textContent =
        product.name;

    document.getElementById("productPrice").textContent =
        "₹" + product.price;


    // ==========================================
    // RATING
    // ==========================================

    let rating = product.rating || "0";

    document.getElementById("productRating").innerHTML =
        rating + ' <i class="fa-solid fa-star"></i>';


    // ==========================================
    // REVIEWS
    // ==========================================

    let reviews = product.reviews || "0";

    document.getElementById("productReviews").textContent =
        "Ratings, " + reviews + " Reviews";


    // ==========================================
    // CATEGORY
    // ==========================================

    document.getElementById("productCategory").textContent =
        product.category || "-";


    // ==========================================
    // SIZE TEXT
    // ==========================================

    document.getElementById("productSize").textContent =
        product.size || "-";


    // ==========================================
    // DESCRIPTION
    // ==========================================

    document.getElementById("productDescription").textContent =
        product.description || "-";


    // ==========================================
    // SELLER DETAILS
    // ==========================================

    document.getElementById("sellerName").textContent =
        product.sellerName || "Seller";

    document.getElementById("sellerMobile").textContent =
        product.sellerMobile || "-";

    document.getElementById("sellerEmail").textContent =
        product.sellerEmail || "-";

    document.getElementById("sellerAddress").textContent =
        (product.sellerAddress || "-") 

    // ==========================================
    // SIZE BUTTONS
    // ==========================================

    let sizeContainer =
        document.getElementById("sizeButtons");

    let sizes = [];

    if (product.size) {

        sizes = product.size
            .split(",")
            .map(function (size) {
                return size.trim();
            })
            .filter(function (size) {
                return size !== "";
            });

    }


    // If no size entered
    if (sizes.length === 0) {
        sizes.push("Free Size");
    }


    let selectedSize = "";


    sizes.forEach(function (size) {

        let button = document.createElement("button");

        button.textContent = size;

        button.addEventListener("click", function () {

            document
                .querySelectorAll(".size button")
                .forEach(function (btn) {
                    btn.classList.remove("selected");
                });

            button.classList.add("selected");

            selectedSize = size;

        });

        sizeContainer.appendChild(button);

    });


    // ==========================================
    // ADD TO CART
    // ==========================================

    let addToCartButton =
        document.getElementById("addToCart");

    let cartToast =
        document.getElementById("cartToast");


    let productAdded = false;


    addToCartButton.addEventListener("click", function () {


        // --------------------------------------
        // SIZE NOT SELECTED
        // --------------------------------------

        if (selectedSize === "") {

            cartToast.textContent =
                "Please select a size";

            cartToast.style.display = "flex";

            setTimeout(function () {

                cartToast.style.display = "none";

            }, 2500);

            return;
        }


        // --------------------------------------
        // GET EXISTING CART
        // --------------------------------------

        let cart =
            JSON.parse(localStorage.getItem("cart")) || [];


        // --------------------------------------
        // CHECK SAME PRODUCT + SIZE
        // --------------------------------------

        let existingItem = cart.find(function (item) {

            return String(item.id) === String(product.id)
                && item.size === selectedSize;

        });


        if (existingItem) {

            existingItem.quantity =
                (existingItem.quantity || 1) + 1;

        } else {

            cart.push({

                id: product.id,

                name: product.name,

                price: product.price,

                image: product.image,

                size: selectedSize,

                quantity: 1

            });

        }


        // --------------------------------------
        // SAVE CART
        // --------------------------------------

        localStorage.setItem(
            "cart",
            JSON.stringify(cart)
        );


        // --------------------------------------
        // SHOW SUCCESS
        // --------------------------------------

        cartToast.textContent =
            "Product is added to cart.";

        cartToast.style.display = "flex";


        // --------------------------------------
        // CHANGE BUTTON AFTER 2.5 SEC
        // --------------------------------------

        setTimeout(function () {

            cartToast.style.display = "none";

            productAdded = true;

            addToCartButton.innerHTML =
                '<i class="fa-solid fa-cart-shopping"></i> Go to Cart';

        }, 2500);

    });


    // ==========================================
    // GO TO CART
    // ==========================================

    addToCartButton.addEventListener("click", function () {

        if (productAdded) {

            window.location.href = "cart.html";

        }

    });


    // ==========================================
    // BUY NOW
    // ==========================================

    document
        .getElementById("buyNow")
        .addEventListener("click", function () {

            if (selectedSize === "") {

                cartToast.textContent =
                    "Please select a size";

                cartToast.style.display = "flex";

                setTimeout(function () {
                    cartToast.style.display = "none";
                }, 2500);

                return;
            }


         localStorage.setItem(
    "buyNowProduct",
    JSON.stringify({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        size: selectedSize,
        quantity: 1,
        sellerName: product.sellerName
    })
);

// LOADER
let loader = document.getElementById("loadingScreen");

loader.style.display = "flex";

setTimeout(function () {
    window.location.href = "buyNow.html";
}, 1500);
        });

}