var submitButton = document.getElementById("submitButton");
var productNameElement = document.getElementById("productName");
var loaderBackground = document.getElementById("loaderBackground");
productNameElement.focus();
submitButton.addEventListener("click", () => {
  var nameOfProduct = productNameElement.value;
  if (nameOfProduct == "") {
    alert("type the product name");
    productNameElement.focus();

    return;
  }
  loaderBackground.hidden = false;

  setTimeout(() => {
    swal(`The ${nameOfProduct} is boycott`);
    loaderBackground.hidden = true;
  }, 2000);
});
