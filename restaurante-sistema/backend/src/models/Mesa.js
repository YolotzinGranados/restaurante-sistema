const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Mesa = sequelize.define('Mesa', {
  id_mesa: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  numero: { type: DataTypes.STRING(10), allowNull: false },
  area: { type: DataTypes.ENUM('restaurante', 'salon', 'jardin'), allowNull: false },
  id_salon: { type: DataTypes.INTEGER, allowNull: true },
}, { tableName: 'mesas', timestamps: false });

module.exports = Mesa;
