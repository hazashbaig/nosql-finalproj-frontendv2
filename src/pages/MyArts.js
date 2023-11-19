import React, { useState, useEffect } from "react";
import "./MyArts.css";

function MyArts() {
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBack = () => {
    setSelectedImage(null);
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
          console.log(data);
          const imageUrls = data.map(item => item.imageUrl);
          setImageUrls(imageUrls);

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
          <img src={selectedImage} alt="Selected Art" />
          <button className="back-btn" onClick={handleBack}>
            Back
          </button>
        </div>
      ) : (
        <div className="image-grid-container">
          <div className="image-grid">
            {imageUrls.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Art ${index + 1}`}
                onClick={() => handleImageClick(imageUrl)}
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
