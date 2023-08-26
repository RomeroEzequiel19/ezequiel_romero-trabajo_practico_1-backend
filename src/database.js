const { Sequelize, DataTypes } = require("sequelize");

// Se crea la instancia de la conexión a la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

// Se ejecuta la instancia de conexión a la base de datos
const conectarDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Base de Datos Conectada");
  } catch (error) {
    console.log("Error al conectar la base de datos: " + error);
  }
};

// Se exporta la conexión
module.exports = {
  sequelize,
  DataTypes,
  conectarDB,
};
