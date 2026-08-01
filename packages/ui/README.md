# intibank-ui

Librería de componentes de **Intibank**, un banco digital ficticio peruano con identidad visual inspirada en la cultura incaica (concepto central: _Inti_, el dios sol).

Es un proyecto de portafolio: una versión reducida pero completa de un design system real — tokens de color en dos capas, componentes accesibles sobre [Base UI](https://base-ui.com), documentación en Fumadocs y catálogo en Storybook.

> Intibank es un concepto propio. No está asociado a ninguna entidad financiera real.

## Instalación

```bash
pnpm add intibank-ui
```

Requiere React 19 o superior como peer dependency.

## Uso

Los componentes traen sus estilos vía Tailwind CSS v4. Importá los tokens en tu CSS de entrada:

```css
@import "tailwindcss";
@import "intibank-ui/styles/tokens.css";
@import "intibank-ui/styles/semantic.css";
```

Tailwind v4 no escanea `node_modules` al detectar clases, así que hace falta señalarle el código de la librería para que genere las suyas. Esto aplica a **cualquier** consumidor, tanto instalando desde npm como enlazando el paquete desde un monorepo:

```css
@source "../node_modules/intibank-ui/dist";
```

Ajustá la ruta relativa según dónde viva tu CSS de entrada. Si los componentes se renderizan sin estilos, casi siempre es este `@source` faltante.

Después, los componentes se usan directo:

```tsx
import { Button, Field, Input } from "intibank-ui";

export function Transferencia() {
  return (
    <form>
      <Field.Root
        name="monto"
        validationMode="onBlur"
        validate={(value) =>
          Number(value) > 5000 ? "El monto excede tu límite diario" : null
        }
      >
        <Field.Label>Monto a transferir</Field.Label>
        <Input placeholder="S/ 0.00" />
        <Field.Description>Máximo S/ 5,000 por operación</Field.Description>
        <Field.Error />
      </Field.Root>

      <Button variant="primary">Transferir</Button>
    </form>
  );
}
```

## Componentes

| Componente | Descripción |
| ---------- | ----------- |
| `Button` | Acciones. Variantes `primary`, `secondary`, `destructive`, `outline`, `ghost`; tamaños `sm`, `default`, `lg`, `icon`. |
| `Field` | Envoltura de formularios: `Field.Root`, `Field.Label`, `Field.Description`, `Field.Error`. Conecta label, descripción accesible y estado de validación al control. |
| `Input` | Campo de texto. Tamaños `sm`, `default`, `lg`; estados deshabilitado e inválido. |
| `Card` | Superficie de contenido: `Card.Root`, `Card.Header`, `Card.Title`, `Card.Description`, `Card.Content`, `Card.Footer`. Cada pieza acepta `render` para decidir su tag (el nivel de heading de `Card.Title` lo elige la página, no el componente). |
| `Badge` | Estado de una transacción u operación. Variantes `neutral`, `primary`, `secondary`, `success`, `warning`, `destructive`, `outline`; tamaños `sm`, `default`. |

Los controles se componen dentro de `Field` y no reimplementan label ni mensajes de error. Cada componente exporta también sus variantes (`buttonVariants`, `inputVariants`, `badgeVariants`) por si necesitás las clases sin el componente.

## Design tokens

Sistema de dos capas: una **paleta base** con los valores crudos y una capa de **variables semánticas** que es la única que consumen los componentes. Si el color de marca cambia, se edita en un lugar y todo el sistema se actualiza.

La paleta base son cinco rampas: `inti` (dorado solar, primario), `terracota` (secundario), `noche` (índigo de marca), `piedra` (neutros fríos, superficies del modo oscuro) y `arena` (neutros cálidos, modo claro), más los semánticos de estado.

Las variables semánticas siguen la convención de shadcn/ui — `background`, `foreground`, `card`, `border`, `input`, `ring`, `muted`, `primary`, `secondary`, `accent`, `destructive`, `success`, `warning` — cada una con su `-foreground`. Los semánticos de estado suman un `-text` para cuando el color se usa como texto en vez de superficie: son roles con requisitos de contraste opuestos y no los cumple un valor único.

Modo oscuro con la clase `.dark` en un ancestro. Todos los pares de color cumplen WCAG AA.

## Licencia

MIT
