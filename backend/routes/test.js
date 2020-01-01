var express = require('express');
var router = express.Router();
var rp = require('request-promise');
var cheerio = require('cheerio');
var MongoClient = require('mongodb').MongoClient;

/* GET home page. */
router.get('/test', function(req, res, next) {
var options = {
    uri: 'https://www.morele.net/obudowa-msi-mag-vampiric-010m-5939372/',
    transform: function (body) {
        return cheerio.load(body);
    }
};

rp(options)
    .then(function ($) {
        let name = $('div.prod-info-inside > div.prod-name-wr.sm-desktop-hide > h1.prod-name').text();
        console.log(name);
        let price = $('div#product_price_brutto').text();
        console.log(price);
    })
    .catch(function (err) {
        console.log(err);
    });

  res.end();
});

module.exports = router;