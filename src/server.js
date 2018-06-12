/*  **********  REQUIREMENTS  **********  */
const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('./config');
const router     = require('./routes');
const path       = require('path');
// import express, { static } from "express";
// import { port, appName } from "./config";
// import { resolve } from "path";

// Create application object
const app = express();

// Add this before any routes
const publicPath = path.resolve(__dirname, '../public');

// Express will use this handler for all incoming requests:
app.use( express.static(publicPath) );

// Use new router.  Prepend /api to all paths defined in router.
app.use('/api', router);

// Start the server
app.listen( config.port, function() {
  console.log(`${config.appName} is listening on port ${config.port}.`);
});
