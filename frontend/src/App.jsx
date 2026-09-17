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
    <Container className="py-4">
      <h1 className="mb-1">Fonda San Belarmino 🇨🇱</h1>
      <p className="text-muted">Control de bebidas y ventas</p>

      {errorGlobal && (
        <Alert variant="danger" onClose={() => setErrorGlobal(null)} dismissible>
          {errorGlobal}
        </Alert>
      )}

      {/* Formulario para agregar una bebida */}
      <BebidaForm onSave={handleCrearBebida} errores={erroresForm} />

      {/* Tabla del catálogo con buscador integrado */}
      <BebidaList 
        bebidas={bebidas} 
        onBuscar={cargarDatos} 
        onDelete={handleEliminarBebida} 
        onToggleRestriccion={handleToggleRestriccion} 
      />

      {/* Registro de Ventas */}
      <VentaForm 
        bebidas={bebidas} 
        onVender={handleRegistrarVenta} 
        errorVenta={errorVenta} 
      />

      {/* Historial de Ventas */}
      <VentaHistorial ventas={ventas} />
    </Container>
  );
}
