var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var search = req.query.search;
  console.log(search);
  MongoClient.connect('mongodb://localhost:27017/prices', function (err, client) {
            if (err) throw err
        
            var db = client.db('prices')
            var query = { name: new RegExp('.*' + search + ".*") };
            console.log(query);
            db.collection("amazon").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log(result)
              res.send(result);
          });
    });
});

module.exports = router;
