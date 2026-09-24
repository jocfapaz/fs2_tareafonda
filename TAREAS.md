📄 Contenido para TAREAS.md 
# 🎯 Tareas del Proyecto - Fonda San Belarmino

> Semana de entrega: del [28/09/26] al [02/10/26]
> Integrantes: Nicolás Catalán + Josefa Roca

---

## 📋 Cómo usar esto

- [ ] `[]` = Por hacer / Pendiente
- [~] `[~]` = En progreso (copiar/pegar el símbolo ~)
- [x] `[x]` = Listo / Terminado

**Regla:** Solo una persona puede tener una tarea `[~]` a la vez para no pisarnos.

---

## 🏗️ Bloque 1: Modelo de Datos (Entidades JPA)

| # | Tarea | Asignado | Estado |
|---|-------|----------|--------|
| 1 | Crear enums `TipoBebida` y `EstadoVenta` | [Nicolás Catalán] | [~] |
| 2 | Crear entidad `Bebida` con validaciones | [Nombre] | [ ] |
| 3 | Crear entidad `Venta` con relación a Bebida | [Nombre] | [ ] |

**Notas:**
- La tarea 1 debe estar lista antes de empezar la 2 y 3.

---

## 🗄️ Bloque 2: Acceso a Datos (Repositorios)

| # | Tarea | Asignado | Estado |
|---|-------|----------|--------|
| 4 | Crear `BebidaRepository` y `VentaRepository` | [Nombre] | [ ] |

**Notas:**
- Depende de que las entidades (2 y 3) estén listas.

---

## ⚙️ Bloque 3: Lógica de Negocio (Servicios)

| # | Tarea | Asignado | Estado |
|---|-------|----------|--------|
| 5 | Implementar `BebidaService` (CRUD + precios) | [Nombre] | [ ] |
| 6 | Implementar `VentaService` (registro + reglas) | [Nombre] | [ ] |

**Reglas de negocio a recordar:**
- Precio alcohólica: $3.500 base (+20% si no certificada)
- Precio sin alcohol: $2.000 base (+10% si azúcar > 80g/L)
- Límite por cliente: 3 unidades (lee de `application.properties`)

---

## 🌐 Bloque 4: API REST (Controladores)

| # | Tarea | Asignado | Estado |
|---|-------|----------|--------|
| 7 | Crear `BebidaController` (CRUD + restricción) | [Nombre] | [ ] |
| 8 | Crear `VentaController` (registro y listado) | [Nombre] | [ ] |

**Endpoints a implementar:**
- `GET /api/bebidas`, `GET /api/bebidas/{id}`, `POST /api/bebidas`
- `PUT /api/bebidas/{id}`, `DELETE /api/bebidas/{id}`
- `PATCH /api/bebidas/{id}/restriccion`
- `POST /api/ventas`, `GET /api/ventas`

---

## 🛡️ Bloque 5: Errores y Configuración

| # | Tarea | Asignado | Estado |
|---|-------|----------|--------|
| 9 | Crear excepciones personalizadas (`VentaException`, etc.) | [Nombre] | [ ] |
| 10 | Crear `GlobalExceptionHandler` (`@ControllerAdvice`) | [Nombre] | [ ] |
| 11 | Configurar CORS | [Nombre] | [ ] |

**Códigos de estado esperados:**
- `400 Bad Request` → errores de validación campo por campo
- `404 Not Found` → bebida/venta no existe
- `409 Conflict` → venta rechazada (restricción, límite, stock)

---

## 🧪 Bloque 6: Integración y Pruebas

| # | Tarea | Asignado | Estado |
|---|-------|----------|--------|
| 12 | Probar integración frontend-backend completa | Ambas | [ ] |
| 13 | (Opcional) Migrar a MySQL | Ambas | [ ] |

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