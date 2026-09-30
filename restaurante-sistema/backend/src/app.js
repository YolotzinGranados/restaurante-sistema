const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const empleadoRoutes = require('./routes/empleadoRoutes');
const asistenciaRoutes = require('./routes/asistenciaRoutes');
const reservacionRoutes = require('./routes/reservacionRoutes');
const cuentaRoutes = require('./routes/cuentaRoutes');
const reporteRoutes = require('./routes/reporteRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ estado: 'ok' }));

app.use('/api/auth', authRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/asistencias', asistenciaRoutes);
app.use('/api/reservaciones', reservacionRoutes);
app.use('/api/cuentas', cuentaRoutes);
app.use('/api/reportes', reporteRoutes);

// Manejo básico de errores
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

module.exports = app;
