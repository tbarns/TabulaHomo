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
      <h2>The Artists</h2>
      <div id='artistPage'>

        {artists.map((artist) => (
          <Link to={`/artist/${artist._id}`}>
            <div id="artistCard" key={artist._id}>
              <div className="artistImage">
                <img id="workImg" src={artist.workImages[2]} alt="artist work" />
                <div className="artistName">{artist.name}</div>
              </div>

              <div className="artistDetails">

                <div className="artistBioMain">{artist.bio}</div>
              </div>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
};

export default Artists;
