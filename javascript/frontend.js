/*window.addEventListener('load', function() {
  
})*/
document.addEventListener("click", clickFilter);
/*
document.addEventListener('click', function (event) {
  if (event.target.classList.contains( 'product' )){
    getMultipass();
  }
}, false);
*/

function clickFilter() {
  if (event.target.dataset.product){
    getMultipass(event.target.dataset.product);
  }
}

function getMultipass(product) {
  var xhttp = new XMLHttpRequest();
  var query = "test=123"
  var url = "/?" + query;
  var params = JSON.stringify({ "product": product}) 
  console.log(params)
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(this.responseText);
      //window.open(res.url, '_blank');
      console.log(res)
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(params);
}