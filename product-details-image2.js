// ==========================================
// SEARCH BAR + SUGGESTION + PRODUCT FILTER
// ==========================================

let searchBar = document.querySelector(".searchbar");

// HTML-ல் ஏற்கனவே இருக்கும் suggestion box
let suggestionBox =
    document.getElementById("searhSuggestions");


// ==========================================
// ALL PRODUCTS
// ==========================================

function getProducts() {
    return document.querySelectorAll(".product-card");
}


// ==========================================
// SUGGESTIONS
// ==========================================

let suggestions = [
    "women",
    "men",
    "bag",
    "home & kitchen",
    "kids",
    "jewellery",
    "home decor",
    "beauty",
    "health",
    "saree",
    "kurta",
    "dress",
    "footwear",
    "accessories",
    "grocery"
];


// ==========================================
// POSITION SUGGESTION BOX
// ==========================================

function showSuggestionBox() {

    if (!searchBar || !suggestionBox) return;

    let position =
        searchBar.getBoundingClientRect();

    suggestionBox.style.left =
        position.left + window.scrollX + "px";

    suggestionBox.style.top =
        position.bottom + window.scrollY + "px";

    suggestionBox.style.width =
        position.width + "px";
}


// ==========================================
// FILTER PRODUCTS
// ==========================================
function filterProducts(searchText) {

    let products = getProducts();

    products.forEach(function (product) {

        let productName = "";

        let name =
            product.querySelector(".suggestion p");

        if (name) {
            productName =
                name.textContent.toLowerCase();
        }


        // data-search
        let dataSearch = "";

        if (product.dataset.search) {
            dataSearch = product.dataset.search.toLowerCase();
        }


        // Category
        let category = "";

        if (product.dataset.category) {
            category = product.dataset.category.toLowerCase();
        }


        // Combine all searchable data
        let allText = productName + " " + dataSearch + " " + category;


        // Convert into individual words
        let words = allText.split(/[\s,]+/);

        // Exact word match
        let matched =
            words.some(function (word) {

                return word === searchText;

            });


        if (matched) {

            product.style.display = "";

        } else {

            product.style.display = "none";

        }

    });
}
// ==========================================
// SEARCH BAR TYPING
// ==========================================

if (searchBar && suggestionBox) {

    searchBar.addEventListener("input", function () {

        let searchText =
            searchBar.value.toLowerCase().trim();


        // Clear suggestions
        suggestionBox.innerHTML = "";


        // ======================================
        // EMPTY SEARCH
        // ======================================

        if (searchText === "") {

            suggestionBox.style.display = "none";


            // Show all products
            getProducts().forEach(function (product) {

                product.style.display = "";

            });

            return;
        }


        // ======================================
        // FILTER PRODUCT
        // ======================================

        filterProducts(searchText);


        // ======================================
        // FIND SUGGESTIONS
        // ======================================

        let result =
            suggestions.filter(function (item) {

                return item
                    .toLowerCase()
                    .includes(searchText);

            });


        // ======================================
        // CREATE SUGGESTIONS
        // ======================================

        result.forEach(function (item) {

            let div =
                document.createElement("div");

            div.className =
                "search-suggestion";


            div.innerHTML =
                "⌕ " + item;


            // ==================================
            // CLICK SUGGESTION
            // ==================================

            div.addEventListener("click", function () {

                // Put selected suggestion in search
                searchBar.value = item;


                // Close box
                suggestionBox.style.display =
                    "none";


                // IMPORTANT:
                // Use selected item
                let selectedText =
                    item.toLowerCase().trim();


                // Filter products
                filterProducts(selectedText);

            });


            // Add to suggestion box
            suggestionBox.appendChild(div);

        });


        // ======================================
        // NO SUGGESTION
        // ======================================

        if (result.length === 0) {

            suggestionBox.innerHTML = `
                <div class="search-suggestion no-result">
                    No suggestion found
                </div>
            `;

        }


        // ======================================
        // SHOW SUGGESTION BOX
        // ======================================

        showSuggestionBox();

        suggestionBox.style.display = "block";

    });

}


// ==========================================
// CLOSE SUGGESTION WHEN CLICK OUTSIDE
// ==========================================

document.addEventListener("click", function (event) {

    if (
        event.target !== searchBar &&
        suggestionBox &&
        !suggestionBox.contains(event.target)
    ) {

        suggestionBox.style.display = "none";

    }

});


// ==========================================
// WINDOW RESIZE
// ==========================================

window.addEventListener("resize", function () {

    if (
        suggestionBox &&
        suggestionBox.style.display === "block"
    ) {

        showSuggestionBox();

    }

});


// ==========================================
// SIGN UP + LOADER
// ==========================================

let signupBtn =
    document.getElementById("signUpBtn");

let loadingScreen =
    document.getElementById("loadingScreen");


if (signupBtn && loadingScreen) {

    signupBtn.onclick = function () {

        loadingScreen.style.display = "flex";


        setTimeout(function () {

            window.location.href =
                "signuppage.html";

        }, 1500);

    };

}


// ==========================================
// PROFILE
// ==========================================

let profileUser =
    document.getElementById("profileUser");

let profileMessage =
    document.getElementById("profileMessage");


let loginSuccess =
    localStorage.getItem("loginSuccess");

let savedNumber =
    localStorage.getItem("mobileNumber");


if (
    loginSuccess === "true" &&
    savedNumber
) {

    // Hide Sign Up button
    if (signupBtn) {

        signupBtn.style.display = "none";

    }


    // Show mobile number
    if (profileUser) {

        profileUser.textContent =
            savedNumber;

    }


    // Welcome message
    if (profileMessage) {

        profileMessage.textContent =
            "Welcome to your Meesho account";

    }

}


// ==========================================
// DELETE ACCOUNT
// ==========================================

let deleteAccount =
    document.getElementById("deleteAccount");


if (deleteAccount && loadingScreen) {

    deleteAccount.onclick = function () {

        loadingScreen.style.display = "flex";


        setTimeout(function () {

            loadingScreen.style.display = "none";


            window.location.href =
                "deleteAccount.html";

        }, 1500);

    };

}
// ==========================================
// CATEGORY ITEMS
// ==========================================

let categoryItems = document.querySelectorAll(".category-item");

categoryItems.forEach(function (item) {

    item.addEventListener("click", function () {

        let selectedCategory = item.dataset.category.toLowerCase().trim();

        let allProducts = document.querySelectorAll(".product-card");

        allProducts.forEach(function (card) {

            // Product name-a check panna koodathu
            // data-search mattum check pannum
            let dataSearch = (card.dataset.search || "").toLowerCase().trim();

            if (selectedCategory === "all") {

                card.style.display = "";

            } else if (dataSearch === selectedCategory) {

                card.style.display = "";

            } else {

                card.style.display = "none";

            }

        });

    });

});


// ==========================================
// PRODUCT DETAILS
// ==========================================

let sizeButtons = document.querySelectorAll(".size button");
let addToCartButton = document.querySelector(".add-to-cart");

let selectedSize = "";
let productAdded = false;


// ==========================================
// PRODUCT INFORMATION
// ==========================================

let productName = document
    .querySelector(".price-details p")
    .textContent
    .trim();

let priceText = document
    .querySelector(".price")
    .textContent
    .trim();

let productPrice = Number(
    priceText.replace(/[^\d]/g, "")
);

let productImage = document
    .querySelector(".product-image img")
    .src;


// ==========================================
// POPUP
// ==========================================

function showToast(message) {

    let toast = document.createElement("div");

    toast.innerHTML = `
        <i class="fa-solid fa-circle-check"></i>
        <span>${message}</span>
    `;

    Object.assign(toast.style, {
        position: "fixed",
        bottom: "30px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "#292b3d",
        color: "white",
        padding: "15px 22px",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "15px",
        fontWeight: "500",
        zIndex: "999999",
        boxShadow: "0 4px 15px rgba(0,0,0,0.25)"
    });

    document.body.appendChild(toast);


    // Popup 2.5 seconds show ஆகும்
    setTimeout(function () {
        toast.remove();
    }, 2500);
}


// ==========================================
// SIZE SELECT
// ==========================================

sizeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        selectedSize = button.textContent.trim();


        // எல்லா size button-ஐ reset பண்ணும்
        sizeButtons.forEach(function (btn) {

            btn.style.backgroundColor =
                "rgba(168, 5, 168, 0.121)";

            btn.style.color = "purple";

        });


        // Selected size மட்டும் highlight ஆகும்
        button.style.backgroundColor = "purple";
        button.style.color = "white";


        // Size click பண்ணும்போது
        // Add to Cart தான் இருக்க வேண்டும்
        if (productAdded === false) {

            addToCartButton.innerHTML = `
                <i class="fa-solid fa-cart-shopping"></i>
                Add to Cart
            `;

        }

    });

});


// ==========================================
// ADD TO CART BUTTON
// ==========================================

addToCartButton.addEventListener("click", function () {


    // --------------------------------------
    // ஏற்கனவே product added என்றால்
    // --------------------------------------

    if (productAdded === true) {

        // இங்கே தான் cart page போகும்
        window.location.href = "cart.html";

        return;
    }


    // --------------------------------------
    // SIZE SELECT பண்ணலனா
    // --------------------------------------

    if (selectedSize === "") {

        showToast("Please select a size");

        return;
    }


    // --------------------------------------
    // LOCAL STORAGE CART
    // --------------------------------------

    let cart = JSON.parse(
        localStorage.getItem("cart")
    ) || [];


    // --------------------------------------
    // PRODUCT OBJECT
    // --------------------------------------

    let product = {
        name: productName,
        price: productPrice,
        image: productImage,
        size: selectedSize,
        quantity: 1
    };


    // --------------------------------------
    // CART-ல் ADD
    // --------------------------------------

    cart.push(product);


    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    // --------------------------------------
    // IMPORTANT
    // --------------------------------------

    // முதலில் popup
    showToast("Product is added to cart.");


    // Product successfully added
    productAdded = true;


    // --------------------------------------
    // POPUP SHOW ஆன பிறகு
    // button Go to Cart ஆகும்
    // --------------------------------------

    setTimeout(function () {

        addToCartButton.innerHTML = "Go to Cart";

    }, 1000);

});

// ==========================================
// BUY NOW
// ==========================================

let buyNowButton =
    document.getElementById("buyNow");

buyNowButton.addEventListener(
    "click",
    function () {

        // SIZE CHECK
        if (selectedSize === "") {

            showToast("Please select a size");

            return;
        }


        // PRODUCT DETAILS
        let buyNowProduct = {

            id: Date.now(),

            name: productName,

            price: productPrice,

            image: productImage,

            size: selectedSize,

            quantity: 1

        };


        // SAVE PRODUCT
        localStorage.setItem(
            "buyNowProduct",
            JSON.stringify(buyNowProduct)
        );


        // LOADING SCREEN
        let loader =
            document.getElementById("loadingScreen");

        if (loader) {

            loader.style.display = "flex";

        }


        // GO TO BUY NOW PAGE
        setTimeout(function () {

            window.location.href =
                "buyNow.html";

        }, 1500);

    }
);