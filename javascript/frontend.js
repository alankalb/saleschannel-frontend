// Populate customer selector
document.onload = getCustomer();

function getCustomer() {
  var url = "/users"
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      res = JSON.parse(this.responseText);
      customerSelector(res.customers);
    }
  };
  xhttp.open("GET", url);
  xhttp.send();
}

function customerSelector(customers) {
  var select = document.getElementById('user_select');
  customers.forEach(customer => {
    var opt = document.createElement('option');
    opt.appendChild( document.createTextNode('Name: ' +customer.first_name+' '+customer.last_name+' ID: '+customer.id) );
    opt.value = customer.id; 
    select.appendChild(opt); 
  });

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