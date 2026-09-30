const { Asistencia, Reservacion, Cuenta, sequelize } = require('../models');
const { Op } = require('sequelize');

// GET /api/reportes/asistencia?desde=&hasta=
async function reporteAsistencia(req, res) {
  const { desde, hasta } = req.query;
  const registros = await Asistencia.findAll({
    where: { fecha: { [Op.between]: [desde, hasta] } },
  });
  res.json(registros);
}

// GET /api/reportes/eventos?desde=&hasta=
async function reporteEventos(req, res) {
  const { desde, hasta } = req.query;
  const eventos = await Reservacion.findAll({
    where: { fecha_evento: { [Op.between]: [desde, hasta] } },
  });
  res.json(eventos);
}

// GET /api/reportes/ventas?desde=&hasta=
async function reporteVentas(req, res) {
  const { desde, hasta } = req.query;
  const cuentas = await Cuenta.findAll({
    where: {
      estado: 'cerrada',
      cerrada_en: { [Op.between]: [desde, hasta] },
    },
  });

  const totalVentas = cuentas.reduce((acc, c) => acc + Number(c.total), 0);
  res.json({ total_cuentas: cuentas.length, total_ventas: totalVentas, cuentas });
}

module.exports = { reporteAsistencia, reporteEventos, reporteVentas };
