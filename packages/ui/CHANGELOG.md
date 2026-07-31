# intibank-ui

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
