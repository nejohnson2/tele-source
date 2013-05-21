restToSerial.js

This example allows you to send messages to an Arduino microcontroller
from a web page using a RESTian communications scheme. The server application
is written in node.js using the express.js web framework and node-serialport
for serial communications.  This application also executes commands in OpenBTSCLI
allowing the server to also send SMS messages to phone connected to the OpenBTS
network.


To use this, you should read up on <a href="nodejs.org">node.js</a>

To install it:
* make sure you've installed node.js
* either clone the project in git or download it
* from the command line,change directories to the directory where you downloaded the project

Enter the following:

	npm install 

You should end up with a new directory called node_modules, which will include socket.io, node-serialport, and express.js.

To run it, enter:

	node restToSerial.js portname
	
Where portname is the name of your serial port.

IMPORTANT

In order to run the node server and have OpenBTS execute commands, OpenBTSCLI must be located
in the folder of the server file.  There is a copy of OpenBTSCLI in this repository but I am
unsure if this will actually work. 
