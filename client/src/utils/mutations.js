import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        email
      }
    }
  }
`;

export const GET_ARTISTS = gql`
  query GetArtists {
    artists {
      _id
      name
      twitter
      instagram
      facebook
      website
      profilePhoto
      workImages
      bio
      location
    }
  }
`;

export const GET_ARTIST_BY_ID = gql`
  query GetArtistByID($artistId: ID!) {
    artist(_id: $artistId) {
      _id
      name
      twitter
      instagram
      facebook
      website
      profilePhoto
      workImages
      bio
      location
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!, $isAdmin: Boolean!) {
    addUser(username: $username, email: $email, password: $password, isAdmin: $isAdmin) {
      token
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($username: String!) { 
    deleteUser(username: $username)
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($age: String!, $height: String!, $weight: String!) {
    updateUser(age: $age, height: $height, weight: $weight) {
      _id
      age
      height
      weight
    }
  }
`;

export const QUERY_EVENTS = gql`
  query QueryEvents {
    events {
      _id
      title
      startTime
      models
      timeZone
      description
      price
      ssId
    }
  }
`;

export const GET_EVENT = gql`
  query GetEvent($eventId: ID!) {
    event(_id: $eventId) {
      _id
      title
      models
      theme
      startTime
      timeZone
      description
      price
      modelPhotos
      ssId
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      username
      email
      age
      height
      weight
      isAdmin
    }
  }
`;

export const CREATE_EVENT = gql`
  mutation CreateEvent(
    $title: String!,
    $models: String,
    $theme: String!,
    $startTime: String!,
    $timeZone: String!,
    $description: String,
    $price: String
  ) {
    createEvent(
      title: $title,
      models: $models,
      theme: $theme,
      startTime: $startTime,
      timeZone: $timeZone,
      description: $description,
      price: $price
    ) {
      _id
      title
      models
      theme
      startTime
      timeZone
      description
      price
      ssId
    }
  }
`;

export const DELETE_EVENT = gql`
  mutation DeleteEvent($_id: ID!) {
    deleteEvent(_id: $_id) {
      _id
    }
  }
`;


export const UPDATE_EVENT = gql`
  mutation UpdateEvent($_id: ID!, $eventInput: UpdateEventInput!) {
    updateEvent(_id: $_id, eventInput: $eventInput) {
      _id
      title
      models
      startTime
      modelPhotos
      ssId
    }
  }
`;


export const CREATE_ARTIST = gql`
  mutation CreateArtist($artistInput: CreateArtistInput!) {
    createArtist(input: $artistInput) {
      _id
      name
      twitter
      instagram
      facebook
      website
      profilePhoto
      workImages
      bio
      location
    }
  }
`;

export const UPDATE_ARTIST = gql`
  mutation UpdateArtist($_id: ID!, $artistInput: CreateArtistInput!) {
    updateArtist(_id: $_id, input: $artistInput) {
      _id
      name
      twitter
      instagram
      facebook
      website
      profilePhoto
      workImages
      bio
      location
    }
  }
`;

export const DELETE_ARTIST = gql`
  mutation DeleteArtist($_id: ID!) {
    deleteArtist(_id: $_id) {
      _id
    }
  }
`;

export const CREATE_MERCH_ITEM = gql`
  mutation CreateMerchItem($name: String!, $description: String, $price: Float!, $image: String) {
    createMerchItem(name: $name, description: $description, price: $price, image: $image) {
      _id
      name
      description
      price
      image
    }
  }
`;


export const DELETE_MERCH_ITEM = gql`
  mutation DeleteMerchItem($_id: ID!) {
    deleteMerchItem(_id: $_id) {
      _id
    }
  }
`;

export const UPDATE_MERCH_ITEM = gql`
  mutation UpdateMerchItem($_id: ID!, $name: String, $description: String, $price: Float, $image: String) {
    updateMerchItem(_id: $_id, name: $name, description: $description, price: $price, image: $image) {
      _id
      name
      description
      price
      image
    }
  }
`;

export const CREATE_EVENT_PAYMENT = gql`
mutation CreateEventPayment($eventId: ID!) {
  createEventPayment(eventId: $eventId) {
    orderId
    approveUrl
  }
}
`;