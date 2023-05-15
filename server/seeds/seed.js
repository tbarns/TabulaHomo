const db = require('../config/connection');
const seedMerch = require('./merchSeed.js');
const { Merch } = require('../models');


db.once('open', async () => {
  await Merch.deleteMany({}); // Call deleteMany on Merch
  const seedData = await seedMerch(); // Call your seedMerch function
  await Merch.insertMany(seedData); // Call insertMany on Merch with the seedData

  console.log('all done!');
  process.exit(0);
});