// Require modules
const express = require('express');
const config  = require('./config');
const path    = require('path');

// Create application object
const app = express();

// Add this bEfore any routes
const publicPath = path.resolve(__dirname, '../public');

// Express will use this handler for all incoming requests:
app.use(express.static(publicPath));

// This sets up a simple router: you'll go to localhost:3030/doc
app.use( '/blog', function(req, res, next) {
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

