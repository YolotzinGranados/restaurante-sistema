const express = require('express');
const router = express.Router();
const asistenciaController = require('../controllers/asistenciaController');
const authMiddleware = require('../middlewares/authMiddleware');
const rbac = require('../middlewares/rbacMiddleware');

router.use(authMiddleware);

router.post('/checkin', rbac(['Admin', 'RRHH']), asistenciaController.checkIn);
router.put('/:id/checkout', rbac(['Admin', 'RRHH']), asistenciaController.checkOut);
router.get('/', rbac(['Admin', 'Gerente', 'RRHH']), asistenciaController.consultarHistorial);

module.exports = router;
