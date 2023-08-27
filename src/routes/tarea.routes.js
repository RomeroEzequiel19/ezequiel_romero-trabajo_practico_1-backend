const router = require("express").Router();

//Importo las validaciones de los campos del usuario y tambien para poder obtener dichas validaciones
const { validacionTarea } = require("../middlewares/validaciones");
const { aplicarValidaciones } = require("../middlewares/aplicar.validaciones");

//Importo los controladores
const {
  registrarTarea,
  obtenerTareas,
} = require("../controllers/tarea.controller");

//Ruta para crear una tarea
router.post(
  "/api/tarea/:proyecto_id",
  validacionTarea,
  aplicarValidaciones,
  registrarTarea
);

//Ruta para obtener todas las tareas
router.get("/api/tarea", obtenerTareas);

module.exports = router;
