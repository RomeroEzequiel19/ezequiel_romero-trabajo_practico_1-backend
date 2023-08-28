//Importo base de datos y modelo a relacionar
const { sequelize, DataTypes } = require("../database");
const Usuario = require("./Usuario");

//Defino el modelo del proyecto
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

//Realizo la relacion de uno a muchos de la tabla usuario a proyecto
Usuario.hasMany(Proyecto, { foreignKey: "usuario_id", as: "proyectos" });
Proyecto.belongsTo(Usuario, { foreignKey: "usuario_id" });

//Crea la tabla si no está creada
Proyecto.sync();

//Exporto el modulo
module.exports = Proyecto;
