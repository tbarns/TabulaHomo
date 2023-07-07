import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ARTIST_BY_ID, DELETE_ARTIST } from '../utils/mutations';
import axios from 'axios';
import './ArtistDetails.css';
import ArtistGallery from './ArtistGallery';
import Auth from '../utils/auth';

const ArtistDetails = () => {
  const { artistId } = useParams();
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [deleteArtist] = useMutation(DELETE_ARTIST);
  const isLoggedIn = Auth.loggedIn();

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
    }
  }, [data]);

  const handleDeleteArtist = async () => {
    try {
      const response = await deleteArtist({ variables: { _id: artistId } });
      console.log('Artist deleted successfully:', response);
      alert('Artist deleted successfully');
    } catch (error) {
      console.error('Failed to delete artist:', error);
      alert('Failed to delete artist');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const artist = data.artist;

  return (
    <div id='artistDetailContainer'>
      {isLoggedIn && (
        <button id="deleteButton" onClick={handleDeleteArtist}>Delete Artist</button>
      )}
      <div id='ArtistMain'>
        {profilePhoto && <img id="artistProfilePhoto" src={artist.profilePhoto} alt="Profile" />}
        <div id='artistText'>
          <h1 id='artistName'>{artist.name}</h1>
          <p id='artistLocation'>📍 {artist.location}</p>
          <p id='artistBio'>{artist.bio}</p>
        </div>
      </div>
      <div id='artistLinksDiv'>
        <div id = 'connectDiv'>
        <p>Connect with {artist.name}:</p>
        </div>
        <div id='artistLinks'>
          {artist.twitter && <p id='twitter'>Twitter: {artist.twitter}</p>}
          {artist.instagram && <p>Instagram : {artist.instagram}</p>}
          {artist.facebook && <p>Facebook : {artist.facebook}</p>}
          {artist.website && <a id="website" href={artist.website.startsWith("http") ? artist.website : `https://${artist.website}`} target="_blank" rel="noopener noreferrer">{artist.website}</a>}
        </div>
      </div>
      <ArtistGallery artistId={artistId} />
    </div>
  );
};

export default ArtistDetails;
