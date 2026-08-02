import * as React from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { cn } from "../../lib/cn";
import { createPart, type PartProps } from "../../lib/create-part";

export interface DialogBackdropProps
  extends Omit<BaseDialog.Backdrop.Props, "className"> {
  className?: string;
}

/* La transición va sobre `data-[starting-style]` / `data-[ending-style]`, los
   dos estados que Base UI aplica el frame anterior a abrir y el posterior a
   cerrar. Es lo que permite animar el cierre sin retener el nodo a mano: Base
   UI espera a que la transición termine antes de desmontar. */
const DialogBackdrop = React.forwardRef<HTMLDivElement, DialogBackdropProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Backdrop
      ref={ref}
      className={cn(
        "fixed inset-0 z-50 bg-overlay transition-opacity duration-200 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className,
      )}
      {...props}
    />
  ),
);

DialogBackdrop.displayName = "Dialog.Backdrop";

export interface DialogPopupProps
  extends Omit<BaseDialog.Popup.Props, "className"> {
  className?: string;
}

/* `max-h` + `overflow-y-auto` y no una altura libre: un diálogo de
   confirmación con el detalle de una transferencia crece con el contenido, y
   en un teléfono en horizontal el footer con el botón de confirmar se iba
   abajo del viewport sin forma de alcanzarlo. */
const DialogPopup = React.forwardRef<HTMLDivElement, DialogPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Popup
      ref={ref}
      className={cn(
        "fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 flex-col gap-4 overflow-y-auto rounded-lg border border-border bg-popover p-6 text-popover-foreground shadow-lg outline-none transition-all duration-200 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className,
      )}
      {...props}
    />
  ),
);

DialogPopup.displayName = "Dialog.Popup";

export interface DialogTitleProps
  extends Omit<BaseDialog.Title.Props, "className"> {
  className?: string;
}

/* Title y Description envuelven las primitivas en vez de ser piezas de layout:
   Base UI las conecta con `aria-labelledby` / `aria-describedby` del popup, así
   que un `<h2>` suelto con las mismas clases dejaría el diálogo sin nombre
   accesible. */
const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, ...props }, ref) => (
    <BaseDialog.Title
      ref={ref}
      className={cn("text-lg font-semibold leading-none", className)}
      {...props}
    />
  ),
);

DialogTitle.displayName = "Dialog.Title";

export interface DialogDescriptionProps
  extends Omit<BaseDialog.Description.Props, "className"> {
  className?: string;
}

const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  DialogDescriptionProps
>(({ className, ...props }, ref) => (
  <BaseDialog.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

DialogDescription.displayName = "Dialog.Description";

export interface DialogPartProps extends PartProps {}

const DialogHeader = createPart(
  "Dialog.Header",
  "div",
  "flex flex-col gap-1.5",
);

/* `flex-col-reverse` en móvil: apilados, la acción primaria va arriba —es la
   que el pulgar alcanza primero— pero en el orden del DOM sigue yendo última,
   que es donde el foco y los lectores de pantalla la esperan. */
const DialogFooter = createPart(
  "Dialog.Footer",
  "div",
  "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
);

/* Root, Trigger, Portal y Close se re-exportan sin envolver: no pintan nada
   propio. Trigger y Close se componen con el Button de la librería vía
   `render` (`<Dialog.Close render={<Button variant="outline" />}>`) en vez de
   traer su propio estilo de botón, que sería un segundo lugar donde mantener
   las mismas variantes. */
export const Dialog = {
  Root: BaseDialog.Root,
  Trigger: BaseDialog.Trigger,
  Portal: BaseDialog.Portal,
  Backdrop: DialogBackdrop,
  Popup: DialogPopup,
  Header: DialogHeader,
  Title: DialogTitle,
  Description: DialogDescription,
  Footer: DialogFooter,
  Close: BaseDialog.Close,
};
