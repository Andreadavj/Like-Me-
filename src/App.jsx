import axios from "axios";
import { useEffect, useState } from "react";
import Form from "./components/Form";
import Post from "./components/Post";

const urlBaseServer = "http://localhost:3000";

function App() {
  const [titulo, setTitulo] = useState("");
  const [imgSrc, setImgSRC] = useState(""); // Para almacenar la URL de la imagen
  const [descripcion, setDescripcion] = useState("");
  const [posts, setPosts] = useState([]);

  const getPosts = async () => {
    const { data: posts } = await axios.get(urlBaseServer + "/posts");
    setPosts([...posts]);
  };

  const agregarPost = async () => {
    const post = { titulo, url: imgSrc, descripcion };
    await axios.post(urlBaseServer + "/posts", post); // Enviar post al backend
    getPosts();
  };

  // Este método se utilizará para manejar "likes"
  const like = async (id) => {
    await axios.put(urlBaseServer + `/posts/like/${id}`);
    getPosts();
  };

  // Este método se utilizará para eliminar posts
  const eliminarPost = async (id) => {
    await axios.delete(urlBaseServer + `/posts/${id}`);
    getPosts();
  };

  // Para manejar el cambio de la imagen seleccionada
  const handleImageChange = (e) => {
    const file = e.target.files[0]; // Obtener el archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSRC(reader.result); // Guardar la URL de la imagen en el estado
      };
      reader.readAsDataURL(file); // Leer el archivo como URL
    }
  };

  useEffect(() => {
    getPosts(); // Obtener los posts al cargar el componente
  }, []);

  return (
    <div className="App">
      <h2 className="py-5 text-center">&#128248; Like Me &#128248;</h2>
      <div className="row m-auto px-5">
        <div className="col-12 col-sm-4">
          <Form
            setTitulo={setTitulo}
            setImgSRC={setImgSRC}
            setDescripcion={setDescripcion}
            agregarPost={agregarPost}
          />
          {/* Aquí se agrega el input para la carga de la imagen */}
          <div className="mb-3">
            <label htmlFor="image" className="form-label">
              Subir Imagen
            </label>
            <input
              type="file"
              id="image"
              className="form-control"
              onChange={handleImageChange}
            />
            {imgSrc && <img src={imgSrc} alt="Vista previa" className="mt-3" style={{ maxWidth: "100%" }} />}
          </div>
        </div>
        <div className="col-12 col-sm-8 px-5 row posts align-items-start">
          {posts.map((post, i) => (
            <Post
              key={i}
              post={post}
              like={like}
              eliminarPost={eliminarPost}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
