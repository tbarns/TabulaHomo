const Event = require('../models/Event');
const moment = require('moment');

const themes = ['Theme 1', 'Theme 2', 'Theme 3', 'Theme 4', 'Theme 5'];
const timeZone = 'America/Los_Angeles';

const events = [];

for (let i = 1; i <= 20; i++) {
  const duration = Math.floor(Math.random() * (180 - 60 + 1)) + 60;
  const startTime = moment()
    .add(i * 2, 'days')
    .add(Math.floor(Math.random() * 24), 'hours')
    .toISOString();

  const event = {
    title: `Event ${i}`,
    theme: themes[Math.floor(Math.random() * themes.length)],
    startTime: startTime,
    timeZone: timeZone,
    description: `Description for Event ${i}`,
    
  };

  events.push(event);
}

const eventSeed = async () => {
  await Event.deleteMany({});
  await Event.insertMany(events);
};

module.exports = eventSeed;
