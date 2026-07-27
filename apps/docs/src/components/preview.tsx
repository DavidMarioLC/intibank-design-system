export function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex flex-wrap items-center gap-3 rounded-lg border border-border bg-card p-6">
      {children}
    </div>
  );
}
