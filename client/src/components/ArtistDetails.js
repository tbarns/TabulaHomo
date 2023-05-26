import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTIST_BY_ID } from '../utils/mutations';

const ArtistDetails = () => {
  const { artistId } = useParams();

  // Query the artist's data from the server
  const { loading, error, data } = useQuery(GET_ARTIST_BY_ID, {
    variables: { artistId },
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const artist = data.artist;

  return (
    <div>
      <h2>{artist.name}</h2>
      <p>Bio: {artist.bio}</p>
      <p>Location: {artist.location}</p>
      {/* Render additional artist details */}
    </div>
  );
};

export default ArtistDetails;
