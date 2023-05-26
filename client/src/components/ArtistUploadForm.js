import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ARTIST } from '../utils/mutations';

const ArtistUploadForm = () => {
  const [name, setName] = useState('');
  const [socialMedia, setSocialMedia] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState('');
  const [workImages, setWorkImages] = useState([]);
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');

  const handleSocialMediaChange = (index, field, value) => {
    setSocialMedia((prevSocialMedia) => {
      const updatedSocialMedia = [...prevSocialMedia];
      updatedSocialMedia[index] = {
        ...updatedSocialMedia[index],
        [field]: value,
      };
      return updatedSocialMedia;
    });
  };

  const handleAddSocialMedia = () => {
    setSocialMedia((prevSocialMedia) => [
      ...prevSocialMedia,
      { platform: '', link: '' },
    ]);
  };

  const handleRemoveSocialMedia = (index) => {
    setSocialMedia((prevSocialMedia) => {
      const updatedSocialMedia = [...prevSocialMedia];
      updatedSocialMedia.splice(index, 1);
      return updatedSocialMedia;
    });
  };

  const [createArtist, { error }] = useMutation(CREATE_ARTIST);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const artist = {
      name,
      socialMedia,
      profilePhoto,
      workImages,
      bio,
      location,
    };

    try {
      const { data } = await createArtist({
        variables: { artistInput: artist },
      });
      console.log('Artist created successfully', data);
      // Handle successful artist creation
      // ...
      // Clear the input fields
      setName('');
      setSocialMedia([]);
      setProfilePhoto('');
      setWorkImages([]);
      setBio('');
      setLocation('');
    } catch (err) {
      console.error('Failed to create artist', err);
      // Handle failed artist creation
      // ...
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        {/* Social Media */}
        <div>
          <label>Social Media:</label>
          {socialMedia.map((sm, index) => (
            <div key={index}>
              <input
                type="text"
                value={sm.platform}
                onChange={(e) =>
                  handleSocialMediaChange(index, 'platform', e.target.value)
                }
                placeholder="Platform"
              />
              <input
                type="text"
                value={sm.link}
                onChange={(e) =>
                  handleSocialMediaChange(index, 'link', e.target.value)
                }
                placeholder="Link"
              />
              <button onClick={() => handleRemoveSocialMedia(index)}>
                Remove
              </button>
            </div>
          ))}
          <button onClick={handleAddSocialMedia}>Add Social Media</button>
        </div>
        {/* Profile Photo */}
        <div>
          <label htmlFor="profilePhoto">Profile Photo:</label>
          <input
            type="text"
            id="profilePhoto"
            value={profilePhoto}
            onChange={(e) => setProfilePhoto(e.target.value)}
          />
        </div>
        {/* Work Images */}
        <div>
          <label htmlFor="workImages">Work Images:</label>
          <input
            type="text"
            id="workImages"
            value={workImages}
            onChange={(e) => setWorkImages(e.target.value.split(','))}
          />
        </div>
        {/* Bio */}
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          />
        </div>
        {/* Location */}
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {/* Submit button */}
        <button type="submit">Upload Artist</button>
      </form>
    </div>
  );
};

export default ArtistUploadForm;
