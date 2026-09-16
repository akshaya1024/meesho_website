let confirmDelete = document.getElementById("confirmDelete");
let loadingScreen = document.getElementById("loadingScreen");
let deletePopup = document.getElementById("deletePopup");

if (confirmDelete) {

    confirmDelete.onclick = function () {

        // Show loader
        loadingScreen.style.display = "flex";

        setTimeout(function () {

            // Hide loader
            loadingScreen.style.display = "none";

            // Delete account data
            localStorage.removeItem("loginSuccess");
            localStorage.removeItem("mobileNumber");

            // Show popup
            deletePopup.style.display = "block";

            // After popup
            setTimeout(function () {

                deletePopup.style.display = "none";

                // Go to index page
                window.location.href = "index.html";

            }, 2000);

        }, 1500);

    };
}