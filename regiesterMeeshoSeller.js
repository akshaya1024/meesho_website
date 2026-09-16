
let verifyBtn = document.getElementById("verifyBtn");
let mobileNumber = document.getElementById("mobileNumber");
let verifyPopup = document.getElementById("verifyPopup");
let numberError = document.getElementById("numberError");

verifyBtn.onclick = function () {

    let number = mobileNumber.value.trim();

    if (!/^[0-9]{10}$/.test(number)) {

        numberError.textContent = "Enter a valid number";
        return;
    }

    numberError.textContent = "";

    verifyPopup.style.display = "block";
    localStorage.setItem("loginSuccess", "true");
    localStorage.setItem("mobileNumber", number);
    setTimeout(function () {
        window.location.href ="addProduct.html"
    }, 1500);
};


