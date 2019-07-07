const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const dotenv = require('dotenv');

dotenv.config();

const port = parseInt(process.env.PORT, 10) || 3000

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
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

