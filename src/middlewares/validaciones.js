const { body } = require("express-validator");
const validacion = {};

validacion.validacionUsuario = [
  body("nombre").notEmpty().withMessage("Debe colocar un nombre"),
  body("apellido").notEmpty().withMessage("Debe colocar un apellido"),
  body("dni")
    .notEmpty()
    .withMessage("Debe colocar su DNI")
    .isInt()
    .withMessage("El DNI debe ser numérico entero")
    .isLength({ min: 7 })
    .withMessage("El DNI debe ser de al menos 7 digitos")
    .isLength({ max: 9 })
    .withMessage("El DNI supera el límite de dígitos"),
  body("nombre_usuario")
    .notEmpty()
    .withMessage("Debe colocar un nombre de Usuario"),
  body("email")
    .notEmpty()
    .withMessage("Debe colocar un email")
    .isEmail()
    .withMessage("El email debe ser válido"),
  body("contrasenia")
    .notEmpty()
    .withMessage("Debe colocar una contraseña")
    .isLength({ min: 8 })
    .withMessage("Debe tener al menos 8 caracteres"),
  body("estado_usuario")
    .notEmpty()
    .withMessage("Debe colocar el estado del usuario")
    .isLength({ min: 1 })
    .withMessage("Debe tener al menos 8 caracteres"),
];

module.exports = validacion;
