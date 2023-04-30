const db = require('../config/connection');
const { User } = require('../models');
const userData = require('./userData.json');


db.once('open', async () => {

  await User.deleteMany({});
  

  // bulk create each model
  const users = await User.insertMany(userData);
 

  console.log('all done!');
  process.exit(0);
});
