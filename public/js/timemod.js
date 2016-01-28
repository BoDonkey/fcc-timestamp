
   var convertstamp = function(req){
    var chrono = require('chrono-node');
    var theStamp = req.params;
    var theMonth = "";
    var theDay = "";
    var theYear = "";
    var unixDate = 0;
    var naturalDate = 0;
    if (isNaN(theStamp)) {
        theStamp = theStamp.toString();
        var textDate = chrono.parseDate(theStamp);
        if (textDate != null){
            textDate = (textDate).toString();
            unixDate = Date.parse(textDate);
            theMonth = textDate.substr(4, 3);
            theDay = textDate.substr(8, 2);
            theYear = textDate.substr(11, 4);
            var tempUnixDate = Date.parse(theMonth+" "+theDay+" "+theYear);
            unixDate = tempUnixDate/1000;
            naturalDate = (theMonth + " "+ theDay+ ", "+ theYear);
        } else {
            naturalDate = null; 
            unixDate = null;
        }
    } else {
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
    return finalDates;
    };
    module.exports.convertstamp = convertstamp;
   