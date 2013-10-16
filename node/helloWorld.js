console.log("hello");

var fs = require('fs'),
// eyes = require('eyes'),
    util = require('util'),
    xml2js = require('xml2js')
 Db = require('mongodb').Db;
//var Connection = require('mongodb').Connection;
 Server = require('mongodb').Server;


var server = new Server('ds049538.mongolab.com', 49538, {safe: false}, {auto_reconnect : true});
var db = new Db('node-mongo-employee', server);


db.open(function(err, client) {
    client.authenticate('dhagan', 'dhagan', function(err, success) {
        if(err) {
            throw new Exception();
        }
    });
});

var parser = new xml2js.Parser();

var getCollection = function(callback) {
    db.collection('employees', function(error, employee_collection) {
        if( error ) callback(error);
        else callback(null, employee_collection);
    });
};

var logCallback = function(error, data) {
    if (error) {
        console.log(error , data);
    } else {
        //console.log(data);
    }
};

//save new employee
//EmployeeProvider.prototype.
var save = function(employees, callback) {
    getCollection(function(error, employee_collection) {
        if( error ) {
            console.log('save error');
            callback(error);
        }
        else {
            if( typeof(employees.length)=="undefined")
                employees = [employees];
            for( var i =0;i< employees.length;i++ ) {
                employee = employees[i];
                employee.created_at = new Date();
            }
            //console.log (employees);
            //console.log (employee_collection);
            try {
            employee_collection.insert(employees, function() {
                callback(null, employees);
            }); } catch(error) {
                console.log ("exception");
            }

            employee_collection.insert({hello: 'world'}, {w:1}, function(err, objects) {
                if (err) console.warn(err.message);
                if (err && err.message.indexOf('E11000 ') !== -1) {
                    // this _id was already inserted in the database
                }
            });

        }
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
        //console.log('calling save');
        save(trackpoint,
            logCallback);
         /*   function( error, docs) {
           console.log('save')
        });*/
    }
});

fs.readFile(__dirname + '/eight_ball.gpx', function (err, data) {
    var xmlDoc = parser.parseString(data);
});

fs.writeFile('message.txt', 'Hello Node', function (err) {
    if (err) throw err;
    console.log('It\'s saved!');
});

