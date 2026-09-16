// ==========================================
// GET BUY NOW PRODUCT
// ==========================================

let buyProduct = JSON.parse(localStorage.getItem("buyNowProduct"));


// ==========================================
// CHECK PRODUCT
// ==========================================

if (!buyProduct) {

    document.body.innerHTML = ` <h2 style="text-align:center; margin-top:100px;"> Product not found </h2> `;

    } else {

    // PRODUCT IMAGE

    document.getElementById("buyProductImage").src = buyProduct.image;


    // PRODUCT NAME

    document.getElementById("buyProductName").textContent = buyProduct.name;


    // PRODUCT PRICE

    document.getElementById("buyProductPrice").textContent = "₹" + buyProduct.price;


    // PRODUCT SIZE

    document.getElementById("buyProductSize").textContent = buyProduct.size;


    // SELLER

    document.getElementById("buySellerName").textContent = buyProduct.sellerName || "Seller";


    // PRICE DETAILS

    document.getElementById("productPriceDetails").textContent = "₹" + buyProduct.price;


    // DISCOUNT ₹20

    let finalPrice = Number(buyProduct.price) - 20;

    if (finalPrice < 0) {
        finalPrice = 0;
    }


    document.getElementById("orderTotal").textContent = "₹" + finalPrice;


    // ==========================================
    // CONTINUE
    // ==========================================
document.getElementById("continueBtn").addEventListener("click", function () {

    let deliveryName =
        document.getElementById("deliveryName").value.trim();

    let deliveryAddress =
        document.getElementById("deliveryAddress").value.trim();

    let deliveryPincode =
        document.getElementById("deliveryPincode").value.trim();

    let deliveryMobile =
        document.getElementById("deliveryMobile").value.trim();

    if (
        deliveryName === "" ||
        deliveryAddress === "" ||
        deliveryPincode === "" ||
        deliveryMobile === ""
    ) {
        alert("Please enter delivery address details");
        return;
    }

    // SAVE DELIVERY ADDRESS
    localStorage.setItem(
        "deliveryAddress",
        JSON.stringify({
            name: deliveryName,
            address: deliveryAddress,
            pincode: deliveryPincode,
            mobile: deliveryMobile
        })
    );

    // GO TO PAYMENT SUMMARY PAGE
    // SHOW LOADER
let loader = document.getElementById("loadingScreen");

loader.style.display = "flex";

// AFTER 1.5 SECONDS GO TO PAYMENT SUMMARY
setTimeout(function () {
    window.location.href = "payment-summary.html";
}, 1500);

});

}