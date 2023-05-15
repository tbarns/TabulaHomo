const { User, Event, Merch } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');

        return userData;
      }

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
      return await User.find()

    },
    user: async (parent, args, context) => {
      return await User.findById(context.user._id)
        ;
    }

  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    login: async (parent, { username, password, isAdmin }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }

      if (isAdmin && user.email !== "tbarnaby1@gmail.com") {
        throw new AuthenticationError('Not authorized');
      }

      const token = signToken(user);
      return { token, user };
    },

    updateUser: async (parent, { height, weight, age }, context) => {
      if (context.user) {
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $set: { age: age, height: height, weight: weight } },
          { new: true })
        return user;
      }
    },

    deleteUser: async (parent, { username }) => {
      const user = await User.findOneAndDelete({ username: username });
      return (`We will miss you ${user}`);
    },

    createEvent: async (parent, args, context) => {
      if (context.user) {
        const event = await Event.create(args);
        return event;
      }
      throw new AuthenticationError('Not logged in');
    },
    updateEvent: async (parent, args, context) => {
      if (context.user) {
        const updatedEvent = await Event.findByIdAndUpdate(args._id, { $set: args }, { new: true });
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
  }
};

module.exports = resolvers;
