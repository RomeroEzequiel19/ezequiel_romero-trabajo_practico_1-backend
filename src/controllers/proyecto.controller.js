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

//Controlador para obtener un proyecto en específico
Ctrl.obtenerProyecto = async (req, res) => {
  try {
    const proyectoId = req.params.proyecto_id;
    const proyecto = await ModeloProyecto.findByPk(proyectoId, {
      include: {
        model: ModeloTarea,
        as: "tareas",
      },
    });

    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    return res.status(200).json(proyecto);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

// Controlador para actualizar un proyecto
Ctrl.modificarProyecto = async (req, res) => {
  const { proyecto_id } = req.params;
  const { nombre_proyecto, descripcion_proyecto, fecha_inicial, fecha_final } =
    req.body;

  try {
    const proyecto = await ModeloProyecto.findByPk(req.params.proyecto_id);
    //Verificamos si existe el proyecto
    if (!proyecto) {
      return res.status(404).json({ message: "Proyecto no encontrado" });
    }

    const proyectoActualizado = await ModeloProyecto.update(
      {
        nombre_proyecto,
        descripcion_proyecto,
        fecha_inicial,
        fecha_final,
      },
      {
        where: {
          proyecto_id,
        },
      }
    );

    if (!proyectoActualizado) {
      throw {
        status: 400,
        message: "No se pudo actualizar la proyecto",
      };
    }

    return res.status(200).json({ message: "Proyecto actualizado" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

// Controlador para realizar un borrado lógico un proyecto
Ctrl.eliminarProyecto = async (req, res) => {
  const { proyecto_id } = req.params;

  try {
    const proyectoEliminado = await ModeloProyecto.update(
      {
        estado_proyecto: false,
      },
      {
        where: {
          proyecto_id,
          estado_proyecto: true,
        },
      }
    );

    return res.json({
      proyectoEliminado,
      message: "Proyecto eliminado correctamente",
    });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

module.exports = Ctrl;
