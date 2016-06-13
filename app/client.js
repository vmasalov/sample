#!/usr/bin/env node

/**
 * Module dependencies.
 */
var app = require('./server');
var debug = require('debug')('server');
var http = require('http');
var https = require('https');
var fs = require('fs');
var options = {
    key: fs.readFileSync(__dirname+'/certs/key.pem'),
    cert: fs.readFileSync(__dirname+'/certs/cert.pem')
};

/**
 * Create HTTP server.
 */
var normal_server = http.createServer(app).listen(8080);
var secure_server = https.createServer(options, app).listen(3000);

/**
 * Listen on provided port, on all network interfaces.
 */

normal_server.on('error', onError);
normal_server.on('listening', onListening);

secure_server.on('error', onError);
secure_server.on('listening', onListening);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error('port requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error('port is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = this.address();
  debug('Listening on port ' + addr.port);
}
