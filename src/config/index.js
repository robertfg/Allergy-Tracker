/*  **********  REQUIREMENTS  **********  */
require('dotenv').config();

// Export object with 2 keys (parameters):
module.exports = {
  appName: "Allergy Tracker",
  port: 2907,
  db: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    host:     process.env.DB_HOST,
    dbName:   process.env.DB_NAME
  }
}
