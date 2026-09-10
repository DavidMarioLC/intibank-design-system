# Intibank UI

Monorepo for the provisional `@intibank/ui` React component library.

## Development

Requires Node 24 and pnpm 11.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Storybook runs at `http://localhost:6006`. Other checks:

```sh
pnpm check
pnpm typecheck
pnpm test
pnpm build
pnpm pack:check
```

## Consuming the package

Install React, React DOM, and the library, then import the distributed CSS once:

```tsx
import { Button } from "@intibank/ui";
import "@intibank/ui/styles.css";

export function TransferAction() {
  return <Button>Transferir</Button>;
}
```

Tailwind is not required in consumer applications. The stylesheet has no global
reset and only component selectors beginning with `ib-`.

### Themes and overrides

Override semantic variables globally or on a subtree:

```css
.nightfall-theme {
  --intibank-color-primary: #1e1b4b;
  --intibank-color-primary-hover: #312e81;
  --intibank-color-on-primary: #ffffff;
}
```

Variables are the supported palette API. For structural exceptions, pass a
`className` and load the consumer stylesheet after `@intibank/ui/styles.css`.

The library requests `"Hanken Grotesk"` but never downloads it. Applications may
self-host it, install `@fontsource-variable/hanken-grotesk`, or accept the system
font fallback.

### Icons

Intibank UI uses Phosphor and exposes a deliberately small catalog from the
tree-shakeable `@intibank/ui/icons` subpath:

```tsx
import { Button } from "@intibank/ui";
import { ArrowRightIcon, PlusIcon } from "@intibank/ui/icons";

export function Actions() {
  return (
    <>
      <Button>
        <ArrowRightIcon aria-hidden="true" />
        Transferir
      </Button>
      <Button aria-label="Agregar beneficiario" variant="ghost">
        <PlusIcon aria-hidden="true" />
      </Button>
    </>
  );
}
```

The initial catalog contains `ArrowRightIcon`, `CheckIcon`, `PlusIcon`, and
`XIcon`. Icons use Phosphor's regular weight by default, inherit `currentColor`,
and normalize to `1.25em` when they are direct Button children. Use 16px for dense
controls, 20px for regular buttons, and 24px for emphasized actions. Keep
functional controls flat by avoiding duotone icons.

An icon next to an equivalent visible label is decorative and must use
`aria-hidden="true"`. A control with only an icon must have an accessible name on
the control, normally through `aria-label`, while its icon remains hidden from the
accessibility tree.

The curated list is the supported Intibank vocabulary. Add to it when a component
or repeated product need requires another icon. Applications needing the broader
catalog should install `@phosphor-icons/react` directly instead of relying on
undocumented Intibank re-exports.

See [DESIGN-NORMALIZATION.md](./docs/DESIGN-NORMALIZATION.md) for the decisions
made while translating `DESIGN.md` into the first component.
