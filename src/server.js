/*  **********  REQUIREMENTS  **********  */
const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('./config');
const path       = require('path');
const mongoose   = require('mongoose');

require('./models/user.model');

// Routes
const router  = require('./routes');
const signup  = require('./routes/signup');
const profile = require('./routes/profile');
const admin   = require('./routes/admin');

// Create application object
const app = express();


/*  **********  MIDDLEWARE  **********  */

// Connect to MongoDB and create/use database as configured
mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// 2. Set publicPath to the public folder as the location of static files
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// 1. Body parser will parse JSON data
app.use(bodyParser.json());

// Set pug as the view engine
app.set('view engine', 'pug');

const viewPath = path.resolve(__dirname, '../views');
app.set('views', viewPath);

// Use new router.  Prepend /api to all paths defined in router.
app.use('/',        router);
app.use('/signup',  signup);
app.use('/profile', profile);
app.use('/admin',   admin);


/*  **********  BEGIN ERROR HANDLING  **********  */

// Request fell through the cracks: catch 404 and forward to error handler
app.use( (req, res, next) => {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

//  *****  ERROR HANDLER: define as the last app.use callback
app.use( (err, req, res, next) => {
  res.status(err.status || 500);

  // Render error page.
  res.render('error', {
    message: err.message,
    error: {}
  });
});


/*  **********  START SERVER  **********  */

// Start the server
app.listen( config.port, () => {
  console.log(`${config.appName} is listening on port ${config.port}.`);
});
