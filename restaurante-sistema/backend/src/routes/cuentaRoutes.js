const express = require('express');
const router = express.Router();
const cuentaController = require('../controllers/cuentaController');
const authMiddleware = require('../middlewares/authMiddleware');
const rbac = require('../middlewares/rbacMiddleware');

router.use(authMiddleware);

router.get('/abiertas', rbac(['Admin', 'Gerente', 'Mesero']), cuentaController.listarAbiertas);
router.post('/', rbac(['Admin', 'Mesero']), cuentaController.abrir);
router.post('/:id/consumos', rbac(['Admin', 'Mesero']), cuentaController.agregarConsumo);
router.put('/:id/cerrar', rbac(['Admin', 'Mesero']), cuentaController.cerrar);

module.exports = router;
