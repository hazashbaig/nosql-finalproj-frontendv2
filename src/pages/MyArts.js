import React, { useState } from "react";
import art1 from "../static/art1.jpg";
import art2 from "../static/art2.jpg";
import art3 from "../static/art3.jpg";
import art4 from "../static//art4.jpg";
import art5 from "../static//art5.jpg";
import art6 from "../static//art6.jpg";
import "./MyArts.css";

function MyArts() {
  const images = [art1, art2, art3, art4, art5, art6, art1, art2, art3, art4, art5, art6, art1, art2, art3, art4, art5, art6,];

  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleBack = () => {
    setSelectedImage(null);
  };

  return (
    <div className="art-showcase-container">
      {selectedImage ? (
        <div className="selected-image-container">
          <img src={selectedImage} alt="Selected Art" />
          <button className="back-btn" onClick={handleBack}>Back</button>
        </div>
      ) : (
        <div className="image-grid-container">
        <div className="image-grid">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
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
