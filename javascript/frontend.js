// Populate customer selector
document.onload = getProducts();

function getProducts() {
  var url = "/products/music-channel-demo.myshopify.com"
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(this.responseText);
      console.log(res)
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}




// Click event handlers
document.addEventListener("click", clickFilter);

function clickFilter() {
  if (event.target.dataset.product){
    getMultipass(event.target.dataset.product);
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