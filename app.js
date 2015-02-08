var fs = require('fs');
var express = require('express');
var logger = require('morgan');
var async = require('async');
var ejs = require('ejs');
var socketio = require('socket.io);

// take a list of files from the command line.
// now we can watch three files using:
// node app.js file1.js file2.js file3.js
var filenames = Array.prototype.slice.call(process.argv, 2);
console.log(filenames);

// create the express app
var app = express();

// connect the Morgan logging middleware to our app
app.use( logger('dev') );
app.set('view engine', 'ejs');
// start a server listening on port 1234
var server = app.listen( 1234 );
var io = socketio.listen(server);

// when someone requests http://localhost:1234/, run the callback
// function listed here and respond with the data
// we call this the "/" (or "Root") route.

app.get("/", function(request, response) {
  var mapFilenamesToContent = function(item, callback) {
    // your code here, and in parameter list above
	var buf;
	fs.readFile(item, function(e, r) {
		buf = { id: item.replace(/[^0-9]/ig, ""),
		data: r.toString(), filename: item };
		callback(null, buf);
	});
  };

  async.map(filenames, mapFilenamesToContent, function (err, results) {
    if (err) console.log('async.map error:', err);
    // response.send( '<pre>' + results.join("\n\n") + '</pre>' );
    response.render('mainView', {files: results});
  }); 
});
