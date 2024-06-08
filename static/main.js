var submitButton = document.getElementById("submitButton");
var productNameElement = document.getElementById("productName");
var loaderBackground = document.getElementById("loaderBackground");
var suggestions = document.getElementById("suggestions");
productNameElement.focus();
submitButton.addEventListener("click", () => {
  var nameOfProduct = productNameElement.value;
  if (nameOfProduct == "") {
    alert("type the company name");
    productNameElement.focus();

    return;
  }
  onValueChange()
  showOrHideLoading(true);
});
function onValueChange() {
  showOrHideLoading(true);
  console.log(window.location.search.includes("5500"));
  if (window.location.port == 5500) {
    getSuggestions([{ n: "Alphabet Inc.", s: "GOOG" }]);
    return;
  }
  axios
    .get(window.location.search + `/api//search/${productNameElement.value}`)
    .then((response) => {
      getSuggestions(response.data);
    })
    .catch((error) => {
      // Handle any errors
    });
}
function showOrHideLoading(show) {
  loaderBackground.style.display = show == true ? "flex" : "none";
}
function selectItem(s) {
  showOrHideLoading(true);
  axios
    .get(window.location.search + `/api/check-boycott/${s}`)
    .then((response) => {
      swal(
        `The company is ${response.data == "0" ? "not boycott" : "boycott"}`
      );
      resetSuggestions();
      showOrHideLoading(false);
      productNameElement.value = ''
    })
    .catch((error) => {});
}
function getSuggestions(responseData) {
  showOrHideLoading(false);

  // Access the response data
  document.getElementById("results").hidden = false;
  suggestions.innerHTML = "";
  responseData.forEach((element) => {
    suggestions.innerHTML +=
      `<li onclick=selectItem("` + element.s + `")>${element.n}</li>`;
  });
}
function resetSuggestions() {
  document.getElementById("results").hidden = true;
  suggestions.innerHTML = "";
}
