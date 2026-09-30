const { Asistencia } = require('../models');
const { Op } = require('sequelize');

// POST /api/asistencias/checkin
async function checkIn(req, res) {
  const { id_empleado } = req.body;
  const registro = await Asistencia.create({
    id_empleado,
    fecha: new Date().toISOString().slice(0, 10),
    hora_entrada: new Date(),
  });
  res.status(201).json(registro);
}

// PUT /api/asistencias/:id/checkout
async function checkOut(req, res) {
  const registro = await Asistencia.findByPk(req.params.id);
  if (!registro) return res.status(404).json({ mensaje: 'Registro no encontrado' });

  await registro.update({ hora_salida: new Date() });
  res.json(registro);
}

// GET /api/asistencias?id_empleado=&desde=&hasta=
async function consultarHistorial(req, res) {
  const { id_empleado, desde, hasta } = req.query;
  const where = {};

  if (id_empleado) where.id_empleado = id_empleado;
  if (desde && hasta) where.fecha = { [Op.between]: [desde, hasta] };

  const registros = await Asistencia.findAll({ where, order: [['fecha', 'DESC']] });
  res.json(registros);
}

module.exports = { checkIn, checkOut, consultarHistorial };
