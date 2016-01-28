'use strict';

var express = require('express'),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    app = express(),
    chrono = require('chrono-node'),
    timemod = require(__dirname+'/public/js/timemod.js');
     
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

app.get("/*", function (req, res){
  var finalDates = timemod.convertstamp(req);
  res.render('timestamp', {finalDates:finalDates});
});




var port = process.env.PORT || 8080;
app.listen(port,  function () {
	console.log('Node.js listening on port ' + port + '...');

});

