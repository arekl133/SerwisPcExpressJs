var express = require('express');
var router = express.Router();
var fs = require('fs');


var results = "";

fs.readFile('json/plik.json', 'utf8', function (err, data) {
        if(err){
            throw err;
        }else {
            results = JSON.parse(data);
            //console.log(results)
        }
});

 

router.get('/', function(req, res, next) {
  res.render('uslugi_cennik', { 
        title: 'Services',
        plik: results,
      
    });
    
});
module.exports = router;