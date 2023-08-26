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
      type: DataTypes.NUMBER,
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
    timestamps: true,
    name: "usuarios",
  }
);

Usuario.sync({ force: false }).then(() => {
  console.log("Tabla de usuarios creada");
});

module.exports = Usuario;
