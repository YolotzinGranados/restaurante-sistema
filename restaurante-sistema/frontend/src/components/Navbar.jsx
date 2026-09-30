import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h3>Restaurante</h3>
      <Link to="/empleados">Empleados</Link>
      <Link to="/asistencia">Asistencia</Link>
      <Link to="/reservaciones">Reservaciones</Link>
      <Link to="/cuentas">Cuentas</Link>
      <Link to="/reportes">Reportes</Link>
    </nav>
  );
}
