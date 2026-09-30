const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Cuenta = sequelize.define('Cuenta', {
  id_cuenta: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_mesa: { type: DataTypes.INTEGER, allowNull: false },
  id_empleado: { type: DataTypes.INTEGER, allowNull: false },
  estado: { type: DataTypes.ENUM('abierta', 'cerrada'), defaultValue: 'abierta' },
  subtotal: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  impuestos: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  total: { type: DataTypes.DECIMAL(10, 2), defaultValue: 0 },
  cerrada_en: DataTypes.DATE,
}, { tableName: 'cuentas', timestamps: false });

module.exports = Cuenta;
