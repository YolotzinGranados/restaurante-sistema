const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Reservacion = sequelize.define('Reservacion', {
  id_reservacion: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  id_salon: { type: DataTypes.INTEGER, allowNull: false },
  id_cliente: { type: DataTypes.INTEGER, allowNull: false },
  fecha_evento: { type: DataTypes.DATEONLY, allowNull: false },
  hora_inicio: { type: DataTypes.TIME, allowNull: false },
  hora_fin: { type: DataTypes.TIME, allowNull: false },
  num_invitados: DataTypes.INTEGER,
  estado: {
    type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada', 'finalizada'),
    defaultValue: 'pendiente',
  },
}, { tableName: 'reservaciones', timestamps: false });

module.exports = Reservacion;
