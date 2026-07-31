# Intibank — Design tokens

Design system tokens para Intibank, banco digital ficticio con identidad visual inspirada en la cultura incaica (Inti, el dios sol). Construido sobre Tailwind CSS v4.

## Paleta base

La paleta base son los colores "crudos" — nunca se consumen directamente en componentes, solo alimentan la capa semántica.

### Inti (dorado/ámbar solar) — primario

| Token              | Hex       |
| ------------------ | --------- |
| `--color-inti-50`  | `#fffbeb` |
| `--color-inti-100` | `#fef3c7` |
| `--color-inti-200` | `#fde68a` |
| `--color-inti-300` | `#fcd34d` |
| `--color-inti-400` | `#fbbf24` |
| `--color-inti-500` | `#f59e0b` |
| `--color-inti-600` | `#d97706` |
| `--color-inti-700` | `#b45309` |
| `--color-inti-800` | `#92400e` |
| `--color-inti-900` | `#78350f` |
| `--color-inti-950` | `#451a03` |

### Terracota (cerámica/textiles andinos) — secundario

| Token                   | Hex       |
| ----------------------- | --------- |
| `--color-terracota-50`  | `#fef4ee` |
| `--color-terracota-100` | `#fce6d4` |
| `--color-terracota-200` | `#f8caa8` |
| `--color-terracota-300` | `#f3a771` |
| `--color-terracota-400` | `#ec7d3f` |
| `--color-terracota-500` | `#de5c22` |
| `--color-terracota-600` | `#c04517` |
| `--color-terracota-700` | `#9a3412` |
| `--color-terracota-800` | `#7c2d12` |
| `--color-terracota-900` | `#672a14` |
| `--color-terracota-950` | `#391207` |

### Noche (índigo profundo) — anclaje / confianza

| Token               | Hex       |
| ------------------- | --------- |
| `--color-noche-50`  | `#f1f1fb` |
| `--color-noche-100` | `#e3e3f6` |
| `--color-noche-200` | `#c7c8ec` |
| `--color-noche-300` | `#a3a3de` |
| `--color-noche-400` | `#7a78cb` |
| `--color-noche-500` | `#5b57b8` |
| `--color-noche-600` | `#46409e` |
| `--color-noche-700` | `#363080` |
| `--color-noche-800` | `#2a2563` |
| `--color-noche-900` | `#1e1b4b` |
| `--color-noche-950` | `#0f0e2e` |

`noche` es color de **marca**, no rampa de superficies: a esta saturación un
fondo de `noche-900` se lee como una losa morada y le compite al dorado. Para
las superficies del modo oscuro está `piedra`.

### Piedra (neutros fríos, dejo índigo) — superficies del modo oscuro

Misma familia que `noche` llevada a ~10% de saturación: se percibe como neutro,
pero emparenta con el índigo en vez de con un gris puro. La rampa está
comprimida en el extremo oscuro a propósito — `950`→`600` son los escalones de
superficie, y ahí los saltos tienen que ser finos.

| Token                | Hex       | Rol en `.dark`        |
| -------------------- | --------- | --------------------- |
| `--color-piedra-50`  | `#f4f4f7` | `foreground`          |
| `--color-piedra-100` | `#e4e4eb` |                       |
| `--color-piedra-200` | `#c2c2d1` |                       |
| `--color-piedra-300` | `#9494ad` | `muted-foreground`    |
| `--color-piedra-400` | `#6e6e8f` |                       |
| `--color-piedra-500` | `#4d4d6b` |                       |
| `--color-piedra-600` | `#33334a` | `input`               |
| `--color-piedra-700` | `#292938` | `border`              |
| `--color-piedra-800` | `#1c1c29` | `muted`               |
| `--color-piedra-900` | `#14141f` | `card` / `popover`    |
| `--color-piedra-950` | `#0c0c12` | `background`          |

### Arena (neutros cálidos)

| Token               | Hex       |
| ------------------- | --------- |
| `--color-arena-50`  | `#fafaf9` |
| `--color-arena-100` | `#f5f4f2` |
| `--color-arena-200` | `#e7e4e0` |
| `--color-arena-300` | `#d3cec7` |
| `--color-arena-400` | `#a8a099` |
| `--color-arena-500` | `#7d766e` |
| `--color-arena-600` | `#5e5850` |
| `--color-arena-700` | `#453f39` |
| `--color-arena-800` | `#2e2a26` |
| `--color-arena-900` | `#1c1a17` |
| `--color-arena-950` | `#0f0d0b` |

### Semánticos base (convención estándar, sin tematizar)

| Token                 | Hex       |
| --------------------- | --------- |
| `--color-success-400` | `#4ade80` |
| `--color-success-500` | `#16a34a` |
| `--color-success-600` | `#15803d` |
| `--color-error-400`   | `#f87171` |
| `--color-error-500`   | `#dc2626` |
| `--color-error-600`   | `#b91c1c` |
| `--color-warning-400` | `#facc15` |
| `--color-warning-500` | `#eab308` |
| `--color-warning-600` | `#ca8a04` |

El escalón `400` existe para el modo oscuro: sobre fondo casi negro el `500` no
llega a 4.5:1 (`error-500` da **4.04:1**), así que el modo oscuro sube un
escalón igual que hacen los tonos de marca. Al aclararse, el par pasa a llevar
texto **oscuro** (`piedra-950`), no blanco.

---

## Variables semánticas

La capa que realmente consumen los componentes (`bg-primary`, `text-foreground`, `border-border`, etc.). Sigue la convención de shadcn/ui.

### Modo claro (`:root`)

```css
:root {
  /* Base surfaces */
  --background: var(--color-arena-50);
  --foreground: var(--color-noche-900);

  --card: #ffffff;
  --card-foreground: var(--color-noche-900);

  --popover: #ffffff;
  --popover-foreground: var(--color-noche-900);

  /* Bordes y controles */
  --border: var(--color-arena-200);
  --input: var(--color-arena-300);
  --ring: var(--color-inti-500);

  /* Muted (fondos sutiles, texto secundario) */
  --muted: var(--color-arena-100);
  --muted-foreground: var(--color-arena-600);

  /* Marca */
  --primary: var(--color-inti-600);
  --primary-foreground: var(--color-arena-50);

  --secondary: var(--color-terracota-600);
  --secondary-foreground: var(--color-arena-50);

  --accent: var(--color-noche-900);
  --accent-foreground: var(--color-arena-50);

  /* Semánticos — ver "Superficie vs. texto" abajo */
  --destructive: var(--color-error-500);
  --destructive-foreground: #ffffff;
  --destructive-text: var(--color-error-600);

  --success: var(--color-success-600);
  --success-foreground: #ffffff;
  --success-text: var(--color-success-600);

  --warning: var(--color-warning-500);
  --warning-foreground: var(--color-noche-900);
  --warning-text: var(--color-warning-700);
}
```

### Modo oscuro (`.dark`)

Las superficies se construyen sobre `piedra`, no sobre `noche` (ver arriba). El
modo claro se queda cálido (`arena`) y el oscuro frío (`piedra`): es
deliberado — adobe bajo el sol de día, piedra andina de noche.

```css
.dark {
  --background: var(--color-piedra-950);
  --foreground: var(--color-piedra-50);

  --card: var(--color-piedra-900);
  --card-foreground: var(--color-piedra-50);

  --popover: var(--color-piedra-900);
  --popover-foreground: var(--color-piedra-50);

  --border: var(--color-piedra-700);
  --input: var(--color-piedra-600);
  --ring: var(--color-inti-400);

  --muted: var(--color-piedra-800);
  --muted-foreground: var(--color-piedra-300);

  --primary: var(--color-inti-500);
  --primary-foreground: var(--color-piedra-950);

  --secondary: var(--color-terracota-500);
  --secondary-foreground: var(--color-piedra-950);

  --accent: var(--color-inti-400);
  --accent-foreground: var(--color-piedra-950);

  --destructive: var(--color-error-500);
  --destructive-foreground: #ffffff;
  --destructive-text: var(--color-error-400);

  --success: var(--color-success-600);
  --success-foreground: #ffffff;
  --success-text: var(--color-success-400);

  --warning: var(--color-warning-500);
  --warning-foreground: var(--color-noche-900);
  --warning-text: var(--color-warning-400);
}
```

Nótese que los semánticos de estado **no** aclaran su superficie en modo oscuro,
a diferencia de `primary` / `secondary`. Un botón destructivo en `error-400`
queda rosa pastel y se lee menos grave que el secundario — exactamente al revés
de lo que la jerarquía de riesgo necesita. El que sube un escalón es `X-text`.

Contraste del modo oscuro (todos AA, ≥ 4.5:1):

| Par                                  | Ratio  |
| ------------------------------------ | ------ |
| `foreground` / `background`          | 17.8:1 |
| `foreground` / `card`                | 16.6:1 |
| `muted-foreground` / `background`    | 6.6:1  |
| `muted-foreground` / `card`          | 6.2:1  |
| `primary` / `background`             | 9.1:1  |
| `primary-foreground` / `primary`     | 9.1:1  |
| `destructive-text` / `background`    | 7.1:1  |
| `destructive-foreground` / `destructive` | 4.8:1 |
| `success-text` / `background`        | 11.2:1 |
| `success-foreground` / `success`     | 5.0:1  |
| `warning-text` / `background`        | 12.7:1 |
| `warning-foreground` / `warning`     | 10.2:1 |

`muted-foreground` usa `piedra-300` y no `piedra-400` porque este último da
3.98:1 — no alcanza para texto.

---

## Notas de uso

- **Dos capas, no una**: la paleta base (`inti-*`, `terracota-*`, `noche-*`, `arena-*`, `piedra-*`) nunca se referencia directo en componentes. Siempre se consume a través de la capa semántica (`primary`, `background`, `foreground`, etc.). Si el color de marca cambia en el futuro, se edita en un solo lugar y todo el sistema se actualiza.
- **`--accent` depende del contexto**: es el token más variable — pensado para hover sutil o énfasis secundario (ítem de menú activo, por ejemplo). Vale la pena revisarlo una vez aplicado a componentes reales como `DropdownMenu` o `Tabs`.
- **Contraste sobre amarillo/ámbar**: `--warning-foreground` usa un tono oscuro (`noche-900` / `noche-950`) en vez de blanco, porque el amarillo base es demasiado claro para texto blanco legible. Regla general: texto oscuro sobre amarillo/ámbar, texto blanco sobre rojo/verde/índigo saturado.
- **Ajuste de saturación en modo oscuro**: `--primary`, `--ring`, `--secondary` y los semánticos de estado bajan un escalón (600→500, 500→400) en modo oscuro porque los tonos muy saturados pierden visibilidad sobre fondos oscuros. Cuando un token se aclara así, su `-foreground` cambia de blanco a `piedra-950` — es el caso de `destructive` y `success` en `.dark`.
- **Superficies vs. marca**: `noche` no se usa como fondo. Es el índigo de identidad; a esa saturación una superficie grande se lee morada y le compite al dorado. Las superficies oscuras salen de `piedra`, que es la misma familia desaturada.
- **Semánticos de estado sin tematizar**: `success`, `destructive` y `warning` usan convención universal (verde/rojo/amarillo) y no la identidad incaica — en un banco, romper esa convención por consistencia visual puede confundir al usuario.
- **Superficie vs. texto**: cada semántico de estado viene en dos sabores porque los roles piden lo contrario. El par `X` / `X-foreground` es una **superficie** (fondo de botón, badge) y se mide contra su propio texto encima. `X-text` es el color como **texto o ícono** sobre `background` y se mide contra el fondo de la página. Un solo valor no puede cumplir ambos: al aclarar el rojo para que se lea sobre el fondo oscuro, deja de contrastar con el blanco que lleva encima. Regla práctica: `bg-destructive` para superficies, `text-destructive-text` para mensajes. Los **bordes** (input inválido) usan la superficie: WCAG pide 3:1 para elementos no textuales, no 4.5:1, y `error-500` da 4.04:1.
- **El amarillo no sirve como texto sobre fondo claro**: ningún escalón por debajo de `warning-700` llega a 4.5:1 contra `background` en modo claro (`warning-600` da 2.81:1). Por eso `--warning-text` usa el 700 y existe ese escalón en la paleta.
- **Integración con Tailwind v4**: estas variables semánticas se declaran en `@layer base`, no en `@theme` (que es donde va la paleta base generadora de utilidades). Para usarlas como utilidades nativas de Tailwind (`bg-primary`, `text-foreground`), se remapean también dentro de un bloque `@theme inline` apuntando a estas mismas variables — el mismo patrón que usa la plantilla oficial de shadcn/ui para Tailwind v4.
