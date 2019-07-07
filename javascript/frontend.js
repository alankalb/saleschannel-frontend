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
  console.log(hidden[1])
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
    
  }
}

function getMultipass(product) {
  var url = "/";
  var select = document.getElementById("user_select");
  var id = select.options[select.selectedIndex].value;
  var paramsJSON = {
    "product" : product,
    "id" : id
  }
  var params = JSON.stringify(paramsJSON) 
  
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(this.responseText);
      window.open(res.url, '_blank');
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(params);
}