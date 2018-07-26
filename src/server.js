/*  **********  REQUIREMENTS  **********  */
const express    = require('express');
const bodyParser = require('body-parser');
const config     = require('./config');
const path       = require('path');
const mongoose   = require('mongoose');
const logger     = require('morgan');

// Session handlers
const session    = require('express-session');
const MongoStore = require('connect-mongo')(session);

// Require models
require('./models/user.model');
require('./models/item.model');

// Routes
const router  = require('./routes');
const admin   = require('./routes/admin');
const login   = require('./routes/login');
const profile = require('./routes/profile');
const signup  = require('./routes/signup');

// Create application object
const app = express();

/*  **********  MIDDLEWARE  **********  */

// Better logging with morgan
app.use(logger("dev"));

// Connect to MongoDB and create/use database as configured
// mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);
let dbConn = mongoose.connection.openUri(`mongodb://${config.db.username}:${config.db.password}@${config.db.host}/${config.db.dbName}`);

// Session handler
app.use(session({
  secret: 'Allergies are terrible.',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: dbConn
  })
}));

// Make user id available to templates
app.use( (req, res, next) => {
  // res.locals.currentUser = '5b4febba4c76847cf44f5b6f';
  res.locals.currentUser = req.session.userId;
  console.log("in server: ", res.locals.currentUser);
  
  next();
});

// Body parser will parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Set publicPath to the public folder as the location of static files
const publicPath = path.resolve(__dirname, '../public');
app.use(express.static(publicPath));

// Set pug as the view engine
app.set('view engine', 'pug');

const viewPath = path.resolve(__dirname, '../views');
app.set('views', viewPath);

// Use new router.  Prepend /api to all paths defined in router.
app.use('/',        router);
app.use('/admin',   admin);
app.use('/login',   login);
app.use('/profile', profile);
app.use('/signup',  signup);


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
