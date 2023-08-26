const { sequelize, DataTypes } = require("../database");

const Tarea = sequelize.define(
  "Tarea",
  {
    tarea_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_tarea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    descripcion_tarea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complejidad_tarea: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_inializacon: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_finalizacion: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    estado_tarea: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    proyecto_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    name: "tareas",
  }
);

Tarea.sync({ force: false }).then(() => {
  console.log("Tabla de Tareas creada");
});

module.exports = Tarea;
