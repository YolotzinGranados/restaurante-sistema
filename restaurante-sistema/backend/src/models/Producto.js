const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Producto = sequelize.define('Producto', {
  id_producto: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(120), allowNull: false },
  categoria: DataTypes.STRING(60),
  precio: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
}, { tableName: 'productos', timestamps: false });

module.exports = Producto;
