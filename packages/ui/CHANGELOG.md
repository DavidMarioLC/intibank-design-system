# intibank-ui

## 0.4.0

### Minor Changes

- 31b397d: Suma `Dialog` y `Select`, y publica el puente de Tailwind dentro del paquete.

  - **`Dialog`** — ventana modal para confirmar operaciones irreversibles, sobre `@base-ui/react/dialog`. Piezas: `Root`, `Trigger`, `Portal`, `Backdrop`, `Popup`, `Header`, `Title`, `Description`, `Footer`, `Close`. `Trigger` y `Close` se componen con `Button` vía `render` en vez de traer su propio estilo de botón.
  - **`Select`** — desplegable de opción única sobre `@base-ui/react/select`, pensado para componerse dentro de `Field`. Su trigger reusa las variantes de `Input` para que los dos se alineen en el mismo formulario, y el listado se abre debajo del campo (`alignItemWithTrigger` en `false`, contra el default de Base UI) para no tapar el label ni el mensaje de error mientras se elige. Trae el chevron y el check inline: la librería sigue sin depender de ningún paquete de íconos.
  - **Nuevo token semántico `overlay`** — el velo detrás de un `Dialog`, en ambos modos.
  - **Fix**: `semantic.css` ahora incluye el bloque `@theme inline` que mapea las variables semánticas a utilidades de Tailwind (`--card` → `bg-card`). Antes vivía solo en el CSS de las apps del monorepo, así que quien instalaba el paquete desde npm importaba los tokens, veía las variables definidas y aun así renderizaba los componentes sin estilos.

## 0.3.0

### Minor Changes

- 1fcaa16: Agregar `Card` y `Badge`, la primera tanda de la categoría "Data display".

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

## 0.2.0

### Minor Changes

- 5c9faeb: Add `Input` (sizes: sm, default, lg; disabled and invalid states) and the `Field` compound (`Field.Root`, `Field.Label`, `Field.Description`, `Field.Error`), both built on `@base-ui/react`. `Field` wires the label, accessible description and validation state to any control, so `Input` stays a pure control.
- 4d83215: Reconstruir las superficies del modo oscuro sobre una rampa nueva, `piedra`.

  `noche` es el índigo de marca y estaba haciendo doble trabajo como rampa de
  superficies: a esa saturación un `background` o un `card` se leen como una losa
  morada y le compiten al dorado de `primary`. `piedra` es la misma familia
  llevada a ~10% de saturación — se percibe neutra, pero emparenta con el índigo
  en vez de con un gris puro. En `.dark`, `background`, `card`, `popover`,
  `muted`, `border`, `input` y `foreground` pasan de `noche-*` a `piedra-*`.

  Los semánticos de estado se desdoblan en dos roles. `destructive`, `success` y
  `warning` se usaban a la vez como superficie (fondo del `Button` destructivo) y
  como texto (mensaje de `Field.Error`), y esos roles piden lo contrario: la
  superficie se mide contra el texto que lleva encima, el texto contra el fondo de
  la página. Ningún valor único cumple ambos en modo oscuro. Ahora el par
  `X` / `X-foreground` es la superficie y el token nuevo **`X-text`** es el color
  como texto o ícono. `Field.Error` pasa de `text-destructive` a
  `text-destructive-text`.

  Correcciones de contraste que salen de ahí:

  - `--success-foreground` era blanco sobre `success-500` (**3.3:1**, no cumplía
    AA en ningún modo). `success` pasa a `success-600`, que con blanco da 5.0:1.
  - El mensaje de error en modo oscuro pasa de 4.04:1 a **7.1:1**.
  - Se agregan los escalones `success-400`, `error-400`, `warning-400` (texto en
    modo oscuro) y `warning-700` (texto en modo claro — el amarillo no llega a
    4.5:1 sobre fondo claro en ningún escalón menor).

  Los bordes del estado inválido siguen usando la superficie: WCAG pide 3:1 para
  elementos no textuales, no 4.5:1.

- 2fd717a: Add Button component (variants: primary, secondary, destructive, outline, ghost; sizes: sm, default, lg, icon), built on `@base-ui/react`'s Button primitive.

### Patch Changes

- 919eee0: Update @base-ui/react from 1.0.0-rc.0 to 1.6.0
