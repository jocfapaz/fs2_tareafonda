import React from 'react';

const MOTIVOS_RECHAZO = {
  VENTA_RESTRINGIDA: 'Venta restringida',
  LIMITE_EXCEDIDO: 'Límite de alcohol excedido',
  STOCK_INSUFICIENTE: 'Stock insuficiente'
};

export default function VentaHistorial({ ventas }) {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-secondary text-white"><h5 className="m-0">Historial de Ventas</h5></div>
      <div className="card-body">
        <table className="table table-striped">
          <thead>
            <tr><th>ID</th><th>Bebida</th><th>Unidades</th><th>Total</th><th>Estado</th><th>Motivo</th></tr>
          </thead>
          <tbody>
            {ventas.map(v => (
              <tr key={v.id}>
                <td>#{v.id}</td>
                <td>{v.nombreBebida}</td>
                <td>{v.unidades}</td>
                <td>${v.total?.toLocaleString('es-CL')}</td>
                <td>
                  <span className={`badge ${v.estado === 'AUTORIZADA' ? 'bg-success' : 'bg-danger'}`}>
                    {v.estado}
                  </span>
                </td>
                <td>
                  {v.motivo ? (
                    <span className="badge bg-warning text-dark">
                      {MOTIVOS_RECHAZO[v.motivo] ?? v.motivo}
                    </span>
                  ) : (
                    <span className="text-muted">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}