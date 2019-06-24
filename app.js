const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var Multipassify = require('multipassify');

const port = parseInt(process.env.PORT, 10) || 3000

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/javascript/frontend.js',function(req,res){
  res.sendFile(path.join(__dirname + '/javascript/frontend.js'));
});

router.post('/',function(req,res){
  if (req.body.id){
    let customers = require('./data/customers.json');
    let user = customers.customers.filter(customer => customer.id == req.body.id)[0]

    let products = require('./data/products.json');
    let product = products.products.filter(product => product.id == req.body.product)[0]
    
    res.json({
      url: product.url, 
      address : user.default_address
    });
  }else{
    res.status(400).send('No Customer Login')
  }

});

app.use(express.json())
app.use('/', router);

app.listen(port, function(){
  console.log('Running at Port ' + port);
});

