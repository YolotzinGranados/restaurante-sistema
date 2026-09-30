import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Empleados() {
  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    axiosClient.get('/empleados').then((res) => setEmpleados(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Empleados</h2>
      <table width="100%">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Puesto</th>
            <th>Área</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((emp) => (
            <tr key={emp.id_empleado}>
              <td>{emp.nombre} {emp.apellido}</td>
              <td>{emp.puesto}</td>
              <td>{emp.area}</td>
              <td>{emp.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
