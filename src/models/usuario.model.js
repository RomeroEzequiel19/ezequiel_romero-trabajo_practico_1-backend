const { sequelize, DataTypes } = require("../database");

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
  },
  {
    timestamps: false,
    name: "usuarios",
  }
);

Usuario.sync();

const Proyecto = require("./proyecto.model");

Usuario.hasMany(Proyecto, { foreignKey: "usuario_id", as: "proyectos" });
Proyecto.belongsTo(Usuario, { foreignKey: "usuario_id" });

module.exports = Usuario;
