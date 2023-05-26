const { Schema, model } = require('mongoose');

const artistSchema = new Schema({
  name: {
    type: String,
    required: false,
  },
  socialMedia: {
    type: Map,
    of: String,
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
