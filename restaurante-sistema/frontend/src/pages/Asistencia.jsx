import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Asistencia() {
  const [registros, setRegistros] = useState([]);

  useEffect(() => {
    axiosClient.get('/asistencias').then((res) => setRegistros(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Control de asistencia</h2>
      <table width="100%">
        <thead>
          <tr>
            <th>Empleado</th>
            <th>Fecha</th>
            <th>Entrada</th>
            <th>Salida</th>
          </tr>
        </thead>
        <tbody>
          {registros.map((r) => (
            <tr key={r.id_asistencia}>
              <td>{r.id_empleado}</td>
              <td>{r.fecha}</td>
              <td>{r.hora_entrada ? new Date(r.hora_entrada).toLocaleTimeString() : '-'}</td>
              <td>{r.hora_salida ? new Date(r.hora_salida).toLocaleTimeString() : '-'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
