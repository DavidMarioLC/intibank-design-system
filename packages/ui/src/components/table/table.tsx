import { useRender } from "@base-ui/react/use-render";
import * as React from "react";

import { cn } from "../../lib/cn";
import { createPart, type PartProps } from "../../lib/create-part";

/* Como Card, Table no envuelve una primitiva de Base UI: no hay
   comportamiento que encapsular —el navegador y el lector de pantalla ya
   entienden `<table>`— y lo que aporta la librería es la tipografía, los
   bordes y la alineación. Lo que sí sigue son sus convenciones: cada pieza
   acepta `render` y todas las props nativas de su elemento. */
export type TablePartProps<
  TagName extends keyof React.JSX.IntrinsicElements = "div",
> = PartProps<TagName>;

/* El contenedor de scroll es una pieza aparte y no algo que `Table.Root`
   renderice por dentro: si Root escupiera un `div` envolviendo al `<table>`,
   `render` quedaría ambiguo (¿qué de los dos reemplaza?) y una tabla dentro de
   una Card que ya scrollea terminaría con dos contenedores anidados. Explícito
   cuesta una línea y deja decidir dónde vive el overflow.

   `w-full` sin `overflow-y`: el eje vertical lo maneja la página. Acotar el
   alto acá dejaría el header desplazándose fuera de vista sin nada que lo fije,
   que es peor que una tabla larga. */
const TableScroller = createPart(
  "Table.Scroller",
  "div",
  "w-full overflow-x-auto",
);

/* `border-collapse` para que los bordes de fila sean una línea y no dos
   pegadas; `caption-bottom` porque en una lista de movimientos el caption
   funciona como pie ("Últimos 30 días"), no como título — el título ya lo pone
   la página. */
const TableRoot = createPart(
  "Table.Root",
  "table",
  "w-full caption-bottom border-collapse text-sm",
);

const TableCaption = createPart(
  "Table.Caption",
  "caption",
  "mt-4 text-sm text-muted-foreground",
);

const TableHeader = createPart(
  "Table.Header",
  "thead",
  "[&_tr]:border-b [&_tr]:border-border",
);

/* La última fila no lleva borde: el `<tbody>` casi siempre termina contra el
   borde de la Card o contra el `<tfoot>`, y la línea propia queda duplicada. */
const TableBody = createPart(
  "Table.Body",
  "tbody",
  "[&_tr:last-child]:border-0",
);

const TableFooter = createPart(
  "Table.Footer",
  "tfoot",
  "border-t border-border bg-muted font-medium [&_tr]:border-0",
);

/* El hover no promete que la fila sea clickeable: en una tabla de movimientos
   —fecha a la izquierda, monto a la derecha, varias columnas en el medio— es
   lo que deja seguir la fila con la vista de punta a punta. Por eso está en
   todas las filas y no solo en las que llevan un enlace. */
const TableRow = createPart(
  "Table.Row",
  "tr",
  "border-b border-border transition-colors hover:bg-muted/50",
);

export type TableCellProps<TagName extends "th" | "td"> = PartProps<TagName> & {
  /* Alinea a la derecha y fija el ancho de los dígitos. En una columna de
     montos las dos cosas van juntas: sin `tabular-nums` las comas y los unos
     bailan entre filas y el punto decimal deja de formar una vertical, que es
     justo lo que hace comparable una columna de plata. Vive acá y no en el
     `className` de cada celda porque si cada pantalla lo escribe a mano,
     alcanza con que una se lo olvide para que esa tabla se lea distinta. */
  numeric?: boolean;
};

function createCell<TagName extends "th" | "td">(
  displayName: string,
  defaultTagName: TagName,
  baseClassName: string,
) {
  /* Mismo motivo que en `createPart`: el cuerpo desestructura sobre el tipo
     concreto porque `TagName` sin resolver no expone miembros. */
  const Cell = React.forwardRef<HTMLTableCellElement, TableCellProps<TagName>>(
    (allProps, ref) => {
      const { className, render, numeric, ...props } =
        allProps as TableCellProps<"td">;

      return useRender({
        render,
        ref,
        defaultTagName,
        props: {
          className: cn(
            baseClassName,
            numeric && "text-right tabular-nums",
            className,
          ),
          ...props,
        },
      });
    },
  );

  Cell.displayName = displayName;

  return Cell;
}

/* `whitespace-nowrap` en el encabezado y no en las celdas: un rótulo cortado
   en dos líneas desalinea toda la fila de headers, mientras que el contenido
   —la descripción de un movimiento— sí tiene que poder envolver. */
const TableHead = createCell(
  "Table.Head",
  "th",
  "h-10 whitespace-nowrap px-3 text-left align-middle text-xs font-medium text-muted-foreground",
);

const TableCell = createCell("Table.Cell", "td", "px-3 py-3 align-middle");

export const Table = {
  Scroller: TableScroller,
  Root: TableRoot,
  Caption: TableCaption,
  Header: TableHeader,
  Body: TableBody,
  Footer: TableFooter,
  Row: TableRow,
  Head: TableHead,
  Cell: TableCell,
};
