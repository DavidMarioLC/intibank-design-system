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

Si consumís el paquete desde un monorepo con symlinks, Tailwind necesita que le señales el código de la librería para generar sus clases:

```css
@source "../node_modules/intibank-ui/dist";
```

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

Los controles se componen dentro de `Field` y no reimplementan label ni mensajes de error. Cada componente exporta también sus variantes (`buttonVariants`, `inputVariants`) por si necesitás las clases sin el componente.

## Design tokens

Sistema de dos capas: una **paleta base** con los valores crudos y una capa de **variables semánticas** que es la única que consumen los componentes. Si el color de marca cambia, se edita en un lugar y todo el sistema se actualiza.

La paleta base son cinco rampas: `inti` (dorado solar, primario), `terracota` (secundario), `noche` (índigo de marca), `piedra` (neutros fríos, superficies del modo oscuro) y `arena` (neutros cálidos, modo claro), más los semánticos de estado.

Las variables semánticas siguen la convención de shadcn/ui — `background`, `foreground`, `card`, `border`, `input`, `ring`, `muted`, `primary`, `secondary`, `accent`, `destructive`, `success`, `warning` — cada una con su `-foreground`. Los semánticos de estado suman un `-text` para cuando el color se usa como texto en vez de superficie: son roles con requisitos de contraste opuestos y no los cumple un valor único.

Modo oscuro con la clase `.dark` en un ancestro. Todos los pares de color cumplen WCAG AA.

## Licencia

MIT
