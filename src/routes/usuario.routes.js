const router = require("express").Router();

//Importo las validaciones de los campos del usuario y tambien para poder obtener dichas validaciones
const { validacionUsuario } = require("../middlewares/validaciones");
const { aplicarValidaciones } = require("../middlewares/aplicar.validaciones");

//Importo los controladores
const { registrarUsuario } = require("../controllers/usuario.controller");

//Ruta para crear un usuario
router.post(
  "/api/usuario",
  validacionUsuario,
  aplicarValidaciones,
  registrarUsuario
);

module.exports = router;
