

// ==============SIGNUP AND LOOADER==========



let startSellingBtn =
    document.getElementById("startSellingBtn");

let loadingScreen =
    document.getElementById("loadingScreen");


// ==========================================
// SIGN UP BUTTON
// ==========================================

if (startSellingBtn && loadingScreen) {

    startSellingBtn.onclick = function () {

        loadingScreen.style.display = "flex";


        setTimeout(function () {

            window.location.href =
                "regiesterMeeshoSeller.html";

        }, 1500);

    };

}

