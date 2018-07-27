/*  **********  REQUIREMENTS  **********  */
const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('./config');
const router     = require('./routes');
const path       = require('path');
const mongoose   = require('mongoose');

require('./models/user.model.js');

// Create application object
const app = express();

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

/*  **********  USE STATEMENTS  **********  */
// Set publicPath to the public folder as the location of static files
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Body parser will parse JSON data
app.use(bodyParser.json());

// Use new router.  Prepend /api to all paths defined in router.
app.use('/api', router);

// Start the server
app.listen( config.port, () => {
  console.log(`${config.appName} is listening on port ${config.port}.`);
});
