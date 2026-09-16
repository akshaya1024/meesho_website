// GET BUY NOW PRODUCT

let buyNowProduct =
    JSON.parse(localStorage.getItem("buyNowProduct"));


// TOAST FUNCTION

function showToast(message) {

    let toast =
        document.getElementById("successToast");

    let toastMessage =
        document.getElementById("toastMessage");

    toastMessage.textContent = message;

    toast.style.display = "flex";

    setTimeout(function () {

        toast.style.display = "none";

    }, 2500);
}


// CHECK PRODUCT

if (!buyNowProduct) {

    document.body.innerHTML = `
        <h2 style="text-align:center;margin-top:100px;">
            Product not found
        </h2>
    `;

} else {

    let price =
        Number(buyNowProduct.price) || 0;


    // DISCOUNT

    let discount = 20;


    // FINAL PRICE

    let finalPrice =
        Math.max(price - discount, 0);


    // PRODUCT PRICE

    document.getElementById("productPrice")
        .textContent =
        "+ ₹" + price;


    // DISCOUNT

    document.getElementById("totalDiscount")
        .textContent =
        "- ₹" + discount;


    // ORDER TOTAL

    document.getElementById("orderTotal")
        .textContent =
        "₹" + finalPrice;


    // DISCOUNT MESSAGE

    document.getElementById("discountMessage")
        .textContent =
        "₹" + discount;


    // CASH ON DELIVERY

    document.getElementById("codPrice")
        .textContent =
        "₹" + finalPrice;


    // ONLINE PRICE

    document.getElementById("onlineOldPrice")
        .textContent =
        "₹" + finalPrice;


    let onlinePrice =
        Math.max(finalPrice - 24, 0);


    document.getElementById("onlinePrice")
        .textContent =
        "₹" + onlinePrice;


    // RESSELLING BUTTONS

    let noBtn =
        document.getElementById("noBtn");

    let yesBtn =
        document.getElementById("yesBtn");


    noBtn.addEventListener("click", function () {

        noBtn.classList.add("selected");

        yesBtn.classList.remove("selected");

    });


    yesBtn.addEventListener("click", function () {

        yesBtn.classList.add("selected");

        noBtn.classList.remove("selected");

    });


    // PLACE ORDER

    document
        .getElementById("placeOrderBtn")
        .addEventListener("click", function () {

            let selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            // PAYMENT NOT SELECTED

            if (!selectedPayment) {

                showToast(
                    "Please select a payment method"
                );

                return;
            }


            // SHOW LOADER

            let loader =
                document.getElementById("loadingScreen");

            loader.style.display = "flex";


            // AFTER 1.5 SECONDS

            setTimeout(function () {

                // HIDE LOADER

                loader.style.display = "none";


                // SHOW SUCCESS POPUP

                showToast(
                    "Order placed successfully!"
                );


                // GO TO INDEX AFTER 2.5 SECONDS

                setTimeout(function () {

                    window.location.href =
                        "index.html";

                }, 2500);

            }, 1500);

        });

}