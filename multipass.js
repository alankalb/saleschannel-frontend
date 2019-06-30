var Multipassify = require('multipassify');
const dotenv = require('dotenv');
dotenv.config();

var url = function(email, first_name, last_name, address, return_to) {
  var multipassify = new Multipassify(process.env.multipass_secret);
  var customerData = { 
    email: email,  
    first_name: first_name,
    last_name: last_name,
    addresses: [
      address
    ],
    return_to: return_to
  };
  var token = multipassify.encode(customerData);
  var url = multipassify.generateUrl(customerData, process.env.store_url);
  return url
}

module.exports = {
  url : url
}