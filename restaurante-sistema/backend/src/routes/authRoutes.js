const express = require('express');
const router = express.Router();
const { login, registrar } = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
const rbac = require('../middlewares/rbacMiddleware');

router.post('/login', login);

// Solo un Admin puede crear nuevas cuentas de acceso
router.post('/register', authMiddleware, rbac(['Admin']), registrar);

module.exports = router;
