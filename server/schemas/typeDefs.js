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
  type EventPayment {
    orderId: String
    approveUrl: String
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
    modelPhotos: [String]
    ssId: String
  }

  input UpdateEventInput {
    title: String
    models: String
    theme: String
    startTime: String
    timeZone: String
    description: String
    price: String
    modelPhotos: [String]
    ssId: String
  }


  input CreateArtistInput {
    name: String
    twitter: String
    instagram: String
    facebook: String
    website: String
    profilePhoto: String
    workImages: [String]
    bio: String
    location: String
  }

  type Artist {
    _id: ID!
    name: String
    twitter: String
    instagram: String
    facebook: String
    website:String
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
    createEvent(title: String!, models: String, theme: String!, startTime: String!, timeZone: String!, description: String, price: String, ssId: String): Event
    updateEvent(_id: ID!, eventInput: UpdateEventInput): Event
    deleteEvent(_id: ID!): Event
    adminLogin(username: String!, password: String!): Auth
    createMerchItem(name: String!, description: String, price: Float!, image: String): Merch
    updateMerchItem(_id: ID!, name: String, description: String, price: Float, image: String): Merch
    deleteMerchItem(_id: ID!): Merch
    subscribeEmail(email: String!): SubscriptionResponse!
    createArtist(input: CreateArtistInput): Artist
    updateArtist(_id: ID!, input: CreateArtistInput): Artist
    deleteArtist(_id: ID!): Artist
    createEventPayment(eventId: ID!): EventPayment
  }
`;

module.exports = typeDefs;
