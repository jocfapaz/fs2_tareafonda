import React, { useState } from 'react';

export default function BebidaForm({ onSave, errores }) {
  const [form, setForm] = useState({
    nombre: '',
    tipo: 'ALCOHOLICA',
    volumenML: 500,
    stock: 10,
    gradosAlcohol: 12,
    certificada: true,
    azucarPorLitro: 0
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...form };
    if (form.tipo === 'ALCOHOLICA') delete payload.azucarPorLitro;
    else {
      delete payload.gradosAlcohol;
      delete payload.certificada;
    }
    onSave(payload);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-dark text-white"><h5 className="m-0">Nueva Bebida</h5></div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Nombre</label>
              <input type="text" className="form-control" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
              {errores?.nombre && <div className="text-danger small">{errores.nombre}</div>}
            </div>
            <div className="col-md-4">
              <label className="form-label">Tipo</label>
              <select className="form-select" value={form.tipo} onChange={e => setForm({...form, tipo: e.target.value})}>
                <option value="ALCOHOLICA">Alcohólica</option>
                <option value="SIN_ALCOHOL">Sin Alcohol</option>
              </select>
            </div>
            <div className="col-md-2">
              <label className="form-label">Volumen (ml)</label>
              <input type="number" className="form-control" value={form.volumenML} onChange={e => setForm({...form, volumenML: Number(e.target.value)})} />
              {errores?.volumenML && <div className="text-danger small">{errores.volumenML}</div>}
            </div>
            <div className="col-md-2">
              <label className="form-label">Stock</label>
              <input type="number" className="form-control" value={form.stock} onChange={e => setForm({...form, stock: Number(e.target.value)})} />
              {errores?.stock && <div className="text-danger small">{errores.stock}</div>}
            </div>

            {form.tipo === 'ALCOHOLICA' ? (
              <>
                <div className="col-md-6">
                  <label className="form-label">Grados de Alcohol</label>
                  <input type="number" step="0.1" className="form-control" value={form.gradosAlcohol} onChange={e => setForm({...form, gradosAlcohol: Number(e.target.value)})} />
                </div>
                <div className="col-md-6 d-flex align-items-end">
                  <div className="form-check mb-2">
                    <input className="form-check-input" type="checkbox" checked={form.certificada} onChange={e => setForm({...form, certificada: e.target.checked})} />
                    <label className="form-check-label">Certificada por Proveedor</label>
                  </div>
                </div>
              </>
            ) : (
              <div className="col-md-6">
                <label className="form-label">Azúcar por Litro (g/L)</label>
                <input type="number" className="form-control" value={form.azucarPorLitro} onChange={e => setForm({...form, azucarPorLitro: Number(e.target.value)})} />
              </div>
            )}
          </div>
          <button type="submit" className="btn btn-success mt-3">Guardar Bebida</button>
        </form>
      </div>
    </div>
  );
}