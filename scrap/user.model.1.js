/*  **********  REQUIREMENTS  **********  */
const mongoose = require('mongoose');
//const users    = require('../data/user.seed.json');
const bcrypt   = require('bcrypt');


/*  **********  SCHEMA  **********  */

// Create a schema
const UserSchema = new mongoose.Schema({
  userName:   String,
  firstName:  String,
  lastName:   String,
  email:      String,
  password:   String,
  created_at: { type: Date, default: Date.now },
  deleted:    { type: Boolean, default: false }
});

// Hash password before saving to database using mongoose's pre-save method "pre"
// UserSchema.pre('save', function(next) {
//   // this = object created containing user entered during sign-up, i.e., user object and data
//   let user = this;
//   bcrypt.hash(user.password, 10, (err, hash) => {
//     if (err) {
//       return next(err);
//     }

//     // Set the password to the hash and go to the next piece of middleware:
//     user.password = hash;
//     next();
//   });
// });

// Create User variable
const User = mongoose.model("User", UserSchema);

// Fake data
// User.count( {}, (err, count) => {
//   if (err) {
//     throw err;
//   }

//   // If you have records, count will be 0, so go on; otherwise, exit.
//   if (count > 0) return;

//   // Get the data from file.seed.json
//   User.create(users, (err, newUsers) => {
//     if (err) {
//       throw err;
//     }
//     console.log("DB seeded")
//   });

// });


/*  **********  EXPORTS **********  */
module.exports = User;
