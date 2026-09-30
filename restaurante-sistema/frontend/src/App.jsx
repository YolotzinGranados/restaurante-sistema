import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Empleados from './pages/Empleados.jsx';
import Asistencia from './pages/Asistencia.jsx';
import Reservaciones from './pages/Reservaciones.jsx';
import Cuentas from './pages/Cuentas.jsx';
import Reportes from './pages/Reportes.jsx';

function estaAutenticado() {
  return Boolean(localStorage.getItem('token'));
}

function RutaPrivada({ children }) {
  return estaAutenticado() ? children : <Navigate to="/login" />;
}

export default function App() {
  if (!estaAutenticado()) {
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );
  }

  return (
    <div className="layout">
      <Navbar />
      <div className="contenido">
        <Routes>
          <Route path="/" element={<Navigate to="/empleados" />} />
          <Route path="/empleados" element={<RutaPrivada><Empleados /></RutaPrivada>} />
          <Route path="/asistencia" element={<RutaPrivada><Asistencia /></RutaPrivada>} />
          <Route path="/reservaciones" element={<RutaPrivada><Reservaciones /></RutaPrivada>} />
          <Route path="/cuentas" element={<RutaPrivada><Cuentas /></RutaPrivada>} />
          <Route path="/reportes" element={<RutaPrivada><Reportes /></RutaPrivada>} />
        </Routes>
      </div>
    </div>
  );
}
