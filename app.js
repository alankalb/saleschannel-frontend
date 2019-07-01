const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');
const multipass = require("./multipass.js")

//dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/users',function(req,res){
  let customers = require('./data/customers.json');
  res.json(customers)
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
    let url = multipass.url(user.email, user.first_name, user.last_name, user.default_address, product.url);
    res.json({
      url: url, 
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

