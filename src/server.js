// Require modules
const express = require('express');
const config  = require('./config');

// Create application object
const app = express();

// This sets up a simple router: you'll go to localhost:3030/doc
app.use( '/blog', function(req, res, next) {
  // Other: hit a database, get info. from weather api, generate a number, read a file
  res.end("This is my first blog post.");
});

// Tell it what to do:
app.use( function(req, res, next) {
  res.end("Hello Allergy Tracker!");
});

// Start the server
app.listen( config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}.`);
});

