import { products } from "./productsData.js";
let list = document.getElementById("list");
let input = document.getElementById("input");
let company = document.getElementById("company-list");
let priceFrom = document.getElementById("price-from");
let priceTo = document.getElementById("price-to");
let error = document.getElementById("error");

////// GLOBAL VARIABLES //////
let initialData = products;
let filteredData = products;

////// FUNCTION THAT  RENDERS PRODUCTS IN DOM //////
const renderProducts = () => {
  let result = "";
  filteredData.map((product) => {
    result += ` <div class="product_card">
      <img
        src="${product.image}"
        alt="${product.title}-img"
      />
      <div class='text-cont'> 
      <p class="product_title">${product.title}</p>
      <span class="product_price"><span class='dollar-sign'>$</span>${product.price}</span>
      </div>
     
    </div>`;
  });
  list.innerHTML = result;
};
renderProducts();

////// SHOW EMPTY MESSAGE /////

const showMessage = (filtered) => {
  if (filtered.length == 0) {
    list.style.display = "none";
    error.style.display = "block";
  } else {
    list.style.display = "flex";
    error.style.display = "none";
  }
};
////////// FUNCTION TO SEARCH... /////////
input.addEventListener("input", (e) => {
  let filtered = initialData.filter((product) => {
    if (product.title.toLowerCase().includes(input.value)) {
      return product;
    }
  });
  showMessage(filtered);
  filteredData = filtered;
  renderProducts();
});

///////// FUNCTION TO FILTER WITH COMPANY NAME /////////

company.addEventListener("click", (e) => {
  let company_name = e.target.innerHTML;

  if (company_name === "All") {
    filteredData = products;
    renderProducts();
    return;
  }

  let filtered = products.filter((product) => {
    if (product.company.toLowerCase().includes(company_name.toLowerCase())) {
      return product;
    }
  });
  filteredData = filtered;
  renderProducts();
});

//////// FILTER WITH PRICE //////////

priceFrom.addEventListener("input", () => {
  let filteredPrice = products.filter((product) => {
    return product.price > priceFrom.value;
  });
  showMessage(filteredPrice);

  filteredData = filteredPrice.reverse();
  renderProducts();
});
/////////
priceTo.addEventListener("input", () => {
  if (priceTo.value === "") {
    let filteredPrice2 = products.filter((product) => {
      return product.price > priceFrom.value;
    });
    error.style.display = "none";
    list.style.display = "block";
    filteredData = filteredPrice2.reverse();
    renderProducts();
    return;
  }
  let filteredPrice = products.filter((product) => {
    return product.price > priceFrom.value && product.price < priceTo.value;
  });
  showMessage(filteredPrice);
  filteredData = filteredPrice.reverse();

  renderProducts();
});
