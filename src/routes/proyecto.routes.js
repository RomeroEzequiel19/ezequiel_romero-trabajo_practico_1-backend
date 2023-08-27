const router = require("express").Router();

//Importo las validaciones de los campos del proyecto y tambien para poder obtener dichas validaciones
const { validacionProyecto } = require("../middlewares/validaciones");
const { aplicarValidaciones } = require("../middlewares/aplicar.validaciones");

//Importo los controladores para los proyectos
const { registrarProyecto } = require("../controllers/proyecto.controller");

//Ruta para crear un proyecto
router.post(
  "/api/proyecto/:usuario_id",
  validacionProyecto,
  aplicarValidaciones,
  registrarProyecto
);

module.exports = router;
