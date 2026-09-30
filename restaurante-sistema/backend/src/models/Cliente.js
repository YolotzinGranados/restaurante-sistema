const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cliente = sequelize.define('Cliente', {
  id_cliente: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING(150), allowNull: false },
  telefono: DataTypes.STRING(20),
  correo: DataTypes.STRING(150),
}, { tableName: 'clientes', timestamps: false });

module.exports = Cliente;
