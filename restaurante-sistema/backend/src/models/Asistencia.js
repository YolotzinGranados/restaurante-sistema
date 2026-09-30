const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Asistencia = sequelize.define('Asistencia', {
  id_asistencia: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_empleado: { type: DataTypes.INTEGER, allowNull: false },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  hora_entrada: DataTypes.DATE,
  hora_salida: DataTypes.DATE,
  observaciones: DataTypes.STRING(255),
}, { tableName: 'asistencias', timestamps: false });

module.exports = Asistencia;
