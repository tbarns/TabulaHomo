const mongoose = require('mongoose');
const { Schema } = mongoose;

const merchSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  photos: String,
  apparel: Boolean,
  sizes: [String],
  colors: [String],
});

const Merch = mongoose.model('Merch', merchSchema);

module.exports = Merch;
