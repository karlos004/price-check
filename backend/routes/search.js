var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

/* GET users listing. */
router.get('/', async function(req, res, next) {
  var search = req.query.search;
  console.log(search);
  let final = [];
  const client = await MongoClient.connect('mongodb://localhost:27017/prices')
  var db = client.db('prices')
  var query = { name : new RegExp('.*'+ search + '.*', ["i"])};
  console.log(query);
  var morele = await db.collection("morele").find(query).toArray();
  console.log(final)
  var xkom = await db.collection("xkom").find(query).toArray();
  final = final.concat(morele, xkom);
        //  db.collection("amazon").find(query).toArray(function(err, result) {
        //     if (err) throw err;
        //     console.log(result)
        //     final.concat(result);
        // });
  console.log(final)
  res.send(final);
});

module.exports = router;
