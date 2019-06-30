document.addEventListener("click", clickFilter);

function clickFilter() {
  if (event.target.dataset.product){
    getMultipass(event.target.dataset.product);
  }
}

function getMultipass(product) {
  var url = "/";
  var urlParams = new URLSearchParams(window.location.search);
  var id = urlParams.get('userid');
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