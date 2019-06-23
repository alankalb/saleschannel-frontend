window.addEventListener('load', function() {
  document.getElementById('test').addEventListener("click", myFunction)
})

function myFunction() {
  var xhttp = new XMLHttpRequest();
  var query = "test=123"
  var url = "/?" + query;
  var params = JSON.stringify({ "id": "54321"}) 
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      resJSON = JSON.parse(this.responseText);
      window.open(resJSON.url, '_blank');
      console.log(resJSON)
    }
  };
  xhttp.open("POST", url, true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.send(params);
}