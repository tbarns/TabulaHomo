const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  twitter: {
    type: String,
    required: false,
  },
  instagram: {
    type: String,
    required: false,
  },
  facebook: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  profilePhoto: {
    type: String,
  },
  workImages: {
    type: [String],
  },
  bio: {
    type: String,
  },
  location: {
    type: String,
  },
});

const Artist = model('Artist', artistSchema);

module.exports = Artist;
