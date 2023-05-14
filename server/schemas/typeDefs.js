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
  type Merch {
  _id: ID
  name: String
  description: String
  price: Float
  image: String
}

  type Event {
    _id: ID
    title: String
    models: String
    theme: String
    startTime: String
    timeZone: String
    description: String
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
    merchItems: [Merch]
    merchItem(_id: ID!): Merch
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth
    login(username: String!, password: String!): Auth
    deleteUser(username: String!): User
    updateUser(height: String!, weight: String!, age: String!): User
    createEvent(title: String!, models: String, theme: String!, startTime: String!, timeZone: String!, description: String): Event
    updateEvent(_id: ID!, title: String, models: String, theme: String, startTime: String, timeZone: String, description: String,): Event
    deleteEvent(_id: ID!): Event
    adminLogin(username: String!, password: String!): Auth
    createMerchItem(name: String!, description: String, price: Float!, image: String): Merch
    updateMerchItem(_id: ID!, name: String, description: String, price: Float, image: String): Merch
    deleteMerchItem(_id: ID!): Merch
  }

`;

module.exports = typeDefs;
