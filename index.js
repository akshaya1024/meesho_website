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
    "kitchen",
    "kids",
    "jewellery",
    "home decor",
    "beauty",
    "health",
    
   
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

        // ONLY data-search will be checked
        let dataSearch =
            (product.dataset.search || "")
            .toLowerCase()
            .trim();

        // Exact match with data-search
        if (dataSearch === searchText) {

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
// SHOW ADDED PRODUCTS FROM LOCAL STORAGE
// ==========================================

let savedProducts =
    JSON.parse(
        localStorage.getItem("products")
    ) || [];


let productContainer =
    document.querySelector(".products");


if (productContainer) {

    savedProducts.forEach(function (product) {

        let card =
            document.createElement("div");


        card.className = "product-card";


        // Search data
        card.dataset.search =( product.category).toLowerCase();


        // Category
        card.dataset.category =  product.category;


        card.innerHTML = `
            <a href="product-details-template.html?id=${product.id}">

                <div class="suggestion">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                    <br>

                    <p>${product.name}</p>

                    <h2>₹${product.price}</h2>

                    <br>

                    <button>
                        ${product.rating || "0"}
                        <i class="fa-solid fa-star"></i>
                    </button>

                    <span>
                        ${product.reviews || "0"} Reviews
                    </span>

                </div>

            </a>
        `;


        productContainer.appendChild(card);

    });

}


// ==========================================
// CATEGORY ITEMS
// ==========================================
// ==========================================
// CATEGORY ITEMS
// HTML PRODUCTS + LOCAL STORAGE PRODUCTS
// ==========================================
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