const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Salon = sequelize.define('Salon', {
  id_salon: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(80), allowNull: false },
  capacidad: { type: DataTypes.INTEGER, allowNull: false },
  ubicacion: DataTypes.STRING(120),
  activo: { type: DataTypes.BOOLEAN, defaultValue: true },
}, { tableName: 'salones', timestamps: false });

module.exports = Salon;
