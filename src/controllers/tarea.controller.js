const Ctrl = {};
//Importo los modelos
const ModeloUsuario = require("../models/Usuario");
const ModeloProyecto = require("../models/Proyecto");
const ModeloTarea = require("../models/Tarea");

//Controlador para registrar una tarea
Ctrl.registrarTarea = async (req, res) => {
  //Requiero los datos
  const {
    nombre_tarea,
    descripcion_tarea,
    complejidad_tarea,
    fecha_inicializacion,
    fecha_finalizacion,
    estado_tarea,
  } = req.body;

  try {
    //Creo la tarea relacionándola con el proyecto
    const nuevaTarea = await ModeloTarea.create({
      nombre_tarea,
      descripcion_tarea,
      complejidad_tarea,
      fecha_inicializacion,
      fecha_finalizacion,
      estado_tarea,
      proyecto_id: req.params.proyecto_id,
    });

    //En caso de que no se puede crear la tarea
    if (!nuevaTarea) {
      throw {
        status: 400,
        message: "No se pudo crear la tarea",
      };
    }

    //Retorno la tarea creada
    return res.status(201).json(nuevaTarea);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//Controlador para obtener todas las tareas
Ctrl.obtenerTareas = async (_req, res) => {
  try {
    const listaTareas = await ModeloTarea.findAll();
    return res.status(200).json(listaTareas);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = Ctrl;
