const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Consumo = sequelize.define('Consumo', {
  id_consumo: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_cuenta: { type: DataTypes.INTEGER, allowNull: false },
  id_producto: { type: DataTypes.INTEGER, allowNull: false },
  cantidad: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  precio_unitario: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: 'consumos', timestamps: false });

module.exports = Consumo;
