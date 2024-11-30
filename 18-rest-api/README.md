# Comparativa: REST vs OData vs GraphQL

## REST vs OData vs GraphQL

Esta guía explora las principales características, ventajas y desventajas de REST, OData y GraphQL, ayudando a seleccionar la mejor opción para desarrollar una API eficiente y escalable.

---

## 1. REST (Representational State Transfer)

### Descripción  
REST es un estilo arquitectónico para construir APIs, basado en recursos identificados por URLs y operados mediante métodos HTTP estándar (GET, POST, PUT, DELETE).

### Ventajas
- **Simplicidad:** Fácil de entender y ampliamente adoptado.
- **Estándar:** Utiliza HTTP y formatos comunes como JSON o XML.
- **Caché:** Los endpoints se pueden cachear fácilmente.
- **Independencia:** Escalable y compatible con múltiples tecnologías.

### Desventajas
- **Problemas de sub/over-fetching:** Puede devolver más o menos datos de los requeridos.
- **Falta de flexibilidad:** Los endpoints son estáticos y menos adaptables a diferentes clientes.
- **Evolución:** Cambiar un endpoint puede afectar a los clientes.

---

## 2. OData (Open Data Protocol)

### Descripción  
OData es un estándar basado en REST que agrega soporte para consultas avanzadas, como filtros, paginación y operaciones sobre datos relacionados. Diseñado para trabajar directamente con datos estructurados.

### Ventajas
- **Consultas avanzadas:** Soporte nativo para filtros (`$filter`), ordenamiento (`$orderby`), selección (`$select`), etc.
- **Estandarización:** Define especificaciones detalladas, reduciendo las inconsistencias.
- **Interoperabilidad:** Integra bien con sistemas que manejan datos estructurados, como bases de datos.

### Desventajas
- **Complejidad:** Tiene una curva de aprendizaje más alta que REST.
- **Rigidez:** No ofrece la flexibilidad de modelado dinámico como GraphQL.
- **Adopción:** Menos popular que REST o GraphQL, limitando su soporte.

---

## 3. GraphQL

### Descripción  
GraphQL es un lenguaje de consulta para APIs que permite a los clientes definir exactamente qué datos necesitan. Fue desarrollado por Facebook en 2015 como una alternativa moderna a REST.

### Ventajas
- **Flexibilidad:** Los clientes pueden solicitar solo los datos necesarios, resolviendo el problema de sub/over-fetching.
- **Esquema fuerte:** Proporciona un esquema bien definido que facilita el desarrollo y el consumo de la API.
- **Desempeño:** Reduce el número de solicitudes gracias a la obtención de datos relacionados en una única consulta.

### Desventajas
- **Complejidad inicial:** Configurar y aprender GraphQL puede ser desafiante.
- **Caché:** Implementar caché requiere técnicas específicas.
- **Sobrecarga en el servidor:** Las consultas mal diseñadas pueden sobrecargar el servidor.

---

## Comparativa

| **Característica**       | **REST**          | **OData**        | **GraphQL**       |
|---------------------------|-------------------|------------------|-------------------|
| **Estilo**               | Arquitectura REST | Extensión de REST| Lenguaje de consulta |
| **Estandarización**      | Bajo              | Alto             | Moderado          |
| **Flexibilidad**         | Limitada          | Moderada         | Alta              |
| **Curva de aprendizaje** | Baja              | Moderada         | Alta              |
| **Over/Under-fetching**  | Sí                | Mitigado         | No                |
| **Soporte avanzado**     | Depende del diseño| Consultas nativas| Altamente personalizable |
| **Popularidad**          | Alta              | Moderada         | Alta              |

---

## Selección: GraphQL

### Motivo de la Selección  
Elegimos GraphQL por su flexibilidad, capacidad para resolver problemas comunes de REST, y su adopción creciente. Permite consultas específicas y dinámicas, siendo ideal para aplicaciones modernas con múltiples tipos de clientes.

---
