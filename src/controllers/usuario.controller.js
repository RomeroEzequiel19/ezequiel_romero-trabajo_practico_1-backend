const ctrl = {};
const modeloUsuario = require("../models/usuario.model");
const bcrypt = require("bcrypt");

//Controlador para registrar un usuario
ctrl.registrarUsuario = async (req, res) => {
  const { nombre, apellido, dni, nombre_usuario, email, contrasenia } =
    req.body;

  try {
    // Se verifica si el usuario ya existe
    const existeUsuario = await modeloUsuario.findOne({
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

    const nuevoUsuario = await modeloUsuario.create({
      nombre,
      apellido,
      dni,
      nombre_usuario,
      email,
      contrasenia: await bcrypt.hash(contrasenia, await bcrypt.genSalt(10)),
    });
    return res.status(201).json(nuevoUsuario);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = ctrl;
