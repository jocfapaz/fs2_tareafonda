import React, { useState } from 'react';

export default function BebidaList({ bebidas, onBuscar, onDelete, onToggleRestriccion }) {
  const [filtro, setFiltro] = useState('');

  const handleBuscar = (e) => {
    const val = e.target.value;
    setFiltro(val);
    onBuscar(val);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border-2 border-slate-200 overflow-hidden">
      
      {/* Header estilo barra de fonda */}
      <div className="bg-blue-900 p-4 border-b-4 border-red-600 flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="flex items-center gap-2 text-white">
          <span className="text-xl">📋</span>
          <h2 className="text-lg font-black tracking-wide uppercase">
            Catálogo de Bebidas y Tragos
          </h2>
        </div>
        <input 
          type="text" 
          className="w-full sm:w-64 px-3 py-2 text-sm rounded-xl border-2 border-blue-700 bg-blue-950 text-white placeholder-blue-300 focus:outline-none focus:border-yellow-400 font-medium" 
          placeholder="🔍 Buscar brebaje..." 
          value={filtro} 
          onChange={handleBuscar} 
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-amber-100/60 border-b border-amber-200 text-xs font-black text-slate-700 uppercase tracking-wider">
              <th className="p-4">Bebida</th>
              <th className="p-4">Tipo</th>
              <th className="p-4">Volumen</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Estado</th>
              <th className="p-4 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm font-medium">
            {bebidas.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-8 text-center text-slate-400 font-bold italic">
                  🌵 No hay copetes registrados todavía, mi huaso.
                </td>
              </tr>
            ) : (
              bebidas.map(b => (
                <tr key={b.id} className="hover:bg-amber-50/50 transition-colors">
                  <td className="p-4 font-bold text-slate-900 flex items-center gap-2">
                    <span>{b.tipo === 'ALCOHOLICA' ? '🍷' : '🥤'}</span>
                    {b.nombre}
                  </td>
                  <td className="p-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-black shadow-sm ${
                      b.tipo === 'ALCOHOLICA' 
                        ? 'bg-purple-100 text-purple-900 border border-purple-300' 
                        : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    }`}>
                      {b.tipo === 'ALCOHOLICA' ? '🔥 ALCOHÓLICA' : '🍃 SIN ALCOHOL'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600">{b.volumenML} ml</td>
                  <td className="p-4">
                    <span className={`font-black ${b.stock < 5 ? 'text-red-600' : 'text-slate-800'}`}>
                      {b.stock} u.
                    </span>
                  </td>
                  <td className="p-4 font-black text-slate-900 text-base">
                    ${b.precio?.toLocaleString('es-CL')}
                  </td>
                  <td className="p-4">
                    {b.ventaRestringida ? (
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-black bg-red-100 text-red-700 border border-red-300">
                        🚫 Restringida
                      </span>
                    ) : (
                      <span className="inline-block px-2.5 py-1 rounded-md text-xs font-black bg-emerald-100 text-emerald-800 border border-emerald-300">
                        ✅ Disponible
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <button 
                      className="px-3 py-1 text-xs font-bold rounded-lg border-2 border-amber-400 bg-amber-100 text-amber-900 hover:bg-amber-200 transition-colors shadow-sm" 
                      onClick={() => onToggleRestriccion(b.id)}
                    >
                      {b.ventaRestringida ? 'Habilitar' : 'Restringir'}
                    </button>
                    <button 
                      className="px-3 py-1 text-xs font-bold rounded-lg border-2 border-red-400 bg-red-100 text-red-800 hover:bg-red-200 transition-colors shadow-sm" 
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
  );
}