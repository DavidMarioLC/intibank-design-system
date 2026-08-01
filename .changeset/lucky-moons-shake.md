---
"intibank-ui": minor
---

Agregar `Card` y `Badge`, la primera tanda de la categoría "Data display".

`Card` es un compuesto de piezas sin comportamiento (`Card.Root`, `Card.Header`,
`Card.Title`, `Card.Description`, `Card.Content`, `Card.Footer`) para agrupar un
producto del usuario con su saldo y sus acciones. No envuelve una primitiva de
Base UI porque no hay nada que encapsular, pero cada pieza acepta `render` vía
`useRender`: el nivel de heading de `Card.Title` y el tag de `Card.Root` dependen
de la página que la usa, y fijarlos en el componente rompería el outline o
impediría que la tarjeta entera sea un enlace.

`Badge` es la etiqueta de estado de una transacción, con siete variantes
(`neutral`, `primary`, `secondary`, `success`, `warning`, `destructive`,
`outline`) y dos tamaños. Las variantes de estado usan el par `X` /
`X-foreground` —el rol de superficie de los semánticos, no `X-text`— porque el
badge es un fondo de color con texto encima y su contraste se mide contra ese
texto, no contra el fondo de la página.
