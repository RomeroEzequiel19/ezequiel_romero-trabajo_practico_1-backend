const { sequelize, DataTypes } = require("../database");

const Proyecto = sequelize.define(
  "Proyecto",
  {
    proyecto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_proyecto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion_proyecto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_inicial: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    fecha_final: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    estado_proyecto: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    name: "proyectos",
  }
);

Proyecto.sync({ force: false }).then(() => {
  console.log("Tabla de Proyectos creada");
});

module.exports = Proyecto;
