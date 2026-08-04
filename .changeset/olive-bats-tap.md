---
"intibank-ui": minor
---

Suma `Table`, la lista tabular de movimientos.

- `Table.Scroller`, `Table.Root`, `Table.Caption`, `Table.Header`, `Table.Body`, `Table.Footer`, `Table.Row`, `Table.Head` y `Table.Cell`, cada una sobre su elemento nativo y con `render` para cambiarlo (por ejemplo una celda a `th scope="row"`).
- `Table.Head` y `Table.Cell` aceptan `numeric`: alinea a la derecha y activa `tabular-nums`, para que el punto decimal forme una vertical entre filas.
- El contenedor de scroll horizontal es una pieza aparte (`Table.Scroller`) y no algo implícito en `Table.Root`.

La fábrica interna de piezas (`createPart`) ahora es genérica sobre el tag, así cada pieza tipa las props nativas de su elemento (`colSpan` y `scope` en las celdas). Cambio interno: la forma pública de `Card` y `Dialog` no se mueve.
