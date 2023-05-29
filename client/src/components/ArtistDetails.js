import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_ARTIST_BY_ID } from '../utils/mutations';
import axios from 'axios';

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [workImages, setWorkImages] = useState([]);

  // Query the artist's data from the server
  const { loading, error, data } = useQuery(GET_ARTIST_BY_ID, {
    variables: { artistId },
  });

  useEffect(() => {
    if (data && data.artist) {
      const artist = data.artist;

      // Retrieve and set the profile photo
      if (artist.profilePhoto) {
        axios
          .get(artist.profilePhoto)
          .then((response) => {
            setProfilePhoto(response.data);
          })
          .catch((error) => {
            console.error('Failed to retrieve profile photo', error);
          });
      }

      // Retrieve and set the work images
      if (artist.workImages.length > 0) {
        const promises = artist.workImages.map((imagePath) =>
          axios
            .get(imagePath)
            .then((response) => response.data)
            .catch((error) => {
              console.error('Failed to retrieve work image', error);
              return null;
            })
        );

        Promise.all(promises)
          .then((images) => {
            setWorkImages(images.filter((image) => image !== null));
          });
      }
    }
  }, [data]);

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
      {profilePhoto && <img src={artist.profilePhoto} alt="Profile" />}
      {artist.workImages.map((image, index) => (
        <img key={index} src={image} alt={`Work ${index}`} />
      ))}
    </div>
  );
};

export default ArtistDetails;
