console.log("hello");

var fs = require('fs'),
// eyes = require('eyes'),
    util = require('util'),
    xml2js = require('xml2js')
 Db = require('mongodb').Db;
//var Connection = require('mongodb').Connection;
 Server = require('mongodb').Server;


var server = new Server('ds049538.mongolab.com', 49538, {auto_reconnect : true});
var db = new Db('node-mongo-employee', server, {safe: true});


db.open(function(err, client) {
    client.authenticate('dhagan', 'dhagan', function(err, success) {
        if(err) {
            throw new Exception();
        }
    });
});

var parser = new xml2js.Parser();

function getCollection() = function(callback) {
    this.db.collection('employees', function(error, employee_collection) {
        if( error ) callback(error);
        else callback(null, employee_collection);
    });
};

/**
 * result['gpx']['trk'][0]['trkseg'][0]['trkpt']
 * [ { '$': { lat: '37.811279296875', lon: '-122.442924499512' },
    time: [ '2010-01-30T18:04:52Z' ] },
 */
parser.on('end', function (result) {
    //eyes.inspect(result);
    //console.log(util.inspect(result));
    //var trk = result['gpx']['trk'];
    //console.log(result['gpx']['trk'][0]['trkseg'][0]['trkpt']);
    var trkpts = result['gpx']['trk'][0]['trkseg'][0]['trkpt'];
    for ( var i = 0; i < trkpts.length; i++ ) {
        var trkpt = trkpts[i];
        //console.log(trkpt['$']['lat'],trkpt['$']['lon'], trkpt['time'][0] );
        var trackpoint = {
            lat: trkpt['$']['lat'],
            lon: trkpt['$']['lon'],
            timestamp: trkpt['time'][0],
            race: 1,
            hull: 'Greenie',
            speed: Math.random(),
            heading: (Math.random() * 360)%360
        }
    }
});

fs.readFile(__dirname + '/eight_ball.gpx', function (err, data) {
    var xmlDoc = parser.parseString(data);
});

fs.writeFile('message.txt', 'Hello Node', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});

