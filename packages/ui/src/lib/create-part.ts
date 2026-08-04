import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

import { cn } from "./cn";

/* Props de una pieza que solo aporta layout y clases: no encapsula
   comportamiento, así que lo único que agrega sobre el elemento nativo es
   `render`, la convención de Base UI para decidir el tag desde afuera.

   El parámetro de tag no es cosmético: las piezas de una tabla necesitan las
   props nativas de su elemento (`colSpan` y `scope` en un `th`, `abbr` en un
   `td`), y tipar todo como `div` las dejaría fuera. Default `div` para que
   las piezas que sí son genéricas se sigan escribiendo `PartProps`. */
export type PartProps<
  TagName extends keyof React.JSX.IntrinsicElements = "div",
> = Omit<useRender.ComponentProps<TagName>, "ref">;

/* Fábrica de las piezas de composición (Card.Header, Dialog.Footer, etc.).
   Todas hacen lo mismo —fusionar clases y delegar el tag a `render`— y el tag
   por defecto solo es un default: el nivel de heading de un título o si una
   tarjeta es `<div>` o `<article>` lo decide la página que la usa, no el
   componente, y forzarlo rompería el outline del documento. */
export function createPart<TagName extends keyof React.JSX.IntrinsicElements>(
  displayName: string,
  defaultTagName: TagName,
  baseClassName: string,
) {
  /* El cuerpo desestructura sobre `PartProps` a secas: con `TagName` todavía
     sin resolver, TypeScript no conoce los miembros del tipo y no deja sacar
     `className` ni `render`. La firma de afuera sí queda genérica, que es la
     que ve quien usa la pieza. */
  const Part = React.forwardRef<HTMLElement, PartProps<TagName>>(
    (allProps, ref) => {
      const { className, render, ...props } = allProps as PartProps;

      return useRender({
        render,
        ref,
        defaultTagName,
        props: { className: cn(baseClassName, className), ...props },
      });
    },
  );

  Part.displayName = displayName;

  return Part;
}
