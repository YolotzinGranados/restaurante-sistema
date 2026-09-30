const { Reservacion } = require('../models');
const { Op } = require('sequelize');

// GET /api/reservaciones
async function listar(req, res) {
  const reservaciones = await Reservacion.findAll();
  res.json(reservaciones);
}

// GET /api/reservaciones/disponibilidad?id_salon=&fecha=&hora_inicio=&hora_fin=
async function verificarDisponibilidad(req, res) {
  const { id_salon, fecha, hora_inicio, hora_fin } = req.query;

  const empalmes = await Reservacion.findAll({
    where: {
      id_salon,
      fecha_evento: fecha,
      estado: { [Op.ne]: 'cancelada' },
      [Op.and]: [
        { hora_inicio: { [Op.lt]: hora_fin } },
        { hora_fin: { [Op.gt]: hora_inicio } },
      ],
    },
  });

  res.json({ disponible: empalmes.length === 0, empalmes });
}

// POST /api/reservaciones
async function crear(req, res) {
  try {
    const reservacion = await Reservacion.create(req.body);
    res.status(201).json(reservacion);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear reservación', error: error.message });
  }
}

// PUT /api/reservaciones/:id
async function actualizar(req, res) {
  const reservacion = await Reservacion.findByPk(req.params.id);
  if (!reservacion) return res.status(404).json({ mensaje: 'Reservación no encontrada' });

  await reservacion.update(req.body);
  res.json(reservacion);
}

module.exports = { listar, verificarDisponibilidad, crear, actualizar };
