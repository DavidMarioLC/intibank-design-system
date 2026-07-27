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
| `--color-success-500` | `#16a34a` |
| `--color-success-600` | `#15803d` |
| `--color-error-500`   | `#dc2626` |
| `--color-error-600`   | `#b91c1c` |
| `--color-warning-500` | `#eab308` |
| `--color-warning-600` | `#ca8a04` |

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

  /* Semánticos */
  --destructive: var(--color-error-500);
  --destructive-foreground: #ffffff;

  --success: var(--color-success-500);
  --success-foreground: #ffffff;

  --warning: var(--color-warning-500);
  --warning-foreground: var(--color-noche-900);
}
```

### Modo oscuro (`.dark`)

```css
.dark {
  --background: var(--color-noche-950);
  --foreground: var(--color-arena-50);

  --card: var(--color-noche-900);
  --card-foreground: var(--color-arena-50);

  --popover: var(--color-noche-900);
  --popover-foreground: var(--color-arena-50);

  --border: var(--color-noche-700);
  --input: var(--color-noche-600);
  --ring: var(--color-inti-400);

  --muted: var(--color-noche-800);
  --muted-foreground: var(--color-arena-400);

  --primary: var(--color-inti-500);
  --primary-foreground: var(--color-noche-950);

  --secondary: var(--color-terracota-500);
  --secondary-foreground: var(--color-noche-950);

  --accent: var(--color-inti-400);
  --accent-foreground: var(--color-noche-950);

  --destructive: var(--color-error-500);
  --destructive-foreground: #ffffff;

  --success: var(--color-success-500);
  --success-foreground: var(--color-noche-950);

  --warning: var(--color-warning-500);
  --warning-foreground: var(--color-noche-950);
}
```

---

## Notas de uso

- **Dos capas, no una**: la paleta base (`inti-*`, `terracota-*`, `noche-*`, `arena-*`) nunca se referencia directo en componentes. Siempre se consume a través de la capa semántica (`primary`, `background`, `foreground`, etc.). Si el color de marca cambia en el futuro, se edita en un solo lugar y todo el sistema se actualiza.
- **`--accent` depende del contexto**: es el token más variable — pensado para hover sutil o énfasis secundario (ítem de menú activo, por ejemplo). Vale la pena revisarlo una vez aplicado a componentes reales como `DropdownMenu` o `Tabs`.
- **Contraste sobre amarillo/ámbar**: `--warning-foreground` usa un tono oscuro (`noche-900` / `noche-950`) en vez de blanco, porque el amarillo base es demasiado claro para texto blanco legible. Regla general: texto oscuro sobre amarillo/ámbar, texto blanco sobre rojo/verde/índigo saturado.
- **Ajuste de saturación en modo oscuro**: `--primary`, `--ring` y `--secondary` bajan un escalón (600→500, 500→400) en modo oscuro porque los tonos muy saturados pierden visibilidad sobre fondos oscuros.
- **Semánticos de estado sin tematizar**: `success`, `destructive` y `warning` usan convención universal (verde/rojo/amarillo) y no la identidad incaica — en un banco, romper esa convención por consistencia visual puede confundir al usuario.
- **Integración con Tailwind v4**: estas variables semánticas se declaran en `@layer base`, no en `@theme` (que es donde va la paleta base generadora de utilidades). Para usarlas como utilidades nativas de Tailwind (`bg-primary`, `text-foreground`), se remapean también dentro de un bloque `@theme inline` apuntando a estas mismas variables — el mismo patrón que usa la plantilla oficial de shadcn/ui para Tailwind v4.
