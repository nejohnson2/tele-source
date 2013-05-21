/*
	restToSerial.js
	a node.js app to read take requests and send as serial data
	requires:
		* node.js (http://nodejs.org/)
		* express.js (http://expressjs.com/)
		* socket.io (http://socket.io/#how-to-use)
		* serialport.js (https://github.com/voodootikigod/node-serialport)
		
	based on the core examples for socket.io and serialport.js
		
	created 5 Nov 2012
	modified 11 Nov 2012
	by Tom Igoe
	
*/
var sys = require('sys')
var exec = require('child_process').exec;

var serialport = require("serialport"),				// include the serialport library
	SerialPort  = serialport.SerialPort,			// make a local instance of serial
	express = require('express'),					// make an instance of express
	app = express(),								// start Express framework
  	server = require('http').createServer(app);		// start an HTTP server
 
var portName = process.argv[2];						// third word of the command line should be serial port name
console.log("opening serial port: " + portName);	// print out the port you're listening on

server.listen(8080);								// listen for incoming requests on the server

console.log("Listening for new clients on port 8080");

// configure server to serve static files from /js and /css:
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));

// respond to web GET requests with the index.html page:
app.get('/', function (request, response) {
  console.log("print '/'");
  response.sendfile(__dirname + '/index.html');
});

// open the serial port. Change the name to the name of your port, just like in Processing and Arduino:
var myPort = new SerialPort(portName, { 
	// look for return and newline at the end of each data packet:
	parser: serialport.parsers.readline("\r\n") 
});
  
/*
// take anything that begins with /output:
app.get('/output', function (request, response) {

  var sendOn = '1';
  console.log("received "+sendOn);

  // send it out the serial port:
  myPort.write(sendOn);
  // send an HTTP header to the client:
  response.writeHead(200, {'Content-Type': 'text/html'});
  // send the data and close the connection:
  response.end(sendOn);

});  
*/

app.get('/text', function(request, response) {
 	console.log("this is /text");

	var sendOn = '1';
	console.log("received "+sendOn);

	myPort.write(sendOn);
	/*response.writeHead(200, {'Content-Type': 'text/html'});
	response.end(sendOn);*/

	console.log(request.query.message);
    var message = request.query.message;
	var command = "echo tmsis | sudo ./OpenBTSCLI | grep -v TMSI | awk '{print $2}' | grep -v '^$' | grep -E \"[0-9]+\"";

	var child = exec(command, function(error, stdout, stderr) {
	
		if (error != null) {
			console.log('exec error: ' + error);
		}
	
		var list = stdout.split('\n')

		for(var i=0; i<list.length-1; i++){
			if(list[i] != ''){
				var newCommand = "echo sendsms " + list[i] + " 0 " + message + " | sudo ./OpenBTSCLI";
				
				console.log(newCommand);
				
				var newChild = exec(newCommand, function(error, stdout,stderr) {
					if(error != null) {
						console.log('New Child exec error: ' + error);
					}					
				});
			}
		}
	});

	response.send("success");

});

app.get('/numbers', function(request, response) {
	var command = "echo tmsis | sudo ./OpenBTSCLI | grep -v TMSI | awk '{print $2}' | grep -v '^$' | grep -E \"[0-9]+\"";
	console.log(command);
	
 	var child = exec(command, function(error, stdout, stderr){
		console.log("IMSI NUMBERS");
		response.send(stdout);
	});
});
