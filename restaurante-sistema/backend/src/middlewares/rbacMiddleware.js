// Uso: rbac(['Admin', 'Gerente']) permite el acceso solo a esos roles.
function rbac(rolesPermitidos = []) {
  return (req, res, next) => {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: 'No autenticado' });
    }

    const rolUsuario = req.usuario.rol;

    if (!rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({ mensaje: 'No tienes permisos para esta acción' });
    }

    next();
  };
}

module.exports = rbac;
