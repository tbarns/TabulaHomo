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
      socialMedia {
        platform
        link
      }
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
      socialMedia {
        platform
        link
      }
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
  mutation UpdateEvent($_id: ID!, $title: String, $models: String, $startTime: String) {
    updateEvent(_id: $_id, title: $title, models: $models, startTime: $startTime) {
      _id
      title
      models
      startTime
    }
  }
`;

export const CREATE_ARTIST = gql`
  mutation CreateArtist($artistInput: CreateArtistInput!) {
    createArtist(input: $artistInput) {
      _id
      name
      socialMedia {
        platform
        link
      }
      profilePhoto
      workImages
      bio
      location
    }
  }
`;
