import React, { useState } from "react";
import axios from "axios";

const ImageUpload = ({ setImgSRC }) => {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image); // Agrega la imagen al FormData

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImgSRC(response.data.imageUrl); // Setea la URL de la imagen recibida
      setLoading(false);
      alert("Imagen subida correctamente");
    } catch (error) {
      console.error("Error al subir la imagen: ", error);
      setLoading(false);
    }
  };

  return (
    <div className="image-upload">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Subir imagen</label>
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Cargando..." : "Subir Imagen"}
        </button>
      </form>
    </div>
  );
};

export default ImageUpload;
