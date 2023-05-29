import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_ARTIST, CREATE_MERCH_ITEM } from '../utils/mutations';
import axios from 'axios';
import ImageUploadForm from '../components/ImageUploadForm';

const UploadForm = () => {
  const [modelType, setModelType] = useState('');
  const [formFields, setFormFields] = useState([]);

  const handleModelTypeChange = (e) => {
    setModelType(e.target.value);
    setFormFields([]); // Clear existing form fields when model type changes
  };

  const handleFormFieldChange = (field, value) => {
    setFormFields((prevFields) => {
      const updatedFields = [...prevFields];
      const fieldIndex = updatedFields.findIndex((f) => f.field === field);

      if (fieldIndex !== -1) {
        updatedFields[fieldIndex].value = value;
      } else {
        updatedFields.push({ field, value });
      }

      // Handle file inputs separately
      if (field === 'profilePhoto' || field === 'workImages') {
        const fileIndex = updatedFields.findIndex(
          (f) => f.field === field && f.value instanceof File
        );

        if (fileIndex !== -1) {
          updatedFields.splice(fileIndex, 1);
        }

        if (value instanceof File) {
          updatedFields.push({ field, value });
        }
      }

      return updatedFields;
    });
  };

  const [createArtist, { error: artistError }] = useMutation(CREATE_ARTIST);
  const [createMerch, { error: merchError }] = useMutation(CREATE_MERCH_ITEM);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const modelFields = formFields.reduce((fields, { field, value }) => {
      fields[field] = value;
      return fields;
    }, {});
  
    try {
      const formData = new FormData();
  
      if (modelFields.profilePhoto instanceof File) {
        formData.append('file', modelFields.profilePhoto);
      }
  
      const response = await axios.post(`/api/upload?model=${modelType}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log(response.data); // Log the response from Cloudinary API
  
      // Set the image path in the modelFields object
      if (modelType === 'artist') {
        modelFields.workImages = [response.data.result.path]; // Assuming workImages is an array
        modelFields.profilePhoto = response.data.result.path; // Set the profilePhoto field
      } else if (modelType === 'merch') {
        modelFields.photos = [response.data.result.path]; // Assuming photos is an array
      }
  
      if (modelType === 'artist') {
        const { data } = await createArtist({
          variables: { artistInput: modelFields },
        });
        console.log('Artist created successfully', data);
        // Handle successful artist creation
        // ...
      } else if (modelType === 'merch') {
        const { data } = await createMerch({
          variables: modelFields,
        });
        console.log('Merch created successfully', data);
        // Handle successful merch creation
        // ...
      }
  
      // Clear the form fields
      setModelType('');
      setFormFields([]);
    } catch (err) {
      console.error('Failed to create model', err);
      // Handle failed model creation
      // ...
    }
  };

  // Render the dynamic form fields based on the selected model type
  const renderFormFields = () => {
    switch (modelType) {
      case 'artist':
        return (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                onChange={(e) => handleFormFieldChange('name', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="twitter">Twitter:</label>
              <input
                type="text"
                id="twitter"
                onChange={(e) => handleFormFieldChange('twitter', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="instagram">Instagram:</label>
              <input
                type="text"
                id="instagram"
                onChange={(e) => handleFormFieldChange('instagram', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="facebook">Facebook:</label>
              <input
                type="text"
                id="facebook"
                onChange={(e) => handleFormFieldChange('facebook', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="website">Website:</label>
              <input
                type="text"
                id="website"
                onChange={(e) => handleFormFieldChange('website', e.target.value)}
              />
            </div>
            <ImageUploadForm
              label="Profile Photo"
              onFileChange={(file) => handleFormFieldChange('profilePhoto', file)}
            />
            <ImageUploadForm
              label="Work Images"
              onFileChange={(file) => handleFormFieldChange('workImages', file)}
              multiple
            />
            <div>
              <label htmlFor="bio">Bio:</label>
              <textarea
                id="bio"
                onChange={(e) => handleFormFieldChange('bio', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                onChange={(e) => handleFormFieldChange('location', e.target.value)}
              />
            </div>
          </>
        );
      case 'merch':
        return (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                onChange={(e) => handleFormFieldChange('name', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                onChange={(e) => handleFormFieldChange('description', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="price">Price:</label>
              <input
                type="number"
                id="price"
                onChange={(e) => handleFormFieldChange('price', parseFloat(e.target.value))}
              />
            </div>
            <ImageUploadForm
              label="Photos"
              onFileChange={(file) => handleFormFieldChange('photos', file)}
              multiple
            />
            <div>
              <label htmlFor="apparel">Apparel:</label>
              <input
                type="checkbox"
                id="apparel"
                onChange={(e) => handleFormFieldChange('apparel', e.target.checked)}
              />
            </div>
            <div>
              <label htmlFor="sizes">Sizes:</label>
              <input
                type="text"
                id="sizes"
                onChange={(e) => handleFormFieldChange('sizes', e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="colors">Colors:</label>
              <input
                type="text"
                id="colors"
                onChange={(e) => handleFormFieldChange('colors', e.target.value)}
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Model type selection */}
        <div>
          <div>
            <input
              type="radio"
              id="artist"
              name="modelType"
              value="artist"
              checked={modelType === 'artist'}
              onChange={handleModelTypeChange}
            />
            <label htmlFor="artist">Artist</label>
          </div>
          <div>
            <input
              type="radio"
              id="merch"
              name="modelType"
              value="merch"
              checked={modelType === 'merch'}
              onChange={handleModelTypeChange}
            />
            <label htmlFor="merch">Merch</label>
          </div>
        </div>
        {/* Render dynamic form fields */}
        {renderFormFields()}
        {/* Submit button */}
        <button type="submit">Upload {modelType}</button>
      </form>
    </div>
  );
};

export default UploadForm;
