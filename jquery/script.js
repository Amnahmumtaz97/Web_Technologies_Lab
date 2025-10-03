//delayed bindings
//event delegation
//react 

console.log("script.js loaded");
function bindings() {
    console.log("bindings called");
    let btn = document.getElementById("checkout-btn");
    btn.addEventListener("click", function() {
        alert("Checkout button clicked!");
    });
    console.log("bindings completed");

}
