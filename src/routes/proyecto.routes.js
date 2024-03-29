const router = require("express").Router();

//Importo las validaciones de los campos del proyecto y tambien para poder obtener dichas validaciones
const { validacionProyecto } = require("../middlewares/validaciones");
const { aplicarValidaciones } = require("../middlewares/aplicar.validaciones");

//Importo los controladores para los proyectos
const {
  registrarProyecto,
  obtenerProyectos,
  obtenerProyecto,
  modificarProyecto,
  eliminarProyecto,
} = require("../controllers/proyecto.controller");

//Ruta para crear un proyecto
router.post(
  "/api/proyecto/:usuario_id",
  validacionProyecto,
  aplicarValidaciones,
  registrarProyecto
);

//Ruta para obtener todos los proyectos
router.get("/api/proyecto", obtenerProyectos);

//Ruta para obtener un proyecto
router.get("/api/proyecto/:proyecto_id", obtenerProyecto);

//Ruta para modificar un proyecto
router.put("/api/proyecto/:proyecto_id", modificarProyecto);

//Ruta para eliminar lógicamente un proyecto
router.delete("/api/proyecto/:proyecto_id", eliminarProyecto);

module.exports = router;
