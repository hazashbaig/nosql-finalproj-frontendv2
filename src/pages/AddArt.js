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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "my_preset"); // Replace with your Cloudinary upload preset

      const response = await fetch("https://api.cloudinary.com/v1_1/dhpvl0j6x/image/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormData((prevData) => ({
          ...prevData,
          imageUrl: data.secure_url,
        }));
      } else {
        console.error("Failed to upload image:", response.status);
      }
    } catch (error) {
      console.error("An error occurred during image upload:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("https://nosql-finalproject.onrender.com/artworks/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Artwork added successfully");
        navigate("/myArts");
      } else {
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

        <label htmlFor="image">Image:</label>
        <input
          type="file"
          id="image"
          name="image"
          accept="image/*"
          onChange={handleImageUpload}
          required
        />

        <button type="submit">Add Artwork</button>
      </form>
    </div>
  );
}

export default AddArt;
