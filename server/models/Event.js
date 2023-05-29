const { Schema, model } = require('mongoose');

const eventSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  models: String,
  theme: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  timeZone: {
    type: String,
    required: true,
  },
  description: String,
  price: String,
  modelPhotos: [
    {
      type: String,
      required: true,
    },
  ],
});

const Event = model('Event', eventSchema);

module.exports = Event;
