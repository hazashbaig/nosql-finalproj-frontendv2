import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";

function Artworks() {
  const [artworkImages, setArtworkImages] = useState([]);

  useEffect(() => {
    // Fetch 10 random artworks from the server
    const fetchRandomArtworks = async () => {
      try {
        const response = await fetch('http://localhost:5000/artworks/random');
        if (response.ok) {
          const data = await response.json();
          // Extract image URLs from the response data
          const imageUrls = data.map(artwork => artwork.imageUrl);
          setArtworkImages(imageUrls);
        } else {
          console.error('Failed to fetch random artworks:', response.status);
        }
      } catch (error) {
        console.error('An error occurred during artwork fetching:', error);
      }
    };

    fetchRandomArtworks();
  }, []); // Run once when component mounts

  return (
    <div>
      <Carousel images={artworkImages} />
    </div>
  );
}

export default Artworks;
