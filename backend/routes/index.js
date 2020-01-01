var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/geturl', function(req, res, next) {
  var url = new URL(req.query.url);

  if(url.host.includes("morele.net")){

  }else if(url.host.includes("amazon.de")){
    MongoClient.connect('mongodb://localhost:27017/prices', function (err, client) {
    if (err) throw err

    var db = client.db('prices')
    var query = { url: req.query.url };
    //console.log(query)
    db.collection("amazon").find(query).toArray(function(err, result) {
      if (err) throw err;
      if(result.length == 0){
        var options = {
          uri: req.query.url,
          transform: function (body) {
              return cheerio.load(body);
          }
        };
       
      rp(options)
          .then(function ($) {
            let price = $('span#priceblock_ourprice').text();
            console.log(typeof price);
            console.log(price+ " -price");
            if(price == ""){
              price = $('span#priceblock_ourprice').text();
              console.log(price);
            }
            price = price.replace(/\./g, "");
            price = price.replace(/,/g, '.');
            price = parseFloat(price).toFixed(2);
            let name = $('span#productTitle').text();
            name = name.trim();
            myobj = { name: name, url: req.query.url, price: [{value: price, date: Date(Date.now())}] };
            MongoClient.connect('mongodb://localhost:27017/prices', function (err, client) {
            var db = client.db('prices');
            db.collection("amazon").insertOne(myobj, function (err, result) {
              if (err)
                throw err;
              res.send({ status: "new", data: result.ops[0]});
              console.log("1 document inserted");
              });
            });
            })
          .catch(function (err) {
              console.log("Error" + err)
          });
        }else{
          MongoClient.connect('mongodb://localhost:27017/prices', function (err, client) {
            if (err) throw err
        
            var db = client.db('prices')
            var query = { url: req.query.url };
            db.collection("amazon").find(query).toArray(function(err, result) {
              if (err) throw err;
              res.send({ status: "old", data: result[0]})
            });
          });
        }
    });
  });
  }
});

module.exports = router;
