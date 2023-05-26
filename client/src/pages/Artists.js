import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTISTS } from '../utils/mutations';
const Artists = () => {
    // Query the artists data from the server
    const { loading, error, data } = useQuery(GET_ARTISTS);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error.message}</div>;
    }
  
    const artists = data.artists;
  
    return (
      <div>
        <h2>Artists</h2>
      {artists.map((artist) => (
        <div key={artist._id}>
          <h3>{artist.name}</h3>
          <img src={artist.workImages[0]} alt={artist.name} />
          <Link to={`/artist/${artist._id}`}>View Details</Link>
        </div>
        ))}
      </div>
    );
  };
  
  export default Artists;
  