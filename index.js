import express from "express";
import cors from "cors";
import { pool } from "./config/db.mjs";  // Asegúrate de tener configurada tu base de datos correctamente

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3000;

app.get("/posts", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM posts");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los posts" });
  }
});

app.post("/posts", async (req, res) => {
  const { titulo, url, descripcion } = req.body;

  if (!titulo || !url || !descripcion) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const query = "INSERT INTO posts (titulo, img, descripcion, likes) VALUES ($1, $2, $3, 0) RETURNING *";
    const values = [titulo, url, descripcion];
    const { rows } = await pool.query(query, values);
    res.json(rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al insertar el post" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
