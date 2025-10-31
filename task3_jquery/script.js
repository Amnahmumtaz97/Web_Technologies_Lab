console.log("script.js loaded");

function bindings() {
  console.log("bindings called");

  let btn = document.getElementById("checkout-btn");

  document.querySelectorAll("input[name='payment']").forEach((p) => {
    p.addEventListener("change", function () {
      document.getElementById("cardInfo").style.display =
        this.value === "card" ? "block" : "none";
    });
  });

  // Checkout button
  btn.addEventListener("click", function (e) {
    e.preventDefault();
    console.log("Checkout clicked!");
    validateForm();
  });
}

function validateForm() {
  let valid = true;
  let firstError = null;

  // Helper functions
  function showError(input, msg) {
    input.classList.add("is-invalid");
    input.classList.remove("is-valid");
    let feedback = input.parentElement.querySelector(".invalid-feedback");
    if (feedback) feedback.textContent = msg;
    if (!firstError) firstError = input;
    valid = false;
  }

  function clearError(input) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
    let feedback = input.parentElement.querySelector(".invalid-feedback");
    if (feedback) feedback.textContent = "";
  }

  // Full name
  let fullname = document.getElementById("fullname");
  if (fullname.value.trim().length < 3) {
    showError(fullname, "Full name must be at least 3 characters.");
  } else {
    clearError(fullname);
  }

  // Email
  let email = document.getElementById("email");
  let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    showError(email, "Enter a valid email address.");
  } else {
    clearError(email);
  }

  // Phone
  let phone = document.getElementById("phone");
  if (!/^\d{10,}$/.test(phone.value.trim())) {
    showError(phone, "Phone must be digits only, at least 10 digits.");
  } else {
    clearError(phone);
  }

  // Address
  let address = document.getElementById("address");
  if (address.value.trim() === "") {
    showError(address, "Address is required.");
  } else {
    clearError(address);
  }

  // City
  let city = document.getElementById("city");
  if (city.value.trim() === "") {
    showError(city, "City is required.");
  } else {
    clearError(city);
  }

  // Postal code
  let postal = document.getElementById("postal");
  if (!/^\d{4,6}$/.test(postal.value.trim())) {
    showError(postal, "Postal code must be 4–6 digits.");
  } else {
    clearError(postal);
  }

  // Country
  let country = document.getElementById("country");
  if (country.value.trim() === "") {
    showError(country, "Please select your country.");
  } else {
    clearError(country);
  }
  // Payment method
  let payment = document.querySelector("input[name='payment']:checked");
  if (!payment) {
    document.querySelectorAll("input[name='payment']").forEach((p) => {
      p.classList.add("is-invalid");
    });
    valid = false;
    if (!firstError)
      firstError = document.querySelector("input[name='payment']");
  } else {
    document.querySelectorAll("input[name='payment']").forEach((p) => {
      p.classList.remove("is-invalid");
    });
  }

  // Card details (only if selected)
  if (payment && payment.value === "card") {
    let cardnum = document.getElementById("cardnum");
    let cvv = document.getElementById("cvv");

    if (cardnum.value.trim() === "") {
      showError(cardnum, "Card number required.");
    } else {
      clearError(cardnum);
    }

    if (cvv.value.trim() === "") {
      showError(cvv, "CVV required.");
    } else {
      clearError(cvv);
    }
  }

  // Terms
  let terms = document.getElementById("terms");
  let termsError = document.getElementById("termsError");
  if (!terms.checked) {
    terms.classList.add("is-invalid");
    termsError.style.display = "block";
    valid = false;
    if (!firstError) firstError = terms;
  } else {
    terms.classList.remove("is-invalid");
    termsError.style.display = "none";
  }

  // Scroll to first error
  if (!valid && firstError) {
    firstError.scrollIntoView({ behavior: "smooth", block: "center" });
    firstError.focus();
  }

  //Success
  if (valid) {
    alert("Order placed successfully!");
    document.getElementById("checkoutForm").reset();
    document.getElementById("cardInfo").style.display = "none";
  //Reset 
    document.querySelectorAll(".form-control, .form-select").forEach((el) => {
      el.classList.remove("is-valid", "is-invalid");
    });
  }
}

window.addEventListener("DOMContentLoaded", bindings);
