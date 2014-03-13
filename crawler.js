var cheerio = require('cheerio');
var async = require('async');
var request = require('request');
var swig = require('swig');
var http = require('http');
var path = require('path');

//Crawling http://fightnights.com/upcoming-boxing-schedule
var baseUrl = "http://fightnights.com/upcoming-boxing-schedule";

var getAndCrawlLink = function(url, done) {
  var request_options = {uri: url, method: "GET"};
  var pageHtml = request(request_options, function(err, response, body) {
    if(err && response.statusCode !== 200) { console.log("Request Error: ", err); }

    $ = cheerio.load(body);
    var fightArray = [];
    $('span[itemprop="name"]').each(function(i, element) {
      var headline = $(this).text();
      // var fightList = headline.split('vs.');
      // console.log(fightList);
      fightArray.push(headline);
    });
    done(fightArray);
  });
};

exports.baseUrl = baseUrl;
exports.getAndCrawlLink = getAndCrawlLink;

// array was empty because getAndCrawlLink is an async function,
// you need to use a promise or a callback function to "slow it down".
// then, you export the function and base URL to your index.js(routes) file
// so that it is available to all pages
