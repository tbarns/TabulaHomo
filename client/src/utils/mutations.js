import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;


export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
    }
  }
`

export const DELETE_USER = gql`
  mutation deleteUser($username: String!){ 
    deleteUser(username:$username)
}
`

export const UPDATE_USER = gql`
  mutation updateUser($age: String!, $height: String!, $weight: String!) {
    updateUser(age: $age, height: $height, weight: $weight) {
      _id
      age
      height
      weight
    }
  }
`
export const QUERY_EVENTS = gql`
  query Query {
    events {
      _id
      title
      startTime
    }
  }
`


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
    }
  }
`;




export const CREATE_EVENT = gql`
mutation CreateEvent($title: String!, $models: String, $theme: String!, $startTime: String!, $timeZone: String!, $description: String) {
  createEvent(title: $title, models: $models, theme: $theme, startTime: $startTime, timeZone: $timeZone, description: $description) {
    _id
    title
    models
    theme
    startTime
    timeZone
    description
  }
}
`;


