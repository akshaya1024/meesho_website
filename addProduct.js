let productImage =
    document.getElementById("productImage");

let previewImage =
    document.getElementById("previewImage");

let previewText =
    document.getElementById("previewText");

let productForm =
    document.getElementById("productForm");

let successPopup =
    document.getElementById("successPopup");

// ==========================================
// IMAGE PREVIEW
// ==========================================

productImage.addEventListener("change", function () {

    let file = productImage.files[0];

    if (file) {

        previewImage.src =
            URL.createObjectURL(file);

        previewImage.style.display =
            "block";

        previewText.style.display =
            "none";
    }

});


// ==========================================
// ADD PRODUCT
// ==========================================

productForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        let productName =
            document.getElementById(
                "productName"
            ).value.trim();


        let price =
            document.getElementById(
                "price"
            ).value;


        let category =
            document.getElementById(
                "category"
            ).value;


        let size =
            document.getElementById(
                "size"
            ).value.trim();


        let description = document.getElementById( "description").value.trim();
        let rating = document.getElementById("rating").value;
        let reviews = document.getElementById("reviews").value;


        let file =productImage.files[0];


        if (!file) {

            alert(
                "Please select a product image"
            );

            return;
        }


        // Image convert to Data URL

        let reader = new FileReader();


        reader.onload = function () {
               
            let product = {

                 id: Date.now(),
                 
                sellerName:
                    document.getElementById("sellerName").value.trim(),

                sellerMobile:
                    document.getElementById("sellerMobile").value.trim(),

                sellerEmail:
                    document.getElementById("sellerEmail").value.trim(),

                sellerAddress:
                    document.getElementById("sellerAddress").value.trim(),

               

                name: productName,

                price: price,

                category: category,

                size: size,

                rating: rating,

                reviews: reviews,

                description: description,

                image: reader.result

            };

            // Save product

           let existingProducts =
                JSON.parse(localStorage.getItem("products")) || [];

            existingProducts.push(product);

            localStorage.setItem(
                "products",
                JSON.stringify(existingProducts)
            );


            // Show popup

            successPopup.style.display =
                "block";


            // Clear form

            productForm.reset();


            previewImage.style.display =
                "none";

            previewText.style.display =
                "block";


            // Hide popup

            setTimeout(function () {

                successPopup.style.display =
                    "none";
                window.location.href = "index.html";

            }, 2500);

        };


        reader.readAsDataURL(file);

    }
);

// ====================seller DEtails=============
