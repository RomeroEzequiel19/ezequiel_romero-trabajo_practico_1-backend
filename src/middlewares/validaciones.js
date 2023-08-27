const { body } = require("express-validator");
const validacion = {};

//Validaciones para los campos al registrar un usuario nuevo
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

//Validaciones para los campos al crear un nuevo proyecto
validacion.validacionProyecto = [
  body("nombre_proyecto")
    .notEmpty()
    .withMessage("Debe colocar un nombre para el proyecto"),
  body("descripcion_proyecto")
    .notEmpty()
    .withMessage("Debe colocar una descripcion para el proyecto"),
  body("fecha_inicial")
    .notEmpty()
    .withMessage("Debe colocar una fecha inicial para el proyecto")
    .isAfter()
    .withMessage("La fecha final del proyecto debe estar en el futuro."),
  body("fecha_final")
    .notEmpty()
    .withMessage("Debe colocar una fecha final para el proyecto")
    .isAfter()
    .withMessage("La fecha final del proyecto debe estar en el futuro."),
  body("estado_proyecto")
    .notEmpty()
    .withMessage("Debe colocar el estado del proyecto")
    .isInt()
    .withMessage("Debe ser un número entero"),
];

module.exports = validacion;
