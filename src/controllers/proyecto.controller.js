const Ctrl = {};
//Importo los modelos
const ModeloUsuario = require("../models/Usuario");
const ModeloProyecto = require("../models/Proyecto");
const ModeloTarea = require("../models/Tarea");

//Controlador para registrar un proyecto
Ctrl.registrarProyecto = async (req, res) => {
  //Requiero los datos necesarios
  const {
    nombre_proyecto,
    descripcion_proyecto,
    fecha_inicial,
    fecha_final,
    estado_proyecto,
  } = req.body;

  try {
    // Se crea el proyecto
    const nuevoProyecto = await ModeloProyecto.create({
      nombre_proyecto,
      descripcion_proyecto,
      fecha_inicial,
      fecha_final,
      estado_proyecto,
      usuario_id: req.params.usuario_id,
    });

    //En caso de que no se puede crear el proyecto
    if (!nuevoProyecto) {
      throw {
        status: 400,
        message: "No se pudo crear el proyecto",
      };
    }

    //Retorno el nuevo proyecto
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
    //Busca todos los proyectos junto a sus tareas relacionadas
    const listaProyectos = await ModeloProyecto.findAll({
      where: {
        estado_proyecto: true,
      },
      include: {
        model: ModeloTarea,
        as: "tareas",
      },
    });

    //Si no se encuenta los proyectos
    if (!listaProyectos) {
      return res.status(200).json({ message: "No se encuentran proyectos" });
    }

    //Retorna los proyectos
    return res.status(200).json(listaProyectos);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

//Controlador para obtener un proyecto en específico
Ctrl.obtenerProyecto = async (req, res) => {
  try {
    const proyectoId = req.params.proyecto_id;

    //Busca el proyecto miestras esté en estado true
    const proyecto = await ModeloProyecto.findByPk(proyectoId, {
      where: {
        estado_proyecto: true,
      },
      include: {
        model: ModeloTarea,
        as: "tareas",
      },
    });

    //Si no se encuentra el proyecto
    if (!proyecto) {
      throw {
        status: 400,
        message: "El proyecto no existe",
      };
    }

    return res.status(200).json(proyecto);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

// Controlador para actualizar un proyecto
Ctrl.modificarProyecto = async (req, res) => {
  //Requiero el id del proyecto
  const { proyecto_id } = req.params;

  //Requiero los datos
  const { nombre_proyecto, descripcion_proyecto, fecha_inicial, fecha_final } =
    req.body;

  try {
    const proyecto = await ModeloProyecto.findByPk(req.params.proyecto_id);

    //Si no se encuentra el proyecto
    if (!proyecto) {
      throw {
        status: 400,
        message: "El no se encuentra el proyecto",
      };
    }

    //Actualizo el proyecto
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

    //Si no se pudo actualizar el proyecto
    if (!proyectoActualizado) {
      throw {
        status: 400,
        message: "No se pudo actualizar la proyecto",
      };
    }

    //Retorna mensaje de actualizacion exitosa
    return res.status(200).json({ message: "Proyecto actualizado" });
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "Error interno del servidor");
  }
};

// Controlador para realizar un borrado lógico un proyecto
Ctrl.eliminarProyecto = async (req, res) => {
  //Solicito la clave primaria del proyecto a eliminar
  const { proyecto_id } = req.params;

  try {
    //Se elimina el proyecto lógicamente
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

    //Retorno el id eliminado y un mensaje
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
