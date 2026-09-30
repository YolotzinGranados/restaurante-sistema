const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Usuario, Rol } = require('../models');
require('dotenv').config();

// POST /api/auth/login
async function login(req, res) {
  try {
    const { nombre_usuario, password } = req.body;

    const usuario = await Usuario.findOne({
      where: { nombre_usuario },
      include: [{ model: Rol }],
    });

    if (!usuario || !usuario.activo) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const passwordValido = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValido) {
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    const token = jwt.sign(
      {
        id_usuario: usuario.id_usuario,
        nombre_usuario: usuario.nombre_usuario,
        id_rol: usuario.id_rol,
        rol: usuario.Rol.nombre,
      },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '8h' }
    );

    res.json({ token, usuario: { id_usuario: usuario.id_usuario, rol: usuario.Rol.nombre } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error: error.message });
  }
}

// POST /api/auth/register  (protegido: solo Admin, ver rutas)
async function registrar(req, res) {
  try {
    const { nombre_usuario, correo, password, id_rol } = req.body;

    const hash = await bcrypt.hash(password, 10);
    const nuevoUsuario = await Usuario.create({
      nombre_usuario,
      correo,
      password_hash: hash,
      id_rol,
    });

    res.status(201).json({ id_usuario: nuevoUsuario.id_usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error: error.message });
  }
}

module.exports = { login, registrar };
