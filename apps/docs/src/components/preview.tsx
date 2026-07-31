/* `bg-background`, no `bg-card`: el bloque simula la superficie de una
   pantalla del producto, y los controles que van adentro (Input, Card) usan
   `bg-card` para elevarse sobre ella. Con el preview también en `bg-card` los
   dos quedaban al mismo nivel y los inputs se perdían contra el fondo. */
export function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div className="not-prose flex flex-wrap items-center gap-3 rounded-lg border border-border bg-background p-6">
      {children}
    </div>
  );
}
