const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 3000

router.get('/',function(req,res){
  res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.use('/', router);
app.listen(port, function(){
  console.log('Running at Port ' + port);
});

