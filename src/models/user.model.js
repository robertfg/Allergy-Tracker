/*  **********  REQUIREMENTS  **********  */
const mongoose = require('mongoose');
const users    = require('./user.seed.json');
  
// Create a schema
const userSchema = new mongoose.Schema({
  firstName:  String,
  lastName:   String,
  email:      String,
  created_at: { type: Date, default: Date.now },
  deleted:    { type: Boolean, default: false }
});

const User = mongoose.model("User", userSchema);

// Fake data
User.count( {}, (err, count) => {
  if (err) {
    throw err;
  }

  // If you have records, count will be 0, so go on; otherwise, exit.
  if (count > 0) return;

  // Get the data from file.seed.json
  User.create(users, (err, newUsers) => {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });

});

/*  **********  EXPORTS **********  */
module.exports = User;
