---
"intibank-ui": minor
---

Agrega el componente `Tabs`, sobre `@base-ui/react/tabs`: `Tabs.Root`, `Tabs.List`, `Tabs.Tab`, `Tabs.Indicator` y `Tabs.Panel`.

- Dos variantes, `underline` (default) y `pills`, declaradas una sola vez en `Tabs.List` — el tab y el indicador las leen del `data-variant` del padre, así que no hay forma de desincronizarlas.
- Orientación horizontal y vertical, con el layout resuelto por el componente.
- Se exporta `tabsListVariants` para componer las clases desde afuera.
