# Sistema de Gestión de Restaurante

Sistema modular para la gestión de un restaurante con salones de eventos, basado en el
levantamiento de requerimientos de "Equipo05_Restaurante_SalonesHuaquilpan" y
"Proyecto_Taller2".

## Módulos

1. **Empleados** – registro, consulta, roles e historial laboral.
2. **Asistencia** – check-in/check-out, almacenamiento en BD, historial y reportes.
3. **Reservaciones** – registro de eventos, validación de disponibilidad de salones, calendario.
4. **Cuentas** – apertura/cierre de cuentas por mesa, registro de consumos, cálculo de subtotal e impuestos.
5. **Reportes** – asistencia, eventos y ventas consolidadas.

Incluye control de acceso basado en roles (RBAC) con 5 perfiles: **Admin, Gerente, RRHH,
Recepcion y Mesero**.

## Estructura del proyecto

```
restaurante-sistema/
├── backend/                  # API REST (Node.js + Express + Sequelize + MySQL)
│   ├── src/
│   │   ├── config/db.js      # Conexión a MySQL
│   │   ├── models/           # Modelos Sequelize (uno por tabla)
│   │   ├── controllers/      # Lógica de negocio por módulo
│   │   ├── routes/           # Endpoints agrupados por módulo
│   │   ├── middlewares/      # Autenticación JWT y RBAC
│   │   ├── database/schema.sql  # Esquema completo de la base de datos
│   │   ├── app.js
│   │   └── server.js
│   ├── package.json
│   └── .env.example
└── frontend/                 # SPA (React + Vite + React Router + Axios)
    ├── src/
    │   ├── api/axiosClient.js
    │   ├── pages/             # Una página por módulo
    │   ├── components/
    │   └── App.jsx
    ├── vite.config.js
    └── package.json
```

## Puesta en marcha

### 1. Base de datos
```bash
mysql -u root -p < backend/src/database/schema.sql
```

### 2. Backend
```bash
cd backend
cp .env.example .env    # y ajusta tus credenciales de MySQL
npm install
npm run dev              # http://localhost:4000
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

## Notas

- Antes de poder iniciar sesión, crea un usuario directamente en la tabla `usuarios`
  (con `password_hash` generado con bcrypt) o habilita temporalmente el endpoint
  `/api/auth/register` sin protección para crear el primer Admin.
- El módulo de Empleados incluye CRUD completo; los demás módulos incluyen las
  operaciones clave descritas en los objetivos del proyecto y quedan listos para
  extenderse (edición de reservaciones, cancelaciones, más filtros de reportes, etc.).
- Los totales de las cuentas se recalculan automáticamente al agregar consumos o cerrar la cuenta.
