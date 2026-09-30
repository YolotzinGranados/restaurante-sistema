const { Cuenta, Consumo, Producto } = require('../models');

const TASA_IMPUESTO = 0.16; // IVA 16%

// POST /api/cuentas  -> abrir cuenta
async function abrir(req, res) {
  const { id_mesa, id_empleado } = req.body;
  const cuenta = await Cuenta.create({ id_mesa, id_empleado });
  res.status(201).json(cuenta);
}

// POST /api/cuentas/:id/consumos -> agregar producto y recalcular totales
async function agregarConsumo(req, res) {
  const { id_producto, cantidad } = req.body;
  const cuenta = await Cuenta.findByPk(req.params.id);
  if (!cuenta || cuenta.estado === 'cerrada') {
    return res.status(400).json({ mensaje: 'Cuenta no disponible' });
  }

  const producto = await Producto.findByPk(id_producto);
  if (!producto) return res.status(404).json({ mensaje: 'Producto no encontrado' });

  await Consumo.create({
    id_cuenta: cuenta.id_cuenta,
    id_producto,
    cantidad,
    precio_unitario: producto.precio,
  });

  await recalcularTotales(cuenta);
  res.status(201).json(cuenta);
}

// PUT /api/cuentas/:id/cerrar
async function cerrar(req, res) {
  const cuenta = await Cuenta.findByPk(req.params.id);
  if (!cuenta) return res.status(404).json({ mensaje: 'Cuenta no encontrada' });

  await recalcularTotales(cuenta);
  await cuenta.update({ estado: 'cerrada', cerrada_en: new Date() });
  res.json(cuenta);
}

// GET /api/cuentas/abiertas
async function listarAbiertas(req, res) {
  const cuentas = await Cuenta.findAll({ where: { estado: 'abierta' } });
  res.json(cuentas);
}

async function recalcularTotales(cuenta) {
  const consumos = await Consumo.findAll({ where: { id_cuenta: cuenta.id_cuenta } });
  const subtotal = consumos.reduce((acc, c) => acc + c.cantidad * Number(c.precio_unitario), 0);
  const impuestos = subtotal * TASA_IMPUESTO;

  await cuenta.update({
    subtotal: subtotal.toFixed(2),
    impuestos: impuestos.toFixed(2),
    total: (subtotal + impuestos).toFixed(2),
  });
}

module.exports = { abrir, agregarConsumo, cerrar, listarAbiertas };
