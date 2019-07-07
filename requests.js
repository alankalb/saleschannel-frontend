const https = require("https");

function product_listings(shop, token){
  return new Promise(function(resolve,reject){
    console.log(token)
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

module.exports = {
  product_listings: product_listings
}