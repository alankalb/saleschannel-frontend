const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = parseInt(process.env.PORT, 10) || 3000

router.get('/',function(req,res){
  res.send('<p>some html</p>')
  //__dirname : It will resolve to your project folder.
});
/*
router.get('/about',function(req,res){
  res.sendFile(path.join(__dirname+'/about.html'));
});

router.get('/sitemap',function(req,res){
  res.sendFile(path.join(__dirname+'/sitemap.html'));
});
*/
//add the router
app.use('/', router);
app.listen(port);

console.log('Running at Port 3000');