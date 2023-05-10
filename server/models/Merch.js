const { Schema, model } = require('mongoose');

const merchSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  image: String,
});

const Merch = model('Merch', merchSchema);

module.exports = Merch;
