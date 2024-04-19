import React, { useState, useEffect } from "react";
import Carousel from "../components/Carousel";

function Artworks() {
  const [artworkImages, setArtworkImages] = useState([]);

  useEffect(() => {
    // Fetch 10 random artworks from the server
    const fetchRandomArtworks = async () => {
      try {
        const response = await fetch('https://nosql-finalproject.onrender.com/artworks/random');
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
  }, []);

  return (
    <div>
      <Carousel images={artworkImages} />
    </div>
  );
}

export default Artworks;
