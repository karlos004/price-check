var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;

/* GET users listing. */
router.get('/', function(req, res, next) {
  var id = req.query.id;
  var o_id = new ObjectId(id);
  console.log(id);
  MongoClient.connect('mongodb://localhost:27017/prices', function (err, client) {
            if (err) throw err
        
            var db = client.db('prices')
            var query = { _id: o_id };
            db.collection("morele").find(query).toArray(function(err, result) {
              if (err) throw err;
              console.log(result)
              var options = {
                uri: result[0].url,
                transform: function (body) {
                    return cheerio.load(body);
                }
              };
             
            rp(options)
                .then(function ($) {
                  // console.log($('div.swiper-slide').children('img').eq(5).attr("data-src"))
                  let img = $('div.swiper-slide').children('img').eq(5).attr("data-src");
                  console.log(img);
                  res.send({result: result[0], image: img})
                  })
                .catch(function (err) {
                    console.log("Error" + err)
                });

            });
          });
});

module.exports = router;
