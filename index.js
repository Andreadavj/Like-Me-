import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const upload = multer({ dest: 'uploads/' });  // Define la carpeta de destino para las imágenes

// Ruta para manejar la carga de imágenes
app.post("/upload", upload.single("image"), (req, res) => {
  const imageUrl = `http://localhost:3000/uploads/${req.file.filename}`;
  res.json({ imageUrl });
});

// Inicia el servidor
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
