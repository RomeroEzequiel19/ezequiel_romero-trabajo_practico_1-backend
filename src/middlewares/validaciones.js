//Importo la dependencia para validar
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
    .isBoolean()
    .withMessage("Debe ser un valor booleano"),
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
    .withMessage("La fecha inicial del proyecto debe estar en el futuro."),
  body("fecha_final")
    .notEmpty()
    .withMessage("Debe colocar una fecha final para el proyecto")
    .isAfter()
    .withMessage("La fecha final del proyecto debe estar en el futuro."),
  body("estado_proyecto")
    .notEmpty()
    .withMessage("Debe colocar el estado del proyecto")
    .isBoolean()
    .withMessage("Debe ser un valor booleano"),
];

//Validaciones para los campos al crear una nueva tarea
validacion.validacionTarea = [
  body("nombre_tarea")
    .notEmpty()
    .withMessage("Debe colocar un nombre para la tarea"),
  body("descripcion_tarea")
    .notEmpty()
    .withMessage("Debe colocar una descripcion para la tarea"),
  body("complejidad_tarea")
    .notEmpty()
    .withMessage("Debe colocar una complejidad para la tarea"),
  body("fecha_inicializacion")
    .notEmpty()
    .withMessage("Debe colocar una fecha inicial para la tarea")
    .isAfter()
    .withMessage("La fecha inicial de la tarea debe estar en el futuro."),
  body("fecha_finalizacion")
    .notEmpty()
    .withMessage("Debe colocar una fecha final para la tarea")
    .isAfter()
    .withMessage("La fecha final de la tarea debe estar en el futuro."),
  body("estado_tarea")
    .notEmpty()
    .withMessage("Debe colocar el estado de la tarea")
    .isBoolean()
    .withMessage("Debe ser un valor booleano"),
];

//Exporto la validacion
module.exports = validacion;
