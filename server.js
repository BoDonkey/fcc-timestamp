'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    app = express(),
    chrono = require('chrono-node');
     
app.set('view engine', 'ejs');     
require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get("/", function (req, res) {
    res.sendfile('index.html');
});

app.get("/:timestamp", function (req, res){
    var theMonth = "";
    var theDay = "";
    var theYear = "";
    var theStamp = req.params.timestamp;
    var unixDate = 0;
    var naturalDate = 0;
    if (isNaN(theStamp)) {
        console.log("in is not a number");
        var textDate = chrono.parseDate(theStamp);
        if (textDate != null){
            console.log("the date is valid");
            textDate = (textDate).toString();
            unixDate = Date.parse(textDate);
            theMonth = textDate.substr(4, 3);
            theDay = textDate.substr(8, 2);
            theYear = textDate.substr(11, 4);
            naturalDate = (theMonth + " "+ theDay+ ", "+ theYear);
        } else {
            console.log("in garbage collection");
            naturalDate = null; 
            unixDate = null;
        }
    } else {
        console.log("in unix timestamp");
        unixDate = theStamp;
        var milli = theStamp*1000;
        var utonDate = new Date(milli);
       var utc = utonDate.toISOString();
        var subDate= utc.substr(0, 10);
        var conOne = chrono.parseDate(subDate);
        conOne = (conOne).toString();
        theMonth = conOne.substr(4, 3);
        theDay = conOne.substr(8, 2);
        theYear = conOne.substr(11, 4);
            naturalDate = (theMonth + " "+ theDay+ ", "+ theYear);
    }
    var finalDates = '{"unix":'+unixDate+', "natural":"'+naturalDate+'"}';
    console.log(finalDates);
    res.render('timestamp', {finalDates:finalDates});
});



var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');

});

