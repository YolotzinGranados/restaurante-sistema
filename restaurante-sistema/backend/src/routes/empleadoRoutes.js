const express = require('express');
const router = express.Router();
const empleadoController = require('../controllers/empleadoController');
const authMiddleware = require('../middlewares/authMiddleware');
const rbac = require('../middlewares/rbacMiddleware');

router.use(authMiddleware);

router.get('/', rbac(['Admin', 'Gerente', 'RRHH']), empleadoController.listar);
router.get('/:id', rbac(['Admin', 'Gerente', 'RRHH']), empleadoController.obtener);
router.post('/', rbac(['Admin', 'RRHH']), empleadoController.crear);
router.put('/:id', rbac(['Admin', 'RRHH']), empleadoController.actualizar);
router.delete('/:id', rbac(['Admin', 'RRHH']), empleadoController.eliminar);

module.exports = router;
