import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Reservaciones() {
  const [reservaciones, setReservaciones] = useState([]);

  useEffect(() => {
    axiosClient.get('/reservaciones').then((res) => setReservaciones(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Reservaciones de salones</h2>
      <table width="100%">
        <thead>
          <tr>
            <th>Salón</th>
            <th>Fecha</th>
            <th>Horario</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {reservaciones.map((r) => (
            <tr key={r.id_reservacion}>
              <td>{r.id_salon}</td>
              <td>{r.fecha_evento}</td>
              <td>{r.hora_inicio} - {r.hora_fin}</td>
              <td>{r.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
