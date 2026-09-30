const express = require('express');
const router = express.Router();
const reporteController = require('../controllers/reporteController');
const authMiddleware = require('../middlewares/authMiddleware');
const rbac = require('../middlewares/rbacMiddleware');

router.use(authMiddleware, rbac(['Admin', 'Gerente']));

router.get('/asistencia', reporteController.reporteAsistencia);
router.get('/eventos', reporteController.reporteEventos);
router.get('/ventas', reporteController.reporteVentas);

module.exports = router;
