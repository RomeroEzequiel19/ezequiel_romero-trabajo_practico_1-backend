const Ctrl = {};
//Importo los modelos
const ModeloUsuario = require("../models/Usuario");
const ModeloProyecto = require("../models/Proyecto");
const ModeloTarea = require("../models/Tarea");

//Importo dependencias para encriptar contraseña
const bcrypt = require("bcrypt");

//Controlador para registrar un usuario
Ctrl.registrarUsuario = async (req, res) => {
  //Solicito los datos
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

    //Si el usuario existe muestra el mensaje
    if (existeUsuario) {
      throw {
        status: 400,
        message: "El usuario ya existe",
      };
    }

    //Se registra el usuario
    const nuevoUsuario = await ModeloUsuario.create({
      nombre,
      apellido,
      dni,
      nombre_usuario,
      email,
      contrasenia: await bcrypt.hash(contrasenia, await bcrypt.genSalt(10)),
      estado_usuario,
    });

    //Muestra mensaje si ocurre error al crear el usuario
    if (!nuevoUsuario) {
      throw {
        message: "Error al crear el usuario",
      };
    }

    // Se retorna la respuesta al cliente
    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    //Retorna mensaje en caso de haber errores al crear
    return res.status(error.status || 500).json({
      message: error.message,
    });
  }
};

//Controlador para obtener todos los usuarios
Ctrl.obtenerUsuarios = async (_req, res) => {
  try {
    //Busca los usuarios justo a sus proyectos asignados
    const usuarios = await ModeloUsuario.findAll({
      where: {
        estado_usuario: true,
      },
      include: {
        model: ModeloProyecto,
        as: "proyectos",
      },
    });

    //Si no se encuentra a los usuarios
    if (!usuarios) {
      throw {
        status: 400,
        message: "No existen usuarios",
      };
    }

    //Retorna los usuarios encontrados
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
      where: {
        estado_usuario: true,
      },
      include: {
        model: ModeloProyecto,
        as: "proyectos",
      },
    });

    //Si no se encuentra el usuario
    if (!usuario) {
      throw {
        status: 400,
        message: "El usuario no existe",
      };
    }

    //Retorna el usuario encontrado
    return res.status(200).json(usuario);
  } catch (error) {
    return res.status(error.status || 500).json({ message: error.message });
  }
};

module.exports = Ctrl;
