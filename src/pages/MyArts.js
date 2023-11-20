import React, { useState, useEffect } from "react";
import "./MyArts.css";

function MyArts() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    console.log(image);
    const artworkId = image._id; // Extract artwork ID from the selected image URL
    setSelectedArtworkId(artworkId);
    console.log(selectedArtworkId);
  };

  const handleBack = () => {
    setSelectedImage(null);
    setSelectedArtworkId(null);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/artworks/delete/${selectedArtworkId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        // Remove the deleted artwork from the imageUrls state
        const updatedImages = images.filter(image => image._id !== selectedArtworkId);
        setImages(updatedImages);
        setSelectedImage(null); // Clear selected image after deletion
        setSelectedArtworkId(null); // Clear selected artwork ID after deletion
      } else {
        console.error('Failed to delete artwork:', response.status);
      }
    } catch (error) {
      console.error('An error occurred during artwork deletion:', error);
    }
  };

  useEffect(() => {
    // Fetch user's artworks from the server
    const fetchUserArtworks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/artworks/my-artworks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setImages(data);
          console.log(data);
        } else {
          console.error('Failed to fetch artworks:', response.status);
        }
      } catch (error) {
        console.error('An error occurred during artwork fetching:', error);
      }
    };

    fetchUserArtworks();
  }, []); // Run once when component mounts

  return (
    <div className="art-showcase-container">
      {selectedImage ? (
        <div className="selected-image-container">
          <div className="image-area">
            <div className="image">
              <img src={selectedImage.imageUrl} alt="Selected Art" />
            </div>
            <div className="about-image">
              <h4>{selectedImage.title}</h4>
              <p>{selectedImage.description}</p>
            </div>
          </div>
          <div className="button-container">
            <button className="back-btn" onClick={handleBack}>
              Back
            </button>
            <button className="delete-btn" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
        
      ) : (
        <div className="image-grid-container">
          <div className="image-grid">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt={`Art ${index + 1}`}
                onClick={() => handleImageClick(image)}
                className="grid-image"
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyArts;
