import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Cuentas() {
  const [cuentas, setCuentas] = useState([]);

  useEffect(() => {
    axiosClient.get('/cuentas/abiertas').then((res) => setCuentas(res.data));
  }, []);

  return (
    <div className="card">
      <h2>Cuentas abiertas</h2>
      <table width="100%">
        <thead>
          <tr>
            <th>Mesa</th>
            <th>Subtotal</th>
            <th>Impuestos</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {cuentas.map((c) => (
            <tr key={c.id_cuenta}>
              <td>{c.id_mesa}</td>
              <td>${c.subtotal}</td>
              <td>${c.impuestos}</td>
              <td>${c.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
