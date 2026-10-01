// Unico punto del frontend que conoce la direccion del backend.
// Los componentes importan estas funciones y no usan fetch directamente.

const API = import.meta.env.VITE_API_URL ?? "http://localhost:8080/api";
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
  return await pedir(`/bebidas${query}`);
}

export async function crearBebida(datos) {
    return await pedir("/bebidas", {
      method: "POST",
      body: JSON.stringify(datos),
    });
}

export async function actualizarBebida(id, datos) {
    return await pedir(`/bebidas/${id}`, {
      method: "PUT",
      body: JSON.stringify(datos),
    });
}

export async function eliminarBebida(id) {
    return await pedir(`/bebidas/${id}`, { method: "DELETE" });
}

export async function restringirVenta(id) {
    return await pedir(`/bebidas/${id}/restriccion`, { method: "PATCH" });
}

export async function registrarVenta(bebidaId, unidades) {
    return await pedir("/ventas", {
    method: "POST",
    body: JSON.stringify({ bebidaId, unidades }),
  });
}
export async function listarVentas() {
  return await pedir("/ventas");
}
