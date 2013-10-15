console.log("hello");

var fs = require('fs'),
// eyes = require('eyes'),
    util = require('util'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();

parser.on('end', function (result) {
    //eyes.inspect(result);
    console.log(util.inspect(result));
    var trk = result['gpx']['trk'];
    console.log(result['gpx']['trk'][0]['trkseg'][0]['trkpt']);
});

fs.readFile(__dirname + '/eight_ball.gpx', function (err, data) {
    var xmlDoc = parser.parseString(data);
});

fs.writeFile('message.txt', 'Hello Node', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});

