import React, { useState, useEffect } from "react";
import "./MyArts.css";

function MyArts() {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    console.log(image);
    const artworkId = image._id;
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
      const response = await fetch(`https://nosql-finalproject.onrender.com/artworks/delete/${selectedArtworkId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedImages = images.filter(image => image._id !== selectedArtworkId);
        setImages(updatedImages);
        setSelectedImage(null); 
        setSelectedArtworkId(null); 
      } else {
        console.error('Failed to delete artwork:', response.status);
      }
    } catch (error) {
      console.error('An error occurred during artwork deletion:', error);
    }
  };

  const downloadImage = async (imageUrl, imageName) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);

      const anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = imageName;

      anchor.click();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };


  useEffect(() => {
    const fetchUserArtworks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('https://nosql-finalproject.onrender.com/artworks/my-artworks', {
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
  }, []); 

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
            <button onClick={() => downloadImage(selectedImage.imageUrl, selectedImage.title)}>
              Download
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
