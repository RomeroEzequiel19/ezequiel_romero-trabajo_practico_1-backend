//Importo la dependencia para validar
const { validationResult } = require("express-validator");

//Verifica si hay errores en las validaciones
const aplicarValidaciones = (req, res, next) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(400).json(errores);
  }

  next();
};

//exporto la funcion
module.exports = { aplicarValidaciones };
