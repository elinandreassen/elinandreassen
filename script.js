import { displayMessage } from "./components/message.js";

const myUrl = "https://t9jt3myad3.execute-api.eu-west-2.amazonaws.com/api/products";
const proxy = "https://noroffcors.herokuapp.com/";

const corsFix = proxy + myUrl;

const resultsContainer = document.querySelector(".results");

async function getItems() {
  try {
    const response = await fetch(corsFix);
    const json = await response.json();
    console.log(json);
    getProducts(json.data);

  } catch (error) {
    console.log(error);
    resultsContainer.innerHTML = alert("Ooops, there was an error", error);
  }
}
getItems();


function getProducts(data) {
  resultsContainer.innerHTML = "";

  for (let i = 0; i < 9; i++) {
    resultsContainer.innerHTML += `<div class="item">
        <h4>${data[i].name}</h4>
        <p>
          Price: <b>${data[i].price}</b>
        </p>
        <button type="button">WISHLIST</button>
      </div>`;
  }
};



 
export function filterProducts(products) {
  const priceInput = document.querySelector("#searchInput");


  priceInput.onkeyup = function (event) {
    const filter = event.target.value;
    const filterValue = filter.trim();

    const filteredPrices = products.filter(function (product) {
      if (parseFloat(product.price) <= filterValue) {
        return true;
      } else if (filterValue === "") {
        return true;
      }
    });
    renderProducts(filteredPrices);
  };
}




