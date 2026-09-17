// Unico punto del frontend que conoce la direccion del backend.
// Los componentes importan estas funciones y no usan fetch directamente.

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";
// Datos de prueba locales (Mock)
const MOCK_BEBIDAS = [
  { id: 1, nombre: "Chicha", tipo: "ALCOHOLICA", volumenML: 1000, stock: 40, gradosAlcohol: 12.0, certificada: false, ventaRestringida: true, precio: 4200 },
  { id: 2, nombre: "Pisco Sour", tipo: "ALCOHOLICA", volumenML: 500, stock: 25, gradosAlcohol: 18.0, certificada: true, ventaRestringida: false, precio: 3500 },
  { id: 3, nombre: "Chicha", tipo: "SIN_ALCOHOL", volumenML: 1000, stock: 60, azucarPorLitro: 95, ventaRestringida: false, precio: 2200 },
  { id: 4, nombre: "Mote con Huesillo", tipo: "SIN_ALCOHOL", volumenML: 400, stock: 50, azucarPorLitro: 70, ventaRestringida: false, precio: 2000 }
];
const getLocalBebidas = () => JSON.parse(localStorage.getItem("mock_bebidas")) || MOCK_BEBIDAS;
const setLocalBebidas = (data) => localStorage.setItem("mock_bebidas", JSON.stringify(data));
const getLocalVentas = () => JSON.parse(localStorage.getItem("mock_ventas")) || [];
const setLocalVentas = (data) => localStorage.setItem("mock_ventas", JSON.stringify(data));
/** Lanza un error con el cuerpo de la respuesta cuando el status no es 2xx. */
async function pedir(ruta, opciones = {}) {
  const res = await fetch(`${API}${ruta}`, {
    headers: { "Content-Type": "application/json" },
    ...opciones,
  });

  if (!res.ok) {
    // TODO: leer el cuerpo del error (400 trae los campos, 409 trae el motivo)
    // y lanzarlo para que el componente pueda mostrarlo.
    const errorBody = await res.json().catch(() => ({}));
    throw { status: res.status, ...errorBody };
  }

  return res.status === 204 ? null : res.json();
}

export async function listarBebidas(nombre) {
  const query = nombre ? `?nombre=${encodeURIComponent(nombre)}` : "";
  try {
    return await pedir(`/bebidas${query}`);
  } catch (err) {
    let data = getLocalBebidas();
    if (nombre) {
      data = data.filter(b => b.nombre.toLowerCase().includes(nombre.toLowerCase()));
    }
    return data;
  }
}

export async function crearBebida(datos) {
  try {
    return await pedir("/bebidas", {
      method: "POST",
      body: JSON.stringify(datos),
    });
  } catch (err) {
    if (err.campos) throw err; // Si el backend responde con error de validación 400
    const data = getLocalBebidas();
    const nueva = {
      ...datos,
      id: Date.now(),
      precio: datos.tipo === "ALCOHOLICA" ? 3500 : 2000,
      ventaRestringida: false,
    };
    data.push(nueva);
    setLocalBebidas(data);
    return nueva;
  }
}

export async function actualizarBebida(id, datos) {
  try {
    return await pedir(`/bebidas/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
    });
  } catch (err) {
    if (err.campos) throw err;
    const data = getLocalBebidas().map(b => (b.id === Number(id) ? { ...b, ...datos } : b));
    setLocalBebidas(data);
    return datos;
  }
}

export async function eliminarBebida(id) {
  try {
    return await pedir(`/bebidas/${id}`, { method: "DELETE" });
  } catch (err) {
    const data = getLocalBebidas().filter(b => b.id !== Number(id));
    setLocalBebidas(data);
  }
}

export async function restringirVenta(id) {
  try {
    return await pedir(`/bebidas/${id}/restriccion`, { method: "PATCH" });
  } catch (err) {
    const data = getLocalBebidas().map(b =>
      b.id === Number(id) ? { ...b, ventaRestringida: !b.ventaRestringida } : b
    );
    setLocalBebidas(data);
  }
}

export async function registrarVenta(bebidaId, unidades) {
  try {
    return await pedir("/ventas", {
      method: "POST",
      body: JSON.stringify({ bebidaId, unidades }),
    });
  } catch (err) {
    if (err.error) throw err; // Si el backend responde error 409
    
    // Simulación de reglas de negocio si backend está apagado
    const bebidas = getLocalBebidas();
    const bebida = bebidas.find(b => b.id === Number(bebidaId));
    
    if (bebida.ventaRestringida) {
      throw { error: "VENTA_RESTRINGIDA", mensaje: "Venta restringida para esta bebida." };
    }
    if (bebida.tipo === "ALCOHOLICA" && unidades > 3) {
      throw { error: "LIMITE_EXCEDIDO", mensaje: `${unidades} unidades superan el límite de 3 por cliente.` };
    }
    if (bebida.stock < unidades) {
      throw { error: "STOCK_INSUFFICIENT", mensaje: "Stock insuficiente." };
    }

    bebida.stock -= unidades;
    setLocalBebidas(bebidas);

    const venta = {
      id: Date.now(),
      bebidaId: bebida.id,
      nombre: bebida.nombre,
      unidades,
      total: bebida.precio * unidades,
      estado: "AUTORIZADA",
    };

    const ventas = getLocalVentas();
    ventas.push(venta);
    setLocalVentas(ventas);
    return venta;
  }
}

export async function listarVentas() {
  try {
    return await pedir("/ventas");
  } catch (err) {
    return getLocalVentas();
  }
}