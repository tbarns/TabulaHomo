import React, { useState, useContext } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ARTIST_BY_ID, UPDATE_ARTIST } from '../utils/mutations';
import axios from 'axios';
import Auth from '../utils/auth.js';
import './ArtistGallery.css'
const ArtistGallery = ({ artistId }) => {
    const { loading, error, data } = useQuery(GET_ARTIST_BY_ID, {
        variables: { artistId },
    });
    const [uploadedImage, setUploadedImage] = useState(null);
    const [newImage, setNewImage] = useState('');
    const [updateArtist] = useMutation(UPDATE_ARTIST);
    const isLoggedIn = Auth.loggedIn();

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
            updateArtist({
                variables: {
                    _id: artistId,
                    artistInput: { workImages: [...data.artist.workImages, imagePath] },
                },
            });

            setUploadedImage(null);
        } catch (error) {
            console.error('Failed to add image:', error);
        }
    };

    const handleDeleteImage = async (image) => {
        try {
            const updatedWorkImages = data.artist.workImages.filter((img) => img !== image);

            updateArtist({
                variables: { _id: artistId, artistInput: { workImages: updatedWorkImages } },
            });
        } catch (error) {
            console.error('Failed to delete image:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const { artist } = data;

    return (
        <div id='galleryContainer'>
             <h6 id="works" >Works by:</h6>

            <p id="name" style={{ fontFamily: 'Rampart One' }}>{artist.name}</p>
            <div id='gallery'>
                {artist.workImages.map((image, index) => (
                    <div key={index}>
                        <img id='singleImage' src={image} alt={`Work Image ${index + 1}`} />
                        {isLoggedIn && (
                            <button onClick={() => handleDeleteImage(image)}>Delete</button>
                        )}
                    </div>
                ))}
                <div>
                    <p id="copyright">
                        All artwork displayed in this gallery is the copyrighted work of {artist.name}.
                        Unauthorized duplication or infringement of these works is strictly prohibited.
                        The artist has granted permission to display their work in this gallery.
                    </p>
                </div>
            </div>
            {isLoggedIn && (
                <div>
                    <input
                        type="text"
                        placeholder="New Image URL"
                        disabled={uploadedImage !== null}
                    />
                    <label htmlFor="fileInput">Select File:</label>
                    <input type="file" id="fileInput" onChange={handleFileInputChange} />
                    <button onClick={handleAddImage} disabled={uploadedImage === null}>
                        Add Image
                    </button>

                </div>
            )}
        </div>
    );
};

export default ArtistGallery;
