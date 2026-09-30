const { Empleado } = require('../models');

// GET /api/empleados
async function listar(req, res) {
  const empleados = await Empleado.findAll();
  res.json(empleados);
}

// GET /api/empleados/:id
async function obtener(req, res) {
  const empleado = await Empleado.findByPk(req.params.id);
  if (!empleado) return res.status(404).json({ mensaje: 'Empleado no encontrado' });
  res.json(empleado);
}

// POST /api/empleados
async function crear(req, res) {
  try {
    const empleado = await Empleado.create(req.body);
    res.status(201).json(empleado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear empleado', error: error.message });
  }
}

// PUT /api/empleados/:id
async function actualizar(req, res) {
  const empleado = await Empleado.findByPk(req.params.id);
  if (!empleado) return res.status(404).json({ mensaje: 'Empleado no encontrado' });

  await empleado.update(req.body);
  res.json(empleado);
}

// DELETE /api/empleados/:id  (baja lógica)
async function eliminar(req, res) {
  const empleado = await Empleado.findByPk(req.params.id);
  if (!empleado) return res.status(404).json({ mensaje: 'Empleado no encontrado' });

  await empleado.update({ estado: 'baja' });
  res.json({ mensaje: 'Empleado dado de baja' });
}

module.exports = { listar, obtener, crear, actualizar, eliminar };
