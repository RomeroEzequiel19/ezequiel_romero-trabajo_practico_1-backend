const { sequelize, DataTypes } = require("../database");
const Proyecto = require("./Proyecto");

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
    fecha_inicializacion: {
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
    timestamps: false,
  }
);

Proyecto.hasMany(Tarea, { foreignKey: "proyecto_id", as: "tareas" });
Tarea.belongsTo(Proyecto, { foreignKey: "proyecto_id" });

Tarea.sync();

module.exports = Tarea;
