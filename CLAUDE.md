# Intibank Design System

Monorepo del design system de **Intibank**, un banco digital ficticio peruano con identidad visual inspirada en la cultura incaica (concepto central: Inti, el dios sol). Proyecto de portafolio — versión reducida de un design system real (tokens + guidelines + librería de componentes + documentación).

## Naming

| Nivel                                          | Nombre                   |
| ---------------------------------------------- | ------------------------ |
| Repo / monorepo raíz                           | `intibank-design-system` |
| Paquete npm publicable (`packages/ui`)         | `intibank-ui`            |
| Nombre del proyecto (README, docs, portafolio) | Intibank Design System   |
| Producto ficticio                              | Intibank                 |

No usar el nombre o marca de bancos reales (Interbank, BCP, etc.) en ningún componente, copy, o asset — Intibank es un concepto propio, solo inspirado en el _tipo_ de producto (banca digital retail).

## Testing

Stack: **Vitest + React Testing Library + `@storybook/test`**. No usar Chromatic ni Playwright (end-to-end) — overkill para el alcance de este proyecto (librería de 4-6 componentes de portafolio, no una app completa).

- Tests unitarios (`*.test.tsx`) para lógica de componentes.
- Play functions dentro de las stories de Storybook para testear interacción (click, type, etc.) — reutiliza las stories que ya se escriben, sin duplicar setup.
- `pnpm test` orquestado por Turborepo, igual que `build`.
- Ubicación: co-ubicados con cada componente en `packages/ui/src/components/<nombre>/` (ej. `button.test.tsx` junto a `button.tsx` y `button.stories.tsx`), no en una carpeta `__tests__` separada — mismo patrón que las stories, facilita mantener y borrar un componente junto con todo lo suyo. `vitest.config.ts` vive en la raíz de `packages/ui`.

## Stack

- **Componentes**: React + Base UI
- **Estilos**: Tailwind CSS v4
- **Build/bundling**: tsdown (salida ESM + CJS + `.d.ts`)
- **Monorepo**: pnpm workspaces + Turborepo
- **Docs (guidelines/principios)**: Fumadocs (Next.js)
- **Docs (catálogo de componentes)**: Storybook
- **Versionado/publicación**: Changesets
- **Package manager**: pnpm (no usar bun ni npm)

## Alcance

Librería con **4-6 componentes iniciales**, pero pensada para crecer de forma progresiva — no es un alcance fijo ni definitivo. Priorizar calidad y terminación sobre cantidad en cada tanda. Estado por el dominio (banca digital): **Button**, **Field**, **Input**, **Select** (cuenta de origen, moneda), **Card** (saldo/cuenta), **Badge** (estado de transacción), **Dialog** (confirmación de operación), **Table** (lista de movimientos) y **Tabs** (separar vistas de un mismo producto) implementados. El candidato para la próxima tanda sale de lo que más se repite en pantallas del producto: paginación o "cargar más" para la tabla de movimientos, que hoy renderiza todo lo que le pasen.

`Field` es la envoltura de formularios (label + descripción + error + estado de validación, sobre `@base-ui/react/field`); los controles (`Input`, `Select`) se componen dentro de él y no reimplementan label ni mensajes de error. `Select.Trigger` reusa `inputVariants` en lugar de declarar su propia cva: es el mismo control de formulario, y con dos definiciones separadas alcanza con tocar una para que un Select y un Input dejen de alinearse en la misma fila.

La librería **no depende de ningún paquete de íconos** — sumarlo obligaría a instalarlo a todo consumidor. Los componentes que necesitan un glifo (`Select.Icon`, `Select.ItemIndicator`) lo traen inline como default, y pasarles children lo reemplaza por el del set que use quien la consume.

`Card`, `Badge` y `Table` no envuelven una primitiva de Base UI (no hay comportamiento que encapsular), pero sí siguen sus convenciones de API: `Card` y `Table` exponen `render` en cada pieza vía la fábrica `createPart` (`packages/ui/src/lib/create-part.ts`, sobre `useRender`), para que el nivel de heading de `Card.Title`, el tag de `Card.Root` o que una celda sea `td` o `th scope="row"` los decida la página.

`Table` deja el contenedor de scroll horizontal como pieza explícita (`Table.Scroller`) en vez de esconderlo dentro de `Table.Root`: un Root que renderizara dos elementos anidados haría ambiguo a qué aplica `render`, y una tabla dentro de un contenedor que ya scrollea quedaría con dos áreas de scroll. `Table.Head` y `Table.Cell` llevan una prop `numeric` (alinea a la derecha + `tabular-nums`) porque en banca la columna de montos es la regla, no la excepción, y dejarlo librado al `className` de cada pantalla garantiza que alguna se desalinee.

**La librería no usa `React.createContext`.** `Tabs` declara su variante (`underline` / `pills`) una sola vez, en `Tabs.List`, que la publica como `data-variant`; `Tabs.Tab` y `Tabs.Indicator` se estilan contra ese atributo del padre en vez de leer un contexto. No es solo una preferencia de estilo: tsdown bundlea todo `packages/ui` en un único `index.mjs` y **descarta las directivas `"use client"` por archivo**, así que un `createContext` a nivel de módulo revienta apenas alguien importa el paquete desde un React Server Component (`apps/docs` es Next.js, y el build de docs falla con `createContext is not a function`). La única alternativa sería marcar el bundle entero como cliente, lo que arrastraría a `Badge`, `Card` y `Table` sin necesidad. Si un componente nuevo necesita pasar estado entre piezas, primero probar por atributo de datos + selector CSS.

Lo que sí viaja como custom property y no dentro del selector es todo valor que un consumo podría querer pisar desde `className` (en `Tabs`, la altura del tab: `--tab-height`). Un selector con `[data-variant=…]` gana por especificidad y dejaría a un `h-14` del consumidor sin efecto; una variable la sigue resolviendo el merge de Tailwind.

No quitar piezas del stack completo para "simplificar" — el recorte de alcance es solo en cantidad de componentes, no en arquitectura (mantener monorepo, Fumadocs, Storybook, Changesets desde el día uno).

Convenciones para el crecimiento progresivo:

- Cada componente en su propia carpeta con export en el barrel `index.ts` — sumar un componente nunca implica tocar los existentes.
- Documentar componentes en Storybook/Fumadocs agrupados por categoría (ej. "Forms", "Feedback", "Layout", "Data display") desde la primera tanda, aunque haya pocos — así los componentes nuevos caen naturalmente en su categoría sin reorganizar la navegación.
- Priorizar para la siguiente tanda los componentes que más se repetirían en pantallas del producto ficticio Intibank (ej. si una tabla se usa en varias vistas, va antes que un componente que aparece una sola vez).
- Usar Changesets para versionar cada tanda como un release incremental (`0.1.0` → `0.2.0`, etc.), documentado en `CHANGELOG.md`.
- Mantener este archivo (`CLAUDE.md`) actualizado con el alcance real cada vez que se sume una tanda nueva de componentes.

## Estructura del monorepo

```
intibank-design-system/
├── apps/
│   ├── docs/                  # Fumadocs — private, no se publica
│   └── storybook/              # Storybook — private, no se publica
├── packages/
│   ├── ui/                    # se publica como "intibank-ui"
│   │   ├── src/
│   │   │   ├── components/     # una carpeta por componente
│   │   │   │   └── <nombre>/
│   │   │   │       ├── <nombre>.tsx
│   │   │   │       ├── <nombre>.stories.tsx
│   │   │   │       └── index.ts
│   │   │   ├── styles/
│   │   │   │   ├── tokens.css      # paleta base (@theme)
│   │   │   │   └── semantic.css    # variables semánticas (:root / .dark)
│   │   │   └── index.ts            # barrel export
│   │   └── tsdown.config.ts
│   └── tsconfig/              # config de TS compartida
├── pnpm-workspace.yaml
└── turbo.json
```

- Los `.stories.tsx` viven junto a cada componente en `packages/ui`, no en `apps/storybook` — Storybook solo apunta ahí por config.
- `packages/ui` no depende de Next.js en absoluto — debe poder usarse en cualquier framework React (Next.js, Vite, Remix).
- `apps/docs` y `apps/storybook` son `"private": true`, consumen `packages/ui` vía `workspace:*`.

## Configuración de Claude Code (skills, MCP, subagents)

Estrategia de carga: `CLAUDE.md` raíz se carga siempre; `CLAUDE.md` por subcarpeta (`apps/docs/`, `apps/storybook/`, `packages/ui/`) se carga on-demand cuando Claude Code trabaja ahí. Skills se auto-descubren desde `.claude/skills/` anidados por carpeta. MCP servers se centralizan en un solo `.mcp.json` en la raíz (el soporte de MCP scoped a subcarpetas aún es inmaduro en Claude Code).

Herramientas instaladas:

| Herramienta                            | Ubicación                                                   | Fuente                            | Estado                                                                   |
| -------------------------------------- | ----------------------------------------------------------- | --------------------------------- | ------------------------------------------------------------------------ |
| Storybook MCP (`@storybook/addon-mcp`) | `.mcp.json` en la raíz, requiere Storybook corriendo en dev | Oficial (`storybookjs/addon-mcp`) | Instalado                                                                |
| Chrome DevTools MCP                    | `.mcp.json` en la raíz, requiere el dev server corriendo    | Oficial (`ChromeDevTools/chrome-devtools-mcp`) | Instalado — verificación visual de `apps/docs` (screenshots, toggle de tema, computed styles) |
| tsdown skill                           | `packages/ui/.claude/skills/`                               | Oficial (`rolldown/tsdown`)       | Instalado                                                                |
| Fumadocs skill                         | —                                                           | No hay ninguna oficial disponible | Descartado — no instalar skills de terceros no verificadas para Fumadocs |

El MCP de Chrome DevTools **no contradice** la regla de "no usar Playwright" de la sección de Testing: esa regla es sobre la estrategia de testing del proyecto (E2E en CI, overkill para esta librería). El MCP es tooling de desarrollo — vive en `.mcp.json`, no entra a `package.json`, ni a CI, ni al paquete publicado. No agregar navegadores headless como dependencia del repo.

## Documentación de referencia

- **`DESIGN.md`** — vive en la raíz del repo (no dentro de `packages/ui`). Documenta la paleta base y las variables semánticas completas (valores hex, ambos modos). Aplica a todo el monorepo, no solo a la librería — es la referencia rápida para cualquier trabajo en `apps/docs` o `apps/storybook` también, no solo en `packages/ui`. No se publica a npm; es documentación de repo, no artefacto publicable. Cuando exista una página de "Foundations → Colors" en Fumadocs, se basa en este archivo pero no lo reemplaza.

## Design tokens

Sistema de dos capas — nunca usar la paleta base directo en componentes, siempre a través de las variables semánticas.

**Fuente única para todo el monorepo**: los tokens se definen solo en `packages/ui/src/styles/` (`tokens.css` + `semantic.css`) y se exportan como parte del paquete `intibank-ui`. Ningún otro archivo del monorepo declara un valor de color nuevo — `apps/docs` y `apps/storybook` importan ese mismo CSS en vez de duplicar valores, para que la paleta nunca se desincronice entre la librería y su documentación.

Esto incluye el bloque `@theme inline` que convierte cada variable semántica en utilidad de Tailwind (`--card` → `bg-card`): vive en `semantic.css`, junto a las variables que mapea, y **no** se repite en el CSS de cada app. Las clases que genera son las que escriben los componentes de la librería, así que tiene que viajar dentro del paquete publicado — si estuviera solo en las apps del monorepo, quien instala `intibank-ui` desde npm importaría los tokens, vería las variables definidas y aun así renderizaría todo sin estilos.

- **Colores y tokens de marca**: se reutilizan igual en toda la superficie del proyecto (librería, Storybook, Fumadocs) — un sitio de docs con paleta distinta a la de los componentes que documenta se siente como un producto distinto.
- **Tipografía editorial y layout de documentación**: es una capa aparte, específica de `apps/docs` (prosa larga, jerarquía de headings, bloques de código, tabla de contenidos) — no vive en `packages/ui`, se monta sobre los tokens de color sin reemplazarlos. Fumadocs ya trae sus propios estilos base (`fumadocs-ui`) para esto, que conviven con los tokens de Intibank.

### Paleta base (identidad Intibank)

- **`inti`** (dorado/ámbar solar) — color primario/marca
- **`terracota`** (cerámica/textiles andinos) — color secundario
- **`noche`** (índigo profundo) — anclaje, fondos oscuros, transmite confianza/estabilidad
- **`arena`** (neutros cálidos, no gris azulado)
- Semánticos base (`success`, `error`, `warning`) usan convención estándar de la industria, sin tematizar — en banca, no romper la expectativa universal de verde=éxito, rojo=error.

Ver `DESIGN.md` para la tabla completa de valores hex por escalón (50-950).

### Variables semánticas (convención shadcn/ui)

`background`, `foreground`, `card`, `popover`, `border`, `input`, `ring`, `muted`, `primary`, `secondary`, `accent`, `destructive`, `success`, `warning` — cada una con su `-foreground` correspondiente. Se suma `overlay` (el velo detrás de un `Dialog`), que es la excepción a la regla: no es un color opaco sino un `color-mix` contra `transparent`, y no lleva `-foreground` porque nada se apoya encima. Definidas en `:root` (modo claro) y `.dark` (modo oscuro) en `packages/ui/src/styles/semantic.css`.

Reglas fijas a respetar:

- Texto oscuro sobre fondos amarillo/ámbar (`warning`), nunca blanco — el contraste falla.
- Texto blanco sobre rojo/verde/índigo saturado.
- En modo oscuro, los tonos saturados de marca bajan un escalón (ej. `primary` pasa de `inti-600` a `inti-500`) porque pierden visibilidad sobre fondo oscuro.

## Convenciones de código

- Componentes en `packages/ui` son "puros" — sin dependencia de Next.js, sin lógica de negocio específica de Intibank más allá de nombres/ejemplos.
- Cada componente exporta desde su propio `index.ts`, re-exportado en el barrel `packages/ui/src/index.ts`.
- Tailwind v4: paleta base en `@theme`, variables semánticas en `@layer base` (no en `@theme`).
- No usar bun ni npm para instalar dependencias — solo `pnpm`.

## Comandos esperados (a definir al armar `package.json` raíz)

- `pnpm dev` — corre docs + storybook + watch de `ui` en paralelo (vía Turborepo)
- `pnpm build` — build de `packages/ui` primero, luego `apps/*`
- `pnpm changeset` — registrar cambios para el próximo release
