//Importo base de datos
const { sequelize, DataTypes } = require("../database");

//Defino el modelo del usuario
const Usuario = sequelize.define(
  "Usuario",
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dni: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nombre_usuario: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contrasenia: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado_usuario: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//Crea la tabla si no está creada
Usuario.sync();

//Exporto el modelo
module.exports = Usuario;
