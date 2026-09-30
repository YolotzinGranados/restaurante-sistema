require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/db');
require('./models'); // registra asociaciones

const PORT = process.env.PORT || 4000;

async function iniciar() {
  try {
    await sequelize.authenticate();
    console.log('Conexión a MySQL establecida correctamente.');

    // En desarrollo puedes usar sync(); en producción usa el schema.sql y migraciones.
    // await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`Servidor backend escuchando en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error.message);
    process.exit(1);
  }
}

iniciar();
