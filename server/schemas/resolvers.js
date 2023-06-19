const { User, Event, Merch, Artist } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
require('dotenv').config();
const listId ='ac42ab1a94'
const mailchimp = require('@mailchimp/mailchimp_marketing');

mailchimp.setConfig({
  apiKey: process.env.MAILCHIMP_API_KEY,
  server: 'us10',
});

const resolvers = {
  Query: {
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('-__v -password');
        return user;
      }
      // Instead of returning null, you can throw an error if the user is not logged in
      throw new AuthenticationError('Not logged in');
    },
    events: async () => {
      return await Event.find();
    },
    event: async (parent, { _id }) => {
      try {
        const event = await Event.findById(_id);
        return event;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch event');
      }
    },
    merchItems: async () => {
      return await Merch.find();
    },
    merchItem: async (parent, { _id }) => {
      return await Merch.findById(_id);
    },
    Users: async (parent, args, context) => {
      return await User.find();
    },
    getUser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).select('-__v -password');
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    artist: async (parent, { _id }) => {
      try {
        const artist = await Artist.findById(_id);
        return artist;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch artist');
      }
    },
    artists: async () => {
      return await Artist.find();
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return { token, user };
    },
    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const token = signToken(user);
      return { token, user: { ...user.toObject(), email: user.email } };
    },
    updateUser: async (parent, { height, weight, age }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { age, height, weight } },
          { new: true }
        );
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteUser: async (parent, { username }) => {
      const user = await User.findOneAndDelete({ username });
      return `We will miss you ${user.username}`;
    },
    createEvent: async (parent, args, context) => {
      if (context.user) {
        const event = await Event.create(args);
        return event;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateEvent: async (parent, { _id, eventInput }, context) => {
      if (context.user) {
        const updatedEvent = await Event.findByIdAndUpdate(_id, eventInput, { new: true });
        return updatedEvent;
      }
      throw new AuthenticationError('Not logged in');
    },
    deleteEvent: async (parent, { _id }, context) => {
      if (context.user) {
        const deletedEvent = await Event.findByIdAndDelete(_id);
        return deletedEvent;
      }
      throw new AuthenticationError('Not logged in');
    },
    adminLogin: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      if (!user.isAdmin) {
        throw new AuthenticationError('Unauthorized');
      }

      const token = signToken(user);
      return { token, user };
    },
    createMerchItem: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        const merchItem = await Merch.create(args);
        return merchItem;
      }
      throw new AuthenticationError('Not authorized');
    },
    updateMerchItem: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        const updatedMerchItem = await Merch.findByIdAndUpdate(args._id, { $set: args }, { new: true });
        return updatedMerchItem;
      }
      throw new AuthenticationError('Not authorized');
    },
    deleteMerchItem: async (parent, { _id }, context) => {
      if (context.user && context.user.isAdmin) {
        const deletedMerchItem = await Merch.findByIdAndDelete(_id);
        return deletedMerchItem;
      }
      throw new AuthenticationError('Not authorized');
    },
    createArtist: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        const artist = await Artist.create(args.input);
        return artist;
      }
      throw new AuthenticationError('Not authorized');
    },
    updateArtist: async (parent, args, context) => {
      if (context.user && context.user.isAdmin) {
        const updatedArtist = await Artist.findByIdAndUpdate(args._id, { $set: args.input }, { new: true });
        return updatedArtist;
      }
      throw new AuthenticationError('Not authorized');
    },
    deleteArtist: async (parent, { _id }, context) => {
      if (context.user && context.user.isAdmin) {
        const deletedArtist = await Artist.findByIdAndDelete(_id);
        return deletedArtist;
      }
      throw new AuthenticationError('Not authorized');
    },
    createEventPayment: async (parent, { eventId }, context) => {
      if (context.user) {
        try {
          // Fetch the event by ID
          const event = await Event.findById(eventId);

          if (!event) {
            throw new Error('Event not found');
          }

          // Call the PayPalClient to create the payment using the event price
          const payment = await PayPalClient.createPayment(event.price, 'USD');

          return payment;
        } catch (error) {
          console.error('Error creating event payment:', error);
          throw new Error('Failed to create event payment.');
        }
      } else {
        throw new AuthenticationError('Not logged in');
      }
    },
    subscribeEmail: async (parent, { email }) => {
      try {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: email,
          status: 'subscribed',
        });

        console.log('Mailchimp response:', response);

        // Check the response from Mailchimp and determine the success status
        const success = response.status === 'subscribed';

        // Return the result
        return {
          success,
          message: success ? 'Email subscribed successfully' : 'Email subscription failed',
        };
      } catch (error) {
        console.error('Error:', error);

        // Return the error result
        return {
          success: false,
          message: 'An error occurred while subscribing to the email',
        };
      }
    },
  },
};

module.exports = resolvers;
