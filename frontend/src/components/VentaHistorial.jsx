import React from 'react';

export default function VentaHistorial({ ventas }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white"><h5 className="m-0">Historial de Ventas</h5></div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr><th>ID</th><th>Bebida</th><th>Unidades</th><th>Total</th><th>Estado</th></tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id}>
                <td>#{v.id}</td>
                <td>{v.nombre}</td>
                <td>{v.unidades}</td>
                <td>${v.total?.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`badge ${v.estado === 'AUTORIZADA' ? 'bg-success' : 'bg-danger'}`}>
                    {v.estado}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}