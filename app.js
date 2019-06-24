const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

const port = parseInt(process.env.PORT, 10) || 3000

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

router.get('/javascript/frontend.js',function(req,res){
  res.sendFile(path.join(__dirname + '/javascript/frontend.js'));
});

router.post('/',function(req,res){
  if (req.body.id){
    let customers = require('./customers/customers.json');
    let id = req.body.id;
    let user = customers.customers.filter(customer => customer.id == id)[0]
    res.json({
      url: 'http://alankalb.myshopify.com', 
      query: req.query.test, 
      product: req.body.product,
      customer : user
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

