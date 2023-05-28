import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_EVENT, DELETE_USER, DELETE_ARTIST } from '../utils/mutations';

function DeleteButton({ eventId, artistId, userId }) {
  const [deleteEvent] = useMutation(DELETE_EVENT);
  const [deleteUser] = useMutation(DELETE_USER);
  const [deleteArtist] = useMutation(DELETE_ARTIST);

  const handleDelete = () => {
    if (eventId) {
      // Perform the delete event mutation
      deleteEvent({
        variables: {
          _id: eventId,
        },
      })
        .then(() => {
          // Handle success if needed
        })
        .catch((error) => {
          // Handle error if needed
        });
    } else if (userId) {
      // Perform the delete user mutation
      deleteUser({
        variables: {
          _id: userId,
        },
      })
        .then(() => {
          // Handle success if needed
        })
        .catch((error) => {
          // Handle error if needed
        });
    } else if (artistId) {
      // Perform the delete artist mutation
      deleteArtist({
        variables: {
          _id: artistId,
        },
      })
        .then(() => {
          // Handle success if needed
        })
        .catch((error) => {
          // Handle error if needed
        });
    }
  };

  return (
    <button className="delete-button" onClick={handleDelete}>Delete</button>
  );
}

export default DeleteButton;
