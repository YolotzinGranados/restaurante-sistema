const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Empleado = sequelize.define('Empleado', {
  id_empleado: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_usuario: { type: DataTypes.INTEGER, unique: true, allowNull: true },
  nombre: { type: DataTypes.STRING(100), allowNull: false },
  apellido: { type: DataTypes.STRING(100), allowNull: false },
  puesto: { type: DataTypes.STRING(80), allowNull: false },
  area: DataTypes.STRING(80),
  fecha_ingreso: DataTypes.DATEONLY,
  telefono: DataTypes.STRING(20),
  estado: { type: DataTypes.ENUM('activo', 'baja'), defaultValue: 'activo' },
}, { tableName: 'empleados', timestamps: false });

module.exports = Empleado;
