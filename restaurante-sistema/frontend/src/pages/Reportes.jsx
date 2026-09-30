import { useState } from 'react';
import axiosClient from '../api/axiosClient';

export default function Reportes() {
  const [ventas, setVentas] = useState(null);
  const [desde, setDesde] = useState('');
  const [hasta, setHasta] = useState('');

  async function generarReporteVentas() {
    const { data } = await axiosClient.get('/reportes/ventas', { params: { desde, hasta } });
    setVentas(data);
  }

  return (
    <div className="card">
      <h2>Reportes administrativos</h2>
      <div style={{ marginBottom: 16 }}>
        <input type="date" value={desde} onChange={(e) => setDesde(e.target.value)} />
        <input type="date" value={hasta} onChange={(e) => setHasta(e.target.value)} style={{ marginLeft: 8 }} />
        <button onClick={generarReporteVentas} style={{ marginLeft: 8 }}>Consultar ventas</button>
      </div>

      {ventas && (
        <div>
          <p>Cuentas cerradas: {ventas.total_cuentas}</p>
          <p>Total de ventas: ${ventas.total_ventas.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
}
