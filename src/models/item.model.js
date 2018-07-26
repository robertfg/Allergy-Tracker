/*  **********  REQUIREMENTS  **********  */
const mongoose = require('mongoose');
const items    = require('../data/item.seed.json');


/*  **********  SCHEMA  **********  */

// Create a schema
const ItemSchema = new mongoose.Schema({
  item:   String,
  created_at: { type: Date, default: Date.now },
  deleted:    { type: Boolean, default: false }
});

const Item = mongoose.model("Item", ItemSchema);

// Seed data
Item.count( {}, (err, count) => {
  if (err) {
    throw err;
  }

  // If you have records, count will be 0, so go on; otherwise, exit.
  if (count > 0) return;

  // Get the data from file.seed.json
  Item.create(items, (err, newItems) => {
    if (err) {
      throw err;
    }
    console.log("DB seeded")
  });

});


/*  **********  EXPORTS **********  */
module.exports = Item;
