import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTISTS } from '../utils/mutations';
import './Artist.css'

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
        <div id = 'artistCard' key={artist._id}>
        <img id = 'workImg'  src={artist.workImages[2]} alt='artist work' />
        <div id = 'artistLink'>
          <Link to={`/artist/${artist._id}`}>{artist.name}</Link>
        </div>
        </div>
        ))}
      </div>
    );
  };
  
  export default Artists;
  