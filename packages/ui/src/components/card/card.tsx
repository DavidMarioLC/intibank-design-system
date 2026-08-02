import { createPart, type PartProps } from "../../lib/create-part";

/* Card no tiene primitiva en Base UI (no hay comportamiento que encapsular),
   pero sí expone `render` como el resto de la librería: el nivel de heading
   de `Card.Title` y el tag de `Card.Root` dependen de la página que la usa
   —una tarjeta de saldo dentro de un `<section>` no siempre es un `h3`—
   y forzar un tag fijo rompería el orden del outline. */
export interface CardPartProps extends PartProps {}

const CardRoot = createPart(
  "Card.Root",
  "div",
  "flex flex-col rounded-lg border border-border bg-card text-card-foreground shadow-sm",
);

const CardHeader = createPart(
  "Card.Header",
  "div",
  "flex flex-col gap-1.5 p-6",
);

const CardTitle = createPart(
  "Card.Title",
  "h3",
  "text-base font-semibold leading-none",
);

const CardDescription = createPart(
  "Card.Description",
  "p",
  "text-sm text-muted-foreground",
);

/* `pt-0` porque en la práctica Content casi siempre va debajo de Header y el
   gap entre ambos ya lo pone el padding inferior de Header. Una Card sin
   Header se compensa con `className="pt-6"`. */
const CardContent = createPart("Card.Content", "div", "p-6 pt-0");

const CardFooter = createPart(
  "Card.Footer",
  "div",
  "flex items-center gap-2 p-6 pt-0",
);

export const Card = {
  Root: CardRoot,
  Header: CardHeader,
  Title: CardTitle,
  Description: CardDescription,
  Content: CardContent,
  Footer: CardFooter,
};
