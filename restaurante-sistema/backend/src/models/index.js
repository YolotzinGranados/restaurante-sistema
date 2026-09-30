const sequelize = require('../config/db');

const Rol = require('./Rol');
const Usuario = require('./Usuario');
const Empleado = require('./Empleado');
const Asistencia = require('./Asistencia');
const Salon = require('./Salon');
const Cliente = require('./Cliente');
const Reservacion = require('./Reservacion');
const Mesa = require('./Mesa');
const Producto = require('./Producto');
const Cuenta = require('./Cuenta');
const Consumo = require('./Consumo');

// --- Seguridad / RBAC ---
Rol.hasMany(Usuario, { foreignKey: 'id_rol' });
Usuario.belongsTo(Rol, { foreignKey: 'id_rol' });

Usuario.hasOne(Empleado, { foreignKey: 'id_usuario' });
Empleado.belongsTo(Usuario, { foreignKey: 'id_usuario' });

// --- Asistencia ---
Empleado.hasMany(Asistencia, { foreignKey: 'id_empleado' });
Asistencia.belongsTo(Empleado, { foreignKey: 'id_empleado' });

// --- Reservaciones ---
Salon.hasMany(Reservacion, { foreignKey: 'id_salon' });
Reservacion.belongsTo(Salon, { foreignKey: 'id_salon' });

Cliente.hasMany(Reservacion, { foreignKey: 'id_cliente' });
Reservacion.belongsTo(Cliente, { foreignKey: 'id_cliente' });

// --- Cuentas ---
Salon.hasMany(Mesa, { foreignKey: 'id_salon' });
Mesa.belongsTo(Salon, { foreignKey: 'id_salon' });

Mesa.hasMany(Cuenta, { foreignKey: 'id_mesa' });
Cuenta.belongsTo(Mesa, { foreignKey: 'id_mesa' });

Empleado.hasMany(Cuenta, { foreignKey: 'id_empleado' });
Cuenta.belongsTo(Empleado, { foreignKey: 'id_empleado' });

Cuenta.hasMany(Consumo, { foreignKey: 'id_cuenta' });
Consumo.belongsTo(Cuenta, { foreignKey: 'id_cuenta' });

Producto.hasMany(Consumo, { foreignKey: 'id_producto' });
Consumo.belongsTo(Producto, { foreignKey: 'id_producto' });

module.exports = {
  sequelize,
  Rol,
  Usuario,
  Empleado,
  Asistencia,
  Salon,
  Cliente,
  Reservacion,
  Mesa,
  Producto,
  Cuenta,
  Consumo,
};
