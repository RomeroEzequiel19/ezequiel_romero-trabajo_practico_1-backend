const Ctrl = {};
//Importo los modelos
const ModeloUsuario = require("../models/Usuario");
const ModeloProyecto = require("../models/Proyecto");
const ModeloTarea = require("../models/Tarea");

//Controlador para registrar un proyecto
Ctrl.registrarProyecto = async (req, res) => {
  const {
    nombre_proyecto,
    descripcion_proyecto,
    fecha_inicial,
    fecha_final,
    estado_proyecto,
  } = req.body;

  try {
    // Se verifica si el usuario ya existe
    const nuevoProyecto = await ModeloProyecto.create({
      nombre_proyecto,
      descripcion_proyecto,
      fecha_inicial,
      fecha_final,
      estado_proyecto,
      usuario_id: req.params.usuario_id,
    });
    return res.status(201).json(nuevoProyecto);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//Controlador para obtener todos los proyectos
Ctrl.obtenerProyectos = async (_req, res) => {
  try {
    const listaProyectos = await ModeloProyecto.findAll({
      include: {
        model: ModeloTarea,
        as: "tareas",
      },
    });
    return res.status(200).json(listaProyectos);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

//Controlador para obtener un usuario en específico
Ctrl.obtenerProyecto = async (req, res) => {
  try {
    const proyectoId = req.params.proyecto_id;
    const proyecto = await ModeloProyecto.findByPk(proyectoId, {
      include: {
        model: ModeloTarea,
        as: "tareas",
      },
    });
    return res.status(200).json(proyecto);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = Ctrl;
