const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    age: String
    height: String
    weight: String
    isAdmin: Boolean
  }

  type Event {
    _id: ID
    title: String
    models: [String]
    theme: String
    startTime: String
    timeZone: String
    description: String
    images: [String]
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    Users: [User]
    user: User
    me: User
    events: [Event]
    event(_id: ID!): Event
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    deleteUser(username: String!): User
    updateUser(height: String!, weight: String!, age: String!): User
    createEvent(title: String!, models: [String], theme: String!, startTime: String!, timeZone: String!, description: String, images: [String]): Event
    updateEvent(_id: ID!, title: String, models: [String], theme: String, startTime: String, timeZone: String, description: String, images: [String]): Event
    deleteEvent(_id: ID!): Event
    adminLogin(username: String!, password: String!): Auth
  }

`;

module.exports = typeDefs;
