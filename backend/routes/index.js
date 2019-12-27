var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;


/* GET home page. */
router.get('/', function(req, res, next) {
  var url = new URL('https://www.amazon.de/dp/B07SCX1JG4/ref=s9_acsd_hps_bw_c2_x_2_t?pf_rd_m=A3JWKAKR8XB7XF&pf_rd_s=merchandised-search-9&pf_rd_r=MXXG2RYEYW0JVYWT898E&pf_rd_t=101&pf_rd_p=d0f6b676-ae6c-49e8-a6d2-29a7e8d07f5d&pf_rd_i=4368994031');
  //var url = new URL('https://www.morele.net/dysk-ssd-crucial-bx500-480gb-sata3-ct480bx500ssd1-4141972/');
  console.log(url);
  console.log(url.host.includes("morele.net"));

  MongoClient.connect('mongodb://localhost:27017/price', function (err, client) {
    if (err) throw err

    var db = client.db('price')

    db.collection('prices').find().toArray(function (err, result) {
      if (err) throw err

      console.log(result)
    })
  })
  request(url.href, function (err, res, body) {
    if(err)
    {
        console.log(err, "error occured while hitting URL");
    }
    else
    {
      let $ = cheerio.load(body);
    
      let price = $('span#priceblock_ourprice').text();
      price = price.replace(/\./g, "");
      price = price.replace(/,/g, '.');
      console.log(parseFloat(price).toFixed(2));
    }
});
  res.send();
});

module.exports = router;
