import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_EVENT, UPDATE_ARTIST, GET_USER } from '../utils/mutations';

function UpdateButton({ eventId, artistId }) {
  const [updateEvent] = useMutation(UPDATE_EVENT);
  const [updateArtist] = useMutation(UPDATE_ARTIST);
  const { loading: userLoading, data: userData } = useQuery(GET_USER);
  const user = userData?.getUser;

  const handleUpdate = () => {
    if (eventId) {
      // Perform the update event mutation
      updateEvent({
        variables: {
          _id: eventId,
          // Add the fields you want to update for events
          // Example: title: 'New Title', models: 'New Models', startTime: 'New Start Time'
        },
      })
        .then(() => {
          // Handle success if needed
        })
        .catch((error) => {
          // Handle error if needed
        });
    } else if (artistId) {
      // Perform the update artist mutation
      updateArtist({
        variables: {
          _id: artistId,
          input: {
            // Add the fields you want to update for artists
            // Example: name: 'New Name', bio: 'New Bio', location: 'New Location'
          },
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

  console.log('User Loading:', userLoading);
  console.log('User Data:', userData);

  if (userLoading) {
    return <div>Loading user data...</div>;
  }

  if (!user) {
    return <div>User data not available.</div>;
  }

  console.log('User:', user);

  return (
    <div>
      {user.isAdmin && (
        <button className="update-button" onClick={handleUpdate}>
          Update
        </button>
      )}
    </div>
  );
}

export default UpdateButton;
