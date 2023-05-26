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
    price: String
  }

  input SocialMediaInput {
    platform: String
    link: String
  }
  type SocialMedia {
  platform: String
  link: String
}

  type Artist {
    _id: ID!
    name: String
    socialMedia: [SocialMedia]
    profilePhoto: String
    workImages: [String]
    bio: String
    location: String
  }

  input CreateArtistInput {
    name: String
    socialMedia: [SocialMediaInput]
    profilePhoto: String
    workImages: [String]
    bio: String
    location: String
  }

  type SubscriptionResponse {
    success: Boolean!
    message: String!
  }

  type Auth {
    token: ID
    user: User
  }

  type Query {
    user: User
    events: [Event]
    event(_id: ID!): Event
    merchItems: [Merch]
    merchItem(_id: ID!): Merch
    Users: [User]
    getUser: User
    artist(_id: ID!): Artist
    artists: [Artist]
  }

  type Mutation {
    addUser(username: String!, email: String!, password: String!, isAdmin: Boolean!): Auth
    login(username: String!, password: String!): Auth
    deleteUser(username: String!): User
    updateUser(height: String!, weight: String!, age: String!): User
    createEvent(title: String!, models: String, theme: String!, startTime: String!, timeZone: String!, description: String, price: String): Event
    updateEvent(_id: ID!, title: String, models: String, theme: String, startTime: String, timeZone: String, description: String): Event
    deleteEvent(_id: ID!): Event
    adminLogin(username: String!, password: String!): Auth
    createMerchItem(name: String!, description: String, price: Float!, image: String): Merch
    updateMerchItem(_id: ID!, name: String, description: String, price: Float, image: String): Merch
    deleteMerchItem(_id: ID!): Merch
    subscribeEmail(email: String!): SubscriptionResponse!
    createArtist(input: CreateArtistInput): Artist
    updateArtist(_id: ID!, input: CreateArtistInput): Artist
    deleteArtist(_id: ID!): Artist
  }
`;

module.exports = typeDefs;
