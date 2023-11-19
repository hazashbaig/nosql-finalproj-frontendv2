import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddArt.css";

function AddArt() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add logic to send the form data to your API for adding artwork
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5000/artworks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful artwork addition, e.g., show a success message
        console.log("Artwork added successfully");
        navigate("/myArts"); // Navigate to the user's artwork page
      } else {
        // Handle errors, e.g., show an error message to the user
        console.error("Failed to add artwork:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during artwork addition:", error);
    }
  };

  return (
    <div className="add-art-container">
      <h2>Add New Artwork</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />

        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label htmlFor="imageUrl">Image URL:</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          required
        />

        <button type="submit">Add Artwork</button>
      </form>
    </div>
  );
}

export default AddArt;
