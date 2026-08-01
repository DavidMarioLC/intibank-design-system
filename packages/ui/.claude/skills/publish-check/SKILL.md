---
name: publish-check
description: Verifica si el paquete intibank-ui está apto para publicarse a npm — build limpio, tipos, tests, contenido del tarball, exports resueltos y smoke test de consumo real (ESM + CJS). Úsalo antes de cada release, cuando el usuario pregunte si el paquete está listo para publicar, o antes de correr changeset version/publish.
---

# Publish check — intibank-ui

Checklist de release para `packages/ui` (publicado como `intibank-ui`). Ejecuta **todos** los pasos y reporta al final una tabla de resultados. No arregles nada por tu cuenta salvo que el usuario lo pida: el objetivo es un diagnóstico fiable.

Trabaja siempre desde la raíz del monorepo. Usa `pnpm`, nunca `npm install` ni `bun` (`npm pack` sí, es solo empaquetado).

## 0. Preparación

```sh
git status --short
```

Si hay cambios sin commitear en `packages/ui`, avísalo: el tarball se arma desde el working tree, así que un check verde sobre cambios sin commitear no garantiza que lo publicado sea lo revisado.

## 1. Build limpio desde cero

```sh
rm -rf packages/ui/dist
pnpm --filter intibank-ui build
```

`tsdown` ya usa `clean: true`, pero el `rm -rf` previo garantiza que no queden artefactos de una entrada que ya no existe (ej. un componente borrado que sigue en `dist/`).

Debe generar exactamente: `index.mjs`, `index.cjs`, `index.d.mts`, `index.d.cts`.

## 2. Tipos y tests

```sh
pnpm --filter intibank-ui lint   # tsc --noEmit
pnpm --filter intibank-ui test   # vitest run
```

Ambos deben pasar sin errores. Un test skipped no es un fallo, pero repórtalo.

## 3. Contenido real del tarball

```sh
cd packages/ui && npm pack --dry-run
```

Verifica contra el campo `files` del `package.json`:

- **Debe incluir**: `dist/` (los 4 archivos), `src/styles/tokens.css`, `src/styles/semantic.css`, `README.md`, `LICENSE`, `package.json`.
- **NO debe incluir**: `*.stories.tsx`, `*.test.tsx`, `src/components/`, `vitest.config.ts`, `vitest.setup.ts`, `tsdown.config.ts`, `tsconfig.json`, `.claude/`, `node_modules/`.

Si aparece cualquier archivo de la lista negativa, es un fallo bloqueante: hay que corregir `files` antes de publicar.

Revisa también el tamaño reportado (`package size` / `unpacked size`). Un salto grande respecto al release anterior suele significar que se coló código fuente.

## 4. Exports resueltos

Confirma que cada ruta declarada en `exports` existe en disco:

- `./dist/index.mjs`, `./dist/index.cjs`, `./dist/index.d.mts`, `./dist/index.d.cts`
- `./src/styles/tokens.css`, `./src/styles/semantic.css`

Un subpath roto en `exports` no lo detecta ni `tsc` ni los tests — solo explota en el consumidor.

## 5. Dependencias

Sobre `packages/ui/package.json`:

- Ninguna entrada de `dependencies` con protocolo `workspace:` (npm no lo resuelve al publicar; solo se permite en `devDependencies`).
- `react` y `react-dom` viven en `peerDependencies` y en `devDependencies`, **nunca** en `dependencies` — si están ahí, el consumidor termina con dos copias de React.
- Toda dependencia importada desde `src/` (fuera de `src/**/*.stories.tsx` y `*.test.tsx`) está declarada en `dependencies` o `peerDependencies`. Verifica con:

  ```sh
  grep -rhoE 'from "[^".][^"]*"' packages/ui/src --include='*.tsx' --include='*.ts' \
    | grep -vE 'stories|test|vitest' | sort -u
  ```

  Comilla los `--include` (zsh expande el glob si van sueltos) y cruza los paquetes externos que salgan contra el `package.json`. Lo que venga de `@testing-library/*`, `storybook/*` o `vitest` es de archivos de test — no debe estar en `dependencies`.

## 6. Versión y changeset

```sh
ls .changeset/*.md
npm view intibank-ui versions --json
```

- La `version` actual de `package.json` **no** debe estar ya publicada en npm (si lo está, el `publish` falla).
- Si hay cambios desde el último release sin un changeset pendiente, señálalo: el `CHANGELOG.md` quedaría incompleto.
- Si `npm view` falla porque el paquete aún no existe en el registro, es el primer release — no es un error.

## 7. Smoke test de consumo real

El check más importante: instalar el tarball fuera del monorepo, donde no hay symlinks de pnpm que disimulen un export mal declarado.

```sh
cd packages/ui && npm pack
```

Luego, en el directorio de scratchpad de la sesión:

1. `npm init -y` en una carpeta temporal.
2. Instalar el `.tgz` generado más `react` y `react-dom` (usa `npm install` aquí — es un proyecto desechable fuera del workspace, no el monorepo).
3. Verificar los tres caminos:

   - **ESM**: `node --input-type=module -e 'import * as ui from "intibank-ui"; console.log(Object.keys(ui))'`
   - **CJS**: `node -e 'console.log(Object.keys(require("intibank-ui")))'`
   - **Tipos**: un `.ts` que importe los componentes del barrel y correr `tsc --noEmit` con `"moduleResolution": "bundler"` y `"jsx": "react-jsx"`.

Los tres deben listar todos los componentes exportados del barrel (`packages/ui/src/index.ts`). Si falta alguno, el barrel o el build están incompletos.

Borra el `.tgz` de `packages/ui` al terminar — no debe quedar en el repo.

## 8. README del paquete

`packages/ui/README.md` debe existir (es lo que se ve en la página de npm) y describir al menos: instalación, import de los CSS de tokens, y un ejemplo de uso. El README de la raíz del monorepo **no** lo reemplaza.

## Reporte final

Devuelve una tabla con una fila por check y estado `✅ / ⚠️ / ❌`, y cierra con un veredicto explícito:

- **Apto para publicar** — todo en verde.
- **Apto con observaciones** — solo `⚠️` (ej. falta un changeset, README mejorable).
- **No apto** — cualquier `❌`, con el bloqueante nombrado primero y qué hay que corregir.

Cita la salida real de los comandos que fallaron; no resumas un fallo como "hubo un error".
