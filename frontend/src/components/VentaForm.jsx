import React, { useState } from 'react';

export default function VentaForm({ bebidas, onVender, errorVenta }) {
  const [bebidaId, setBebidaId] = useState('');
  const [unidades, setUnidades] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bebidaId) return;
    onVender({ bebidaId, unidades: Number(unidades) });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-success text-white"><h5 className="m-0">Registrar Venta</h5></div>
      <div className="card-body">
        {errorVenta && <div className="alert alert-danger">{errorVenta.mensaje || errorVenta.error}</div>}
        <form onSubmit={handleSubmit} className="row g-3">
          <div className="col-md-6">
            <select className="form-select" value={bebidaId} onChange={e => setBebidaId(e.target.value)}>
              <option value="">Seleccione bebida...</option>
              {bebidas.map(b => <option key={b.id} value={b.id}>{b.nombre} ({b.tipo})</option>)}
            </select>
          </div>
          <div className="col-md-3">
            <input type="number" min="1" className="form-control" value={unidades} onChange={e => setUnidades(e.target.value)} />
          </div>
          <div className="col-md-3">
            <button type="submit" className="btn btn-primary w-100">Procesar Venta</button>
          </div>
        </form>
      </div>
    </div>
  );
}