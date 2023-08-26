// Importaciones de librerías
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const path = require("path");
require("dotenv").config();

// Se inicializa express
const app = express();

// Asignando el puerto
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//Importo la conexion a la base de datos
const { conectarDB } = require("./database");
conectarDB();

// Configuración de rutas
app.use(require("./routes/usuario.routes"));
app.use(require("./routes/proyecto.routes"));
app.use(require("./routes/tarea.routes"));

// Servidor en escucha de peticiones
app.listen(port, console.log(`Servidor corriendo en http://localhost:${port}`));
