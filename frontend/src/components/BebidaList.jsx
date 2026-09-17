import React, { useState } from 'react';

export default function BebidaList({ bebidas, onBuscar, onDelete, onToggleRestriccion }) {
  const [filtro, setFiltro] = useState('');

  const handleBuscar = (e) => {
    const val = e.target.value;
    setFiltro(val);
    onBuscar(val);
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h5 className="m-0">Catálogo de Bebidas</h5>
        <input 
          type="text" 
          className="form-control form-control-sm w-25" 
          placeholder="Buscar por nombre..." 
          value={filtro} 
          onChange={handleBuscar} 
        />
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Tipo</th>
                <th>Volumen</th>
                <th>Stock</th>
                <th>Precio</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {bebidas.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted">No se encontraron bebidas</td>
                </tr>
              ) : (
                bebidas.map(b => (
                  <tr key={b.id}>
                    <td><strong>{b.nombre}</strong></td>
                    <td>
                      <span className={`badge ${b.tipo === 'ALCOHOLICA' ? 'bg-warning text-dark' : 'bg-info'}`}>
                        {b.tipo}
                      </span>
                    </td>
                    <td>{b.volumenML} ml</td>
                    <td>{b.stock}</td>
                    <td>${b.precio?.toLocaleString('es-CL')}</td>
                    <td>
                      {b.ventaRestringida ? (
                        <span className="badge bg-danger">Restringida</span>
                      ) : (
                        <span className="badge bg-success">Disponible</span>
                      )}
                    </td>
                    <td>
                      <button 
                        className="btn btn-sm btn-outline-warning me-2" 
                        onClick={() => onToggleRestriccion(b.id)}
                      >
                        {b.ventaRestringida ? 'Quitar Restricción' : 'Restringir'}
                      </button>
                      <button 
                        className="btn btn-sm btn-outline-danger" 
                        onClick={() => onDelete(b.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}