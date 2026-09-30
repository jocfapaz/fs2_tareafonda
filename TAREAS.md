# 🎯 Tareas del Proyecto - Fonda San Belarmino

> Semana de entrega: del [28/09/26] al [02/10/26]
> Integrantes: Nicolás Catalán + Josefa Roca
> Estrategia: H2 en memoria ahora, MySQL al final. Precio calculado en Service, no guardado en BD. Uso de DTOs.

---

## 📋 Cómo usar esto

- [ ] `[]` = Por hacer / Pendiente
- [~] `[~]` = En progreso (copiar/pegar el símbolo ~)
- [x] `[x]` = Listo / Terminado

**Regla:** Solo una persona puede tener una tarea `[~]` a la vez para no pisarnos.

---

## 🏗️ Bloque 1: Modelo de Datos (Entidades JPA)

| # | Tarea | Asignado | Estado |
|---|---|---|---|
| 1 | Crear enums `TipoBebida` y `EstadoVenta` | [Nicolás Catalán] | [x] |
| 2 | Crear entidad `Bebida` con validaciones | [Nicolás Catalán] | [x] |
| 3 | Crear entidad `Venta` con relación a Bebida | [Josefa Roca] | [x] |

**Notas:**
- La tarea 1 debe estar lista antes de empezar la 2 y 3.
- El `precio` **NO** va en la entidad `Bebida`, se calcula en el Service.

---

## 🗄️ Bloque 2: Acceso a Datos (Repositorios)

| # | Tarea | Asignado | Estado |
|---|---|---|---|
| 4 | Crear `BebidaRepository` y `VentaRepository` | [Nicolás Catalán] | [x] |

**Notas:**
- `BebidaRepository` necesita `findByNombreContainingIgnoreCase(String nombre)` para el filtro por nombre.
- `VentaRepository` puede quedar vacío porque `save()` y `findAll()` ya vienen gratis con `JpaRepository`.

---

## 📦 Bloque 3: DTOs (Request / Response)

> Nota: el `precio` se calcula en el Service y se devuelve en el DTO de salida. No se guarda en BD.

| # | Tarea | Asignado | Estado |
|---|---|---|---|
| 14 | Crear `BebidaRequest` (entrada: crear/editar bebida) | [Nombre] | [ ] |
| 15 | Crear `BebidaResponse` (salida: bebida + precio calculado) | [Nombre] | [ ] |
| 16 | Crear `VentaRequest` (entrada: bebidaId + unidades) | [Nombre] | [ ] |
| 17 | Crear `VentaResponse` (salida: venta + nombre bebida + estado + motivo) | [Nombre] | [ ] |

**Validaciones a recordar:**
- `BebidaRequest`:
  - `nombre` → `@NotBlank`
  - `volumenML` → `@Min(100) @Max(3000)`
  - `stock` → `@Min(0)`
  - Si `tipo = ALCOHOLICA` → `gradosAlcohol` obligatorio (0.5 a 45), `azucarPorLitro` null
  - Si `tipo = SIN_ALCOHOL` → `azucarPorLitro` obligatorio (>= 0), `gradosAlcohol` y `certificada` null
- `VentaRequest`:
  - `bebidaId` → `@NotNull`
  - `unidades` → `@Min(1)`

---

## ⚙️ Bloque 4: Lógica de Negocio (Servicios)

| # | Tarea | Asignado | Estado |
|---|---|---|---|
| 5 | Implementar `BebidaService` (CRUD + cálculo de precio + conversión DTO) | [Nombre] | [ ] |
| 6 | Implementar `VentaService` (registro + reglas de negocio + conversión DTO) | [Nombre] | [ ] |

**Reglas de negocio a recordar:**
- **Precio alcohólica:** $3.500 base (+20% si no certificada)
- **Precio sin alcohol:** $2.000 base (+10% si azúcar > 80g/L)
- **Límite por cliente:** 3 unidades para alcohólicas (lee de `application.properties`)
- **Orden de rechazo en venta:**
  1. `VENTA_RESTRINGIDA`
  2. `LIMITE_EXCEDIDO`
  3. `STOCK_INSUFICIENTE`
- Las ventas rechazadas se guardan en BD con estado `RECHAZADA` y su motivo.

**Notas sobre DTOs:**
- El Service recibe `BebidaRequest` / `VentaRequest`.
- El Service devuelve `BebidaResponse` / `VentaResponse`.
- Dentro del Service se hace la conversión: DTO → Entidad → BD → Entidad → DTO.

---

## 🌐 Bloque 5: API REST (Controladores)

| # | Tarea | Asignado | Estado |
|---|---|---|---|
| 7 | Crear `BebidaController` (CRUD + restricción) usando DTOs | [Nombre] | [ ] |
| 8 | Crear `VentaController` (registro y listado) usando DTOs | [Nombre] | [ ] |

**Endpoints a implementar:**
- `GET /api/bebidas` (opcional `?nombre=`)
- `GET /api/bebidas/{id}`
- `POST /api/bebidas` → `201 Created` + header `Location`
- `PUT /api/bebidas/{id}`
- `DELETE /api/bebidas/{id}` → `204 No Content`
- `PATCH /api/bebidas/{id}/restriccion`
- `POST /api/ventas` → `201 Created` o `409 Conflict`
- `GET /api/ventas`

**Respuestas esperadas:**
- `200` → éxito en GET
- `201` → creación exitosa
- `204` → eliminación exitosa
- `400` → errores de validación campo por campo
- `404` → bebida/venta no encontrada
- `409` → venta rechazada

---

## 🛡️ Bloque 6: Errores y Configuración

| # | Tarea | Asignado | Estado |
|---|---|---|---|
| 9 | Crear excepciones personalizadas (`VentaException`, `RecursoNoEncontradoException`) | [Nombre] | [ ] |
| 10 | Crear `GlobalExceptionHandler` (`@ControllerAdvice`) | [Nombre] | [ ] |
| 11 | Configurar CORS para `http://localhost:5173` | [Nombre] | [ ] |

**Códigos de estado esperados:**
- `400 Bad Request` → errores de validación campo por campo
- `404 Not Found` → bebida/venta no existe
- `409 Conflict` → venta rechazada (restricción, límite, stock)

---

## 🧪 Bloque 7: Integración y Pruebas

| # | Tarea | Asignado | Estado |
|---|---|---|---|
| 12 | Probar endpoints con Postman/Thunder Client antes de conectar frontend | Ambas | [ ] |
| 13 | Probar integración frontend-backend completa | Ambas | [ ] |
| 13 | (Opcional) Migrar a MySQL | Ambas | [ ] |

**Pruebas obligatorias:**
- [ ] Listar bebidas con y sin filtro por nombre
- [ ] Crear bebida alcohólica y sin alcohol
- [ ] Actualizar una bebida
- [ ] Eliminar una bebida
- [ ] Alternar venta restringida
- [ ] Registrar venta autorizada (descuenta stock)
- [ ] Registrar venta rechazada por restricción
- [ ] Registrar venta rechazada por límite de unidades
- [ ] Registrar venta rechazada por stock insuficiente
- [ ] Validar que `400` devuelve errores campo por campo
- [ ] Ver historial de ventas incluyendo rechazadas

---

## 🧠 Decisiones de arquitectura (para recordar)

| Decisión | ¿Por qué? |
|---|---|
| **Precio calculado, no guardado** | El diagrama ER no incluye `precio`. Evita redundancia y refleja siempre las reglas actuales. |
| **DTOs Request/Response** | Separa el modelo de persistencia del contrato de la API. Permite validar condicionalmente y devolver campos calculados. |
| **H2 ahora, MySQL al final** | H2 permite desarrollar rápido sin instalar nada. MySQL se activa solo cambiando perfil y variables de entorno. |
| **Ventas rechazadas se guardan** | El historial debe mostrar también rechazadas con su motivo. |

---

## 📝 Bitácora Diaria

### Día 1 - [Fecha]

**[Nombre]:**
- Hice: ...
- Bloqueo: ...
- Próximo: ...

**[Nombre]:**
- Hice: ...
- Bloqueo: ...
- Próximo: ...

### Día 2 - [Fecha]

...
