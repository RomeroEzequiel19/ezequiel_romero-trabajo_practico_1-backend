const Ctrl = {};
//Importo los modelos
const ModeloUsuario = require("../models/Usuario");
const ModeloProyecto = require("../models/Proyecto");
const ModeloTarea = require("../models/Tarea");

const bcrypt = require("bcrypt");

//Controlador para registrar un usuario
Ctrl.registrarUsuario = async (req, res) => {
  const {
    nombre,
    apellido,
    dni,
    nombre_usuario,
    email,
    contrasenia,
    estado_usuario,
  } = req.body;

  try {
    // Se verifica si el usuario ya existe
    const existeUsuario = await ModeloUsuario.findOne({
      where: {
        email,
      },
    });
    if (existeUsuario) {
      throw {
        status: 400,
        message: "El usuario ya existe",
      };
    }

    const nuevoUsuario = await ModeloUsuario.create({
      nombre,
      apellido,
      dni,
      nombre_usuario,
      email,
      contrasenia: await bcrypt.hash(contrasenia, await bcrypt.genSalt(10)),
      estado_usuario,
    });
    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

//Controlador para obtener todos los usuarios
Ctrl.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await ModeloUsuario.findAll({
      include: {
        model: ModeloProyecto,
        as: "proyectos",
      },
    });
    return res.status(200).json(usuarios);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

//Controlador para obtener un usuario en específico
Ctrl.obtenerUsuario = async (req, res) => {
  try {
    const usuarioId = req.params.usuario_id;
    const usuario = await ModeloUsuario.findByPk(usuarioId, {
      include: {
        model: ModeloProyecto,
        as: "proyectos",
      },
    });

    //Mensaje en caso de no encontrar al usuario
    if (!usuario) {
      return res.status(404).json({ message: "usuario no encontrado" });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = Ctrl;
