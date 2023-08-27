const Ctrl = {};
//Importo los modelos
const ModeloUsuario = require("../models/Usuario");
const ModeloProyecto = require("../models/Proyecto");
const ModeloTarea = require("../models/Tarea");

//Controlador para registrar una tarea
Ctrl.registrarTarea = async (req, res) => {
  const {
    nombre_tarea,
    descripcion_tarea,
    complejidad_tarea,
    fecha_inicializacion,
    fecha_finalizacion,
    estado_tarea,
  } = req.body;

  try {
    const nuevaTarea = await ModeloTarea.create({
      nombre_tarea,
      descripcion_tarea,
      complejidad_tarea,
      fecha_inicializacion,
      fecha_finalizacion,
      estado_tarea,
      proyecto_id: req.params.proyecto_id,
    });
    return res.status(201).json(nuevaTarea);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = Ctrl;
