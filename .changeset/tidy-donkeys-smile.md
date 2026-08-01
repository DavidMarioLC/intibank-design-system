---
"intibank-ui": minor
---

Suma `Dialog` y `Select`, y publica el puente de Tailwind dentro del paquete.

- **`Dialog`** — ventana modal para confirmar operaciones irreversibles, sobre `@base-ui/react/dialog`. Piezas: `Root`, `Trigger`, `Portal`, `Backdrop`, `Popup`, `Header`, `Title`, `Description`, `Footer`, `Close`. `Trigger` y `Close` se componen con `Button` vía `render` en vez de traer su propio estilo de botón.
- **`Select`** — desplegable de opción única sobre `@base-ui/react/select`, pensado para componerse dentro de `Field`. Su trigger reusa las variantes de `Input` para que los dos se alineen en el mismo formulario, y el listado se abre debajo del campo (`alignItemWithTrigger` en `false`, contra el default de Base UI) para no tapar el label ni el mensaje de error mientras se elige. Trae el chevron y el check inline: la librería sigue sin depender de ningún paquete de íconos.
- **Nuevo token semántico `overlay`** — el velo detrás de un `Dialog`, en ambos modos.
- **Fix**: `semantic.css` ahora incluye el bloque `@theme inline` que mapea las variables semánticas a utilidades de Tailwind (`--card` → `bg-card`). Antes vivía solo en el CSS de las apps del monorepo, así que quien instalaba el paquete desde npm importaba los tokens, veía las variables definidas y aun así renderizaba los componentes sin estilos.
