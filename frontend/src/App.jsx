import React, { useEffect, useState } from "react";
import { Container, Alert } from "react-bootstrap";
import { 
  listarBebidas, 
  crearBebida, 
  eliminarBebida, 
  restringirVenta, 
  registrarVenta, 
  listarVentas 
} from "./services/api";

import BebidaList from "./components/BebidaList";
import BebidaForm from "./components/BebidaForm";
import VentaForm from "./components/VentaForm";
import VentaHistorial from "./components/VentaHistorial";
/**
 * Estructura sugerida de la interfaz. Cada bloque es un componente propio
 * dentro de src/components/:
 *
 *   BebidaList      tabla del catalogo, con filtro por nombre
 *   BebidaForm      alta y edicion de una bebida
 *   VentaForm       registro de una venta
 *   VentaHistorial  listado de ventas con su estado y motivo
 *
 * Ningun componente calcula precios ni decide si una venta se autoriza:
 * esos datos vienen del backend.
 */
export default function App() {
  const [bebidas, setBebidas] = useState([]);
  const [ventas, setVentas] = useState([]);
  const [erroresForm, setErroresForm] = useState(null);
  const [errorVenta, setErrorVenta] = useState(null);
  const [errorGlobal, setErrorGlobal] = useState(null);

  // Carga inicial de datos y filtro por nombre
  const cargarDatos = async (nombre = "") => {
    try {
      const dataBebidas = await listarBebidas(nombre);
      setBebidas(dataBebidas || []);
      const dataVentas = await listarVentas();
      setVentas(dataVentas || []);
    } catch (err) {
      setErrorGlobal("Error al comunicarse con el servidor.");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  // Manejo de acciones
  const handleCrearBebida = async (datos) => {
    try {
      setErroresForm(null);
      await crearBebida(datos);
      await cargarDatos();
    } catch (err) {
      if (err.campos) {
        setErroresForm(err.campos);
      } else {
        setErrorGlobal("No se pudo crear la bebida.");
      }
    }
  };

  const handleEliminarBebida = async (id) => {
    try {
      await eliminarBebida(id);
      await cargarDatos();
    } catch (err) {
      setErrorGlobal("No se pudo eliminar la bebida.");
    }
  };

  const handleToggleRestriccion = async (id) => {
    try {
      await restringirVenta(id);
      await cargarDatos();
    } catch (err) {
      setErrorGlobal("No se pudo cambiar la restricción.");
    }
  };

  const handleRegistrarVenta = async (venta) => {
    try {
      setErrorVenta(null);
      await registrarVenta(venta.bebidaId, venta.unidades);
      await cargarDatos();
    } catch (err) {
      setErrorVenta(err);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50/60 py-8 px-4 sm:px-6 lg:px-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Banner Fondero Principal */}
        <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-red-700 rounded-2xl shadow-xl p-6 text-white border-b-8 border-yellow-400 relative overflow-hidden">
          <div className="absolute -right-4 -bottom-4 opacity-15 text-8xl select-none">
            🍷
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-3xl">🇨🇱</span>
                <h1 className="text-3xl sm:text-4xl font-black tracking-wider uppercase drop-shadow-md">
                  Fonda San Belarmino
                </h1>
              </div>
              <p className="text-amber-200 mt-1 font-medium italic text-sm sm:text-base">
                "¡Tiquitiquití! Control oficial de copetes y terremotos"
              </p>
            </div>
            <span className="bg-yellow-400 text-slate-900 font-black text-xs uppercase px-4 py-2 rounded-full shadow-md tracking-wider border-2 border-white">
              ⚡ Caja Abierta
            </span>
          </div>
        </header>

        {/* Alerta de Error */}
        {errorGlobal && (
          <div className="bg-red-100 border-l-8 border-red-600 p-4 rounded-xl shadow-md flex justify-between items-center text-red-900">
            <p className="font-bold text-sm">⚠️ {errorGlobal}</p>
            <button 
              onClick={() => setErrorGlobal(null)}
              className="font-black text-lg hover:text-red-600"
            >
              ✕
            </button>
          </div>
        )}

        {/* Secciones del Sistema */}
        <main className="space-y-6">
          <BebidaForm onSave={handleCrearBebida} errores={erroresForm} />
          <BebidaList 
            bebidas={bebidas} 
            onBuscar={cargarDatos} 
            onDelete={handleEliminarBebida} 
            onToggleRestriccion={handleToggleRestriccion} 
          />
          <VentaForm 
            bebidas={bebidas} 
            onVender={handleRegistrarVenta} 
            errorVenta={errorVenta} 
          />
          <VentaHistorial ventas={ventas} />
        </main>

        <footer className="text-center text-xs text-slate-400 font-semibold pt-4">
          Fonda San Belarmino © DSY1104 — ¡A tomar con responsabilidad, pariente!
        </footer>

      </div>
    </div>
  );
}