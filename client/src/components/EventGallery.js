import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_EVENT, UPDATE_EVENT } from '../utils/mutations';
import axios from 'axios';
import Auth from '../utils/auth.js';
import './EventGallery.css';

const EventGallery = ({ eventId, isLoggedIn }) => {
  const { loading, error, data, refetch } = useQuery(GET_EVENT, {
    variables: { eventId },
    fetchPolicy: 'network-only',
  });

  const [uploadedImage, setUploadedImage] = useState(null);
  const [newImage, setNewImage] = useState('');
  const [updateEvent] = useMutation(UPDATE_EVENT);

  const handleFileInputChange = (e) => {
    const file = e.target.files?.[0];
    setUploadedImage(file);
  };

  const handleAddImage = async () => {
    try {
      const formData = new FormData();
      formData.append('file', uploadedImage);

      const response = await axios.post('/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imagePath = response.data.result.path;

      updateEvent({
        variables: {
          _id: eventId,
          eventInput: {
            modelPhotos: [...(data?.event?.modelPhotos || []), imagePath],
          },
        },
      });

      setUploadedImage(null);
      setNewImage(imagePath); // Store the newly uploaded image in state
      await refetch(); // Fetch updated data
    } catch (error) {
      console.error('Failed to add image:', error);
    }
  };

  const handleDeleteImage = async (image) => {
    try {
      const updatedModelPhotos = data?.event?.modelPhotos?.filter(
        (photo) => photo !== image
      );

      updateEvent({
        variables: {
          _id: eventId,
          eventInput: { modelPhotos: updatedModelPhotos || [] },
        },
      });
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  console.log('Loading:', loading);
  console.log('Error:', error);
  console.log('Data:', data);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const { event } = data;

  return (
    <div id='galleryContainer'>
      <h2 id='title'>{event.title}</h2>
      <div id='gallery'>
        {event.modelPhotos?.map((photo, index) => (
          <div key={index}>
            <img
              id='singleImage'
              src={photo}
              alt={`Model Photo ${index + 1}`}
            />
            {isLoggedIn && (
              <button onClick={() => handleDeleteImage(photo)}>Delete</button>
            )}
          </div>
        ))}
        {newImage && (
          <div>
            <img
              id='singleImage'
              src={newImage}
              alt={`Model Photo ${event?.modelPhotos?.length + 1}`}
            />
            {isLoggedIn && (
              <button onClick={() => handleDeleteImage(newImage)}>Delete</button>
            )}
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div>
          <input
            type='file'
            id='fileInput'
            onChange={handleFileInputChange}
          />
          <button onClick={handleAddImage} disabled={uploadedImage === null}>
            Add Image
          </button>
        </div>
      )}
    </div>
  );
};

export default EventGallery;
