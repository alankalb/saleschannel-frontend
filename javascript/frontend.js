// Populate customer selector
document.onload = getProducts();


function getProducts() {
  var url = "/product_listings/music-channel-demo.myshopify.com"
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(this.responseText);
      setProducts(res);
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

async function setProducts(products){
  var productImage = document.getElementsByClassName('product-img');
  var productTitle = document.getElementsByClassName('product-title');
  var productButton = document.getElementsByClassName('product-btn');
  var hidden = document.getElementsByClassName('product');
  products.product_listings.forEach(function(product,index) {
    productImage[index].src= product.images[0].src;
    productTitle[index].innerHTML = product.title;
    productButton[index].dataset.variant = product.variants[0].id
    hidden[index].classList.remove("hide");
  });
  
}

// Click event handlers
document.addEventListener("click", clickFilter);

function clickFilter() {
  if (event.target.dataset.variant){
    getCheckout(event.target.dataset.variant);
  }
}

function getCheckout(variant) {
  var url = "/checkout";
  var paramsJSON = {
    "variant" : variant,
    "shop" : "music-channel-demo.myshopify.com"
  }
  var params = JSON.stringify(paramsJSON) 
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      console.log(this.responseText);
      window.open(this.responseText, '_blank');
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(params);
}