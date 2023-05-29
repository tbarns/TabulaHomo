const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

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
    const uri = process.env.YOUR_CONNECTION_STRING;
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
  }
};

// Configure cloudinary settings
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Create a new CloudinaryStorage instance to store uploaded files on Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    allowed_formats: [
      'jpeg',
      'png',
      'gif',
      'bmp',
      'tiff',
      'webp',
      'svg+xml',
      'vnd.microsoft.icon',
      'vnd.wap.wbmp',
      'x-icon',
      'x-jng',
      'x-ms-bmp',
      'x-portable-anymap',
    ],
    transformation: [{ width: 500, height: 500, crop: 'limit' }],
  },
});

// Create a new multer instance to handle file uploads
const upload = multer({ storage: storage }).single('file');

// Add the upload route handler for Cloudinary
app.post('/api/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      res.status(500).json({ success: false, error: 'File upload failed' });
    } else {
      // File uploaded successfully
      res.json({ success: true, result: req.file });
    }
  });
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app });

  connectToMongoDB();

  if (process.env.NODE_ENV === 'production') {
    // Serve static files from the React client
    app.use(express.static(path.join(__dirname, '../client/build')));
  }

  // All other routes will be handled by the React client
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build/index.html'));
  });

  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startApolloServer();
