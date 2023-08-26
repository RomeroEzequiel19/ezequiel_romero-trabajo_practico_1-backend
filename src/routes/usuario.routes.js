const router = require("express").Router();

//Importo las validaciones de los campos del usuario y tambien para poder obtener dichas validaciones
const { validacionUsuario } = require("../middlewares/validaciones");
const { aplicarValidaciones } = require("../middlewares/aplicar.validaciones");

//Ruta para crear un usuario
router.post(
  "/api/usuario",
  validacionUsuario,
  aplicarValidaciones,
  (req, res) => {
    console.log("bien");
  }
);

module.exports = router;
