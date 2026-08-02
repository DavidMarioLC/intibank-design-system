import * as React from "react";
import { Select as BaseSelect } from "@base-ui/react/select";
import type { VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";
import { inputVariants } from "../input/input";

/* El trigger reusa `inputVariants` en vez de declarar su propia cva: es el
   mismo control de formulario que un Input —misma altura, mismo borde, mismo
   anillo de foco, mismo tratamiento de `data-[invalid]`— y con dos definiciones
   separadas alcanzaba con tocar una para que un Select y un Input dejaran de
   alinearse dentro del mismo formulario. Lo que se suma acá es lo propio de un
   botón: distribuir valor e ícono, y el estado abierto. */
export interface SelectTriggerProps
  extends Omit<BaseSelect.Trigger.Props, "className">,
    VariantProps<typeof inputVariants> {
  className?: string;
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, size, ...props }, ref) => (
    <BaseSelect.Trigger
      ref={ref}
      className={cn(
        inputVariants({ size }),
        "cursor-default items-center justify-between gap-2 text-left data-[placeholder]:text-muted-foreground data-[popup-open]:border-ring",
        className,
      )}
      {...props}
    />
  ),
);

SelectTrigger.displayName = "Select.Trigger";

export interface SelectValueProps
  extends Omit<BaseSelect.Value.Props, "className"> {
  className?: string;
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Value
      ref={ref}
      className={cn("truncate", className)}
      {...props}
    />
  ),
);

SelectValue.displayName = "Select.Value";

/* La librería no depende de ningún paquete de íconos —sumarlo obligaría a todo
   consumidor a instalarlo— pero un select sin flecha ni tilde no se lee como un
   select. Los dos glifos van inline y son solo el default: pasarle children a
   la pieza los reemplaza por el ícono del set que use el consumidor. */
function ChevronGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m4 6 4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="m3.5 8.5 3 3 6-6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export interface SelectIconProps
  extends Omit<BaseSelect.Icon.Props, "className"> {
  className?: string;
}

const SelectIcon = React.forwardRef<HTMLSpanElement, SelectIconProps>(
  ({ className, children, ...props }, ref) => (
    <BaseSelect.Icon
      ref={ref}
      className={cn(
        "flex size-4 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-150 data-[popup-open]:rotate-180 [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {children ?? <ChevronGlyph />}
    </BaseSelect.Icon>
  ),
);

SelectIcon.displayName = "Select.Icon";

export interface SelectPositionerProps
  extends Omit<BaseSelect.Positioner.Props, "className"> {
  className?: string;
}

/* `alignItemWithTrigger` en `false`, contra el default de Base UI: alineado, el
   popup se monta encima del trigger para que el ítem elegido caiga sobre el
   valor. Es elegante en un menú de preferencias, pero dentro de un formulario
   tapa el label y el mensaje de error del Field justo mientras se elige. Un
   desplegable que baja debajo del campo es lo que la gente espera de un
   formulario bancario. */
const SelectPositioner = React.forwardRef<
  HTMLDivElement,
  SelectPositionerProps
>(
  (
    { className, sideOffset = 4, alignItemWithTrigger = false, ...props },
    ref,
  ) => (
    <BaseSelect.Positioner
      ref={ref}
      sideOffset={sideOffset}
      alignItemWithTrigger={alignItemWithTrigger}
      className={cn("z-50", className)}
      {...props}
    />
  ),
);

SelectPositioner.displayName = "Select.Positioner";

export interface SelectPopupProps
  extends Omit<BaseSelect.Popup.Props, "className"> {
  className?: string;
}

/* `max-h-[var(--available-height)]`: la variable la calcula el positioner con
   el espacio real que queda hasta el borde del viewport, así que una lista de
   30 bancos hace scroll adentro del popup en vez de salirse de la pantalla. */
const SelectPopup = React.forwardRef<HTMLDivElement, SelectPopupProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Popup
      ref={ref}
      className={cn(
        "max-h-[var(--available-height)] min-w-[var(--anchor-width)] overflow-y-auto rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-md outline-none transition-[opacity,transform] duration-150 data-[ending-style]:scale-95 data-[starting-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
        className,
      )}
      {...props}
    />
  ),
);

SelectPopup.displayName = "Select.Popup";

export interface SelectListProps
  extends Omit<BaseSelect.List.Props, "className"> {
  className?: string;
}

const SelectList = React.forwardRef<HTMLDivElement, SelectListProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.List
      ref={ref}
      className={cn("outline-none", className)}
      {...props}
    />
  ),
);

SelectList.displayName = "Select.List";

export interface SelectItemProps
  extends Omit<BaseSelect.Item.Props, "className"> {
  className?: string;
}

/* `data-[highlighted]` y no `hover:`: el resaltado lo maneja Base UI y cubre
   tanto el mouse como la navegación con flechas, que es la que tiene que verse
   moverse cuando nadie está tocando el mouse. */
const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.Item
      ref={ref}
      className={cn(
        "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none data-[highlighted]:bg-muted data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

SelectItem.displayName = "Select.Item";

export interface SelectItemTextProps
  extends Omit<BaseSelect.ItemText.Props, "className"> {
  className?: string;
}

const SelectItemText = React.forwardRef<HTMLDivElement, SelectItemTextProps>(
  ({ className, ...props }, ref) => (
    <BaseSelect.ItemText
      ref={ref}
      className={cn("truncate", className)}
      {...props}
    />
  ),
);

SelectItemText.displayName = "Select.ItemText";

export interface SelectItemIndicatorProps
  extends Omit<BaseSelect.ItemIndicator.Props, "className"> {
  className?: string;
}

const SelectItemIndicator = React.forwardRef<
  HTMLSpanElement,
  SelectItemIndicatorProps
>(({ className, children, ...props }, ref) => (
  <BaseSelect.ItemIndicator
    ref={ref}
    className={cn(
      "absolute left-2 flex size-4 items-center justify-center text-primary [&_svg]:size-4",
      className,
    )}
    {...props}
  >
    {children ?? <CheckGlyph />}
  </BaseSelect.ItemIndicator>
));

SelectItemIndicator.displayName = "Select.ItemIndicator";

export interface SelectGroupLabelProps
  extends Omit<BaseSelect.GroupLabel.Props, "className"> {
  className?: string;
}

const SelectGroupLabel = React.forwardRef<
  HTMLDivElement,
  SelectGroupLabelProps
>(({ className, ...props }, ref) => (
  <BaseSelect.GroupLabel
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-xs font-medium text-muted-foreground",
      className,
    )}
    {...props}
  />
));

SelectGroupLabel.displayName = "Select.GroupLabel";

/* Root, Portal y Group se re-exportan sin envolver: no pintan nada propio.
   Root además es genérico en el tipo del valor (`Select.Root<Moneda>`), y
   envolverlo en un `forwardRef` borraría ese parámetro y dejaría `value` y
   `onValueChange` en `any`. */
export const Select = {
  Root: BaseSelect.Root,
  Trigger: SelectTrigger,
  Value: SelectValue,
  Icon: SelectIcon,
  Portal: BaseSelect.Portal,
  Positioner: SelectPositioner,
  Popup: SelectPopup,
  List: SelectList,
  Group: BaseSelect.Group,
  GroupLabel: SelectGroupLabel,
  Item: SelectItem,
  ItemText: SelectItemText,
  ItemIndicator: SelectItemIndicator,
};
