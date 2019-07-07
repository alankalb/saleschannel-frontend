const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');
const https = require('https');

const db = require('./postgres.js');
const requests = require('./requests.js')

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 8080

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/product_listings/:shop', function(req,res){
  var accessToken = db.getToken(req.params.shop);
  accessToken.then(function(token){
    var body = requests.product_listings(req.params.shop, token); 
    body.then(function(products){
      res.send(products)
    });
  });

});

router.get('/javascript/frontend.js',function(req,res){
  res.sendFile(path.join(__dirname + '/javascript/frontend.js'));
});

router.post('/',function(req,res){
  res.status(200)
});

app.use(express.json())
app.use('/', router);

app.listen(port, function(){
  console.log('Running at Port ' + port);
});

