const router = require("express").Router();

//Importo las validaciones de los campos del usuario y tambien para poder obtener dichas validaciones
const { validacionUsuario } = require("../middlewares/validaciones");
const { aplicarValidaciones } = require("../middlewares/aplicar.validaciones");

//Importo los controladores
const {
  registrarUsuario,
  obtenerUsuarios,
  obtenerUsuario,
} = require("../controllers/usuario.controller");

//Ruta para crear un usuario
router.post(
  "/api/usuario",
  validacionUsuario,
  aplicarValidaciones,
  registrarUsuario
);

//Ruta para obtener todos los usuarios
router.get("/api/usuario", obtenerUsuarios);

//Ruta para obtener un usuario
router.get("/api/usuario/:usuario_id", obtenerUsuario);

module.exports = router;
