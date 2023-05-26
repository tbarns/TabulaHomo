const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('mongoose');

const mailchimp = require('@mailchimp/mailchimp_marketing');
mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us10', 
});

// Mailchimp health check
const checkMailchimpHealth = async () => {
  try {
    const response = await mailchimp.ping.get();
    console.log('Mailchimp health:', response);
  } catch (error) {
    console.error('Mailchimp health check failed:', error);
  }
};

checkMailchimpHealth();

const PORT = process.env.PORT || 4000;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
});

const connectToMongoDB = async () => {
  try {
    const uri =  process.env.YOUR_CONNECTION_STRING; 
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  connectToMongoDB();

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer();
