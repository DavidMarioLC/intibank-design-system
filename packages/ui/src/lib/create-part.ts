import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

import { cn } from "./cn";

/* Props de una pieza que solo aporta layout y clases: no encapsula
   comportamiento, así que lo único que agrega sobre el elemento nativo es
   `render`, la convención de Base UI para decidir el tag desde afuera. */
export interface PartProps
  extends Omit<useRender.ComponentProps<"div">, "ref"> {}

/* Fábrica de las piezas de composición (Card.Header, Dialog.Footer, etc.).
   Todas hacen lo mismo —fusionar clases y delegar el tag a `render`— y el tag
   por defecto solo es un default: el nivel de heading de un título o si una
   tarjeta es `<div>` o `<article>` lo decide la página que la usa, no el
   componente, y forzarlo rompería el outline del documento. */
export function createPart(
  displayName: string,
  defaultTagName: keyof React.JSX.IntrinsicElements,
  baseClassName: string,
) {
  const Part = React.forwardRef<HTMLElement, PartProps>(
    ({ className, render, ...props }, ref) =>
      useRender({
        render,
        ref,
        defaultTagName,
        props: { className: cn(baseClassName, className), ...props },
      }),
  );

  Part.displayName = displayName;

  return Part;
}
