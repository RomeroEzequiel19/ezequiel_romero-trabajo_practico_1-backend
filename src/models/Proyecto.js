const { sequelize, DataTypes } = require("../database");
const Usuario = require("./Usuario");

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
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    fecha_final: {
      type: DataTypes.DATEONLY,
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
    timestamps: false,
  }
);

Usuario.hasMany(Proyecto, { foreignKey: "usuario_id", as: "proyectos" });
Proyecto.belongsTo(Usuario, { foreignKey: "usuario_id" });

Proyecto.sync();

module.exports = Proyecto;
