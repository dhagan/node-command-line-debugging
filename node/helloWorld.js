console.log("hello");

var fs = require('fs'),
  // eyes = require('eyes'),
   util = require('util'),
    xml2js = require('xml2js');

var parser = new xml2js.Parser();

parser.on('end', function(result) {
  //eyes.inspect(result);
  console.log(util.inspect(result));
});

fs.readFile(__dirname + '/foo.xml', function(err, data) {
  parser.parseString(data);
});

fs.writeFile('message.txt', 'Hello Node', function (err) {
  if (err) throw err;
  console.log('It\'s saved!');
});

