const db = require('./config/connection');
const { merchSeed, eventSeed } = require('./seeds');

async function seedDatabase() {
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.once('open', async () => {
    console.log('MongoDB connected!');

    try {
      await merchSeed();
      await eventSeed();
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    } finally {
      db.close();
    }
  });
}

seedDatabase();
