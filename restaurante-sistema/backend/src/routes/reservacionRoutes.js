const express = require('express');
const router = express.Router();
const reservacionController = require('../controllers/reservacionController');
const authMiddleware = require('../middlewares/authMiddleware');
const rbac = require('../middlewares/rbacMiddleware');

router.use(authMiddleware);

router.get('/', rbac(['Admin', 'Gerente', 'Recepcion']), reservacionController.listar);
router.get('/disponibilidad', rbac(['Admin', 'Gerente', 'Recepcion']), reservacionController.verificarDisponibilidad);
router.post('/', rbac(['Admin', 'Recepcion']), reservacionController.crear);
router.put('/:id', rbac(['Admin', 'Recepcion']), reservacionController.actualizar);

module.exports = router;
