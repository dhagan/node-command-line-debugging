node-command-line-debugging
===========================

node javascript to parse xml and familiarize myself with node debugging


About the xml parser code

http://blog.nodejitsu.com/6-must-have-nodejs-modules
https://github.com/Leonidas-from-XIV/node-xml2js

From cygwin install xml2js

npm install xml2js

require(util);   // dependency I introduced
http://nodejs.org/api/util.html

https://npmjs.org/package/eyes


To run javascript from the command line
 node helloWorld.js

Debugging node
Debugging command line javascript using webstorm is a non starter, here are a couple of things I didn't try
  1) Write your javascript code directly inline server.js and then use the techniqes for server side debugging
	2) Try some of the links for unit test, or mocha
	3) Try the eclipse plugin
	
Node debug
http://nodejs.org/api/debugger.html

This was broken for me

Node-inspector
https://github.com/dannycoates/node-inspector

This works, debug in chrome like any html injected javascript

From cygwin!

$ npm install -g node-inspector
$ node-inspector &
$ node --debug-brk helloWorld.js // brk breaks on first line, per the example in the readme.

There is an order dependency, you must start node 
Then browse to 
http://127.0.0.1:8080/debug?port=5858


