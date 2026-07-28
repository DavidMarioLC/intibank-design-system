"use client";

import { useSyncExternalStore } from "react";

const SHADES = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;

function subscribeNoop() {
  return () => {};
}

function getServerSnapshot() {
  return null;
}

function useResolvedColor(varName: string) {
  return useSyncExternalStore(
    subscribeNoop,
    () =>
      getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim() || null,
    getServerSnapshot,
  );
}

function Swatch({ varName, label }: { varName: string; label: string }) {
  const hex = useResolvedColor(varName);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border">
      <div className="h-14 w-full" style={{ background: `var(${varName})` }} />
      <div className="flex flex-col gap-0.5 bg-card px-2 py-1.5 text-xs">
        <span className="font-medium text-card-foreground">{label}</span>
        <span className="font-mono text-muted-foreground">{hex ?? "—"}</span>
      </div>
    </div>
  );
}

export function ColorScale({ name }: { name: string }) {
  return (
    <div className="not-prose grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-11">
      {SHADES.map((shade) => (
        <Swatch
          key={shade}
          varName={`--color-${name}-${shade}`}
          label={String(shade)}
        />
      ))}
    </div>
  );
}

export function SemanticSwatch({
  name,
  label,
}: {
  name: string;
  label: string;
}) {
  const bgVar = `--${name}`;
  const fgVar = `--${name}-foreground`;
  const hasForeground = useResolvedColor(fgVar) !== null;

  return (
    <div className="not-prose overflow-hidden rounded-lg border border-border">
      <div
        className="flex h-16 items-center justify-center text-sm font-medium"
        style={{
          background: `var(${bgVar})`,
          color: hasForeground ? `var(${fgVar})` : undefined,
        }}
      >
        {hasForeground ? "Aa" : null}
      </div>
      <div className="flex flex-col gap-0.5 bg-card px-2 py-1.5 text-xs">
        <span className="font-medium text-card-foreground">{label}</span>
        <span className="font-mono text-muted-foreground">
          {bgVar}
          {hasForeground ? ` / ${fgVar}` : ""}
        </span>
      </div>
    </div>
  );
}

export function SemanticGrid({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {children}
    </div>
  );
}
