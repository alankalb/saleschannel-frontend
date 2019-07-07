const https = require("https");

function product_listings(shop, token){
  return new Promise(function(resolve,reject){
    const options ={
      hostname: shop,
      path: '/admin/api/2019-04/product_listings.json', 
      method: 'GET',
      headers: {
        'X-Shopify-Access-Token': token
      }
    }
    const req =  https.request(options, (res) => {
      res.setEncoding("utf8");
      let body = "";
      res.on('data', (d) => {
        body += d;
        
      });
      res.on("end", () => {
        body = JSON.parse(body);
        resolve(body);
      });
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    req.end();
  })
};

function getCheckout(shop, token, variant){
  return new Promise(function(resolve,reject){
    const data = JSON.stringify({
      checkout: {
        line_items: [
          {
            variant_id: variant,
            quantity: 1
          }
        ]
      }
    })

    const options ={
      hostname: shop,
      path: '/admin/api/2019-04/checkouts.json', 
      method: 'POST',
      headers: {
        'X-Shopify-Access-Token': token,
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    }
    const req =  https.request(options, (res) => {
      
      res.setEncoding("utf8");
      let body = "";
      res.on('data', function (d) {
        body += d;
      });
      res.on("end", () =>{
        body = JSON.parse(body);
        resolve(body.checkout.web_url);
      })
      
    });
    
    req.on('error', (e) => {
      console.error(e);
    });
    req.write(data);
    req.end();
  })
};

module.exports = {
  product_listings: product_listings,
  getCheckout: getCheckout
}