import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";

const repositoryRoot = resolve(import.meta.dirname, "..");
const temporaryDirectory = mkdtempSync(join(tmpdir(), "intibank-package-"));

execFileSync(
  "pnpm",
  [
    "--filter",
    "@intibank/ui",
    "pack",
    "--pack-destination",
    temporaryDirectory,
  ],
  { cwd: repositoryRoot, stdio: "inherit" }
);

const tarballName = readdirSync(temporaryDirectory).find((file) =>
  file.endsWith(".tgz")
);
if (!tarballName) {
  throw new Error("pnpm pack did not create a tarball");
}

const tarballPath = join(temporaryDirectory, tarballName);
const tarballEntries = execFileSync("tar", ["-tf", tarballPath], {
  encoding: "utf8",
})
  .trim()
  .split("\n");
const forbiddenTarballEntries = tarballEntries.filter(
  (file) =>
    file.startsWith("package/src/") ||
    file.startsWith("package/node_modules/") ||
    file.includes(".stories.") ||
    file.includes(".test.") ||
    file.includes("tailwind") ||
    file.includes("tsconfig") ||
    file.startsWith("package/apps/") ||
    file.startsWith("package/openspec/")
);
if (forbiddenTarballEntries.length > 0) {
  throw new Error(
    `Packed package contains internal files:\n${forbiddenTarballEntries.join("\n")}`
  );
}

writeFileSync(
  join(temporaryDirectory, "package.json"),
  `${JSON.stringify(
    {
      dependencies: {
        "@intibank/ui": `file:${tarballPath}`,
        "@vitejs/plugin-react": "5.1.1",
        react: "19.2.8",
        "react-dom": "19.2.8",
        vite: "7.2.6",
      },
      devDependencies: {},
      name: "intibank-consumer-smoke",
      private: true,
      scripts: { build: "vite build" },
      type: "module",
    },
    null,
    2
  )}\n`
);
writeFileSync(
  join(temporaryDirectory, "index.html"),
  '<div id="root"></div><script type="module" src="/src.jsx"></script>\n'
);
writeFileSync(
  join(temporaryDirectory, "src.jsx"),
  `import React from "react";
import { createRoot } from "react-dom/client";
	import { Button } from "@intibank/ui";
	import { ArrowRightIcon } from "@intibank/ui/icons";
import "@intibank/ui/styles.css";
import "./theme.css";
	createRoot(document.querySelector("#root")).render(
	  <>
	    <Button variant="secondary"><ArrowRightIcon aria-hidden="true" />Transferir</Button>
	    <Button variant="outline">Ver movimientos</Button>
	  </>
	);
`
);
writeFileSync(
  join(temporaryDirectory, "theme.css"),
  ":root { --intibank-button-secondary-background: #1e1b4b; --intibank-button-secondary-foreground: #ffffff; }\n"
);

execFileSync(
  "npm",
  ["install", "--ignore-scripts", "--no-audit", "--no-fund"],
  {
    cwd: temporaryDirectory,
    stdio: "inherit",
  }
);
execFileSync("npm", ["run", "build"], {
  cwd: temporaryDirectory,
  stdio: "inherit",
});
execFileSync(
  "node",
  [
    "-e",
    'const { ArrowRightIcon } = require("@intibank/ui/icons"); if (typeof ArrowRightIcon !== "object" && typeof ArrowRightIcon !== "function") throw new Error("CommonJS icon export is unavailable");',
  ],
  { cwd: temporaryDirectory, stdio: "inherit" }
);

const installedPackage = join(temporaryDirectory, "node_modules/@intibank/ui");
for (const file of [
  "LICENSE",
  "README.md",
  "dist/icons.cjs",
  "dist/icons.d.ts",
  "dist/icons.js",
  "dist/index.js",
  "dist/index.cjs",
  "dist/index.d.ts",
  "dist/styles.css",
]) {
  if (!existsSync(join(installedPackage, file))) {
    throw new Error(`Packed package is missing ${file}`);
  }
}

const packageJson = JSON.parse(
  readFileSync(join(installedPackage, "package.json"), "utf8")
);
if (
  packageJson.name !== "@intibank/ui" ||
  packageJson.version !== "0.1.0" ||
  packageJson.license !== "MIT"
) {
  throw new Error("Packed package identity or license is incorrect");
}
if (
  packageJson.repository?.type !== "git" ||
  packageJson.repository?.url !==
    "git+https://github.com/DavidMarioLC/intibank-design-system.git" ||
  packageJson.repository?.directory !== "packages/ui" ||
  packageJson.homepage !==
    "https://github.com/DavidMarioLC/intibank-design-system#readme" ||
  packageJson.bugs?.url !==
    "https://github.com/DavidMarioLC/intibank-design-system/issues"
) {
  throw new Error("Packed package repository metadata is incorrect");
}
for (const keyword of [
  "accessibility",
  "components",
  "design-system",
  "intibank",
  "react",
  "ui",
]) {
  if (!packageJson.keywords?.includes(keyword)) {
    throw new Error(`Packed package keywords are missing ${keyword}`);
  }
}
if (
  readFileSync(join(installedPackage, "LICENSE"), "utf8") !==
  readFileSync(join(repositoryRoot, "LICENSE"), "utf8")
) {
  throw new Error("Packed package license differs from the repository license");
}
if (
  !readFileSync(join(installedPackage, "README.md"), "utf8").includes(
    "pnpm add @intibank/ui react react-dom"
  )
) {
  throw new Error("Packed package README is missing installation guidance");
}
if (
  !(
    packageJson.exports?.["./icons"]?.import &&
    packageJson.exports?.["./icons"]?.require &&
    packageJson.exports?.["./icons"]?.types &&
    packageJson.exports?.["./styles.css"] &&
    packageJson.exports?.["."].types
  )
) {
  throw new Error("Packed package exports are incomplete");
}
if (packageJson.dependencies?.["@phosphor-icons/react"] !== "2.1.10") {
  throw new Error("Packed package is missing the pinned Phosphor dependency");
}

const esm = readFileSync(join(installedPackage, "dist/index.js"), "utf8");
const cjs = readFileSync(join(installedPackage, "dist/index.cjs"), "utf8");
if (!(esm.includes("@base-ui/react") && cjs.includes("@base-ui/react"))) {
  throw new Error("Base UI must remain external to the bundle");
}
if (!(esm.includes("react") && cjs.includes("react"))) {
  throw new Error("React must remain external to the bundle");
}

const iconsEsm = readFileSync(join(installedPackage, "dist/icons.js"), "utf8");
const iconsCjs = readFileSync(join(installedPackage, "dist/icons.cjs"), "utf8");
const iconTypes = readFileSync(
  join(installedPackage, "dist/icons.d.ts"),
  "utf8"
);
if (!iconsEsm.includes("@phosphor-icons/react")) {
  throw new Error("Phosphor must remain external to the ESM icon bundle");
}
if (/require\(["']@phosphor-icons\/react/.test(iconsCjs)) {
  throw new Error(
    "The CommonJS icon bundle must include the curated workaround"
  );
}
if (!(iconsCjs.includes('require("react")') && iconsCjs.length < 100_000)) {
  throw new Error(
    "The CommonJS workaround must stay bounded with React external"
  );
}
for (const iconName of ["ArrowRightIcon", "CheckIcon", "PlusIcon", "XIcon"]) {
  if (!iconTypes.includes(iconName)) {
    throw new Error(`Packed icon declarations are missing ${iconName}`);
  }
}

const css = readFileSync(join(installedPackage, "dist/styles.css"), "utf8");
if (!(css.includes("--intibank-color-primary") && css.includes(".ib-button"))) {
  throw new Error("Compiled CSS is missing tokens or component selectors");
}
if (/\*,\s*::(before|after)/.test(css)) {
  throw new Error("Compiled CSS unexpectedly contains a global reset");
}

console.log(`Verified packed consumer in ${temporaryDirectory}`);
