import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "../../lib/cn";

export interface TabsRootProps extends Omit<BaseTabs.Root.Props, "className"> {
  className?: string;
}

/* El layout vive acá y no en cada pantalla: `orientation="vertical"` cambia
   cómo Base UI mueve el foco con las flechas, pero no mueve un pixel por su
   cuenta. Si el componente no acompaña ese cambio con `flex-row`, cada consumo
   que quiera tabs verticales tiene que redescubrir el mismo `className`. */
const TabsRoot = React.forwardRef<HTMLDivElement, TabsRootProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Root
      ref={ref}
      className={cn(
        "flex flex-col gap-4 data-[orientation=vertical]:flex-row data-[orientation=vertical]:gap-6",
        className,
      )}
      {...props}
    />
  ),
);

TabsRoot.displayName = "Tabs.Root";

/* La variante se declara una sola vez, en `Tabs.List`, y baja al resto por CSS:
   la lista se marca con `data-variant` y `Tab` e `Indicator` se estilan contra
   ese atributo del padre. Pedírsela también a las otras dos piezas serían tres
   lugares donde escribir lo mismo —alcanza con olvidarse del indicador para
   dejar un subrayado suelto adentro de un contenedor de pastillas—, y hacerlo
   por contexto de React costaría un `React.createContext` en el módulo, que es
   justo lo que rompe cuando el paquete se importa desde un React Server
   Component. El selector no cuesta nada en runtime y funciona sin JS.

   La altura del tab viaja aparte, como custom property, y no como parte del
   selector: así el `className` de un consumo (`h-14`) sigue ganando por el
   merge de Tailwind en vez de perder por especificidad. */
export const tabsListVariants = cva(
  "relative flex items-center data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
  {
    variants: {
      variant: {
        underline:
          "gap-1 border-b border-border [--tab-height:2.5rem] data-[orientation=vertical]:border-b-0 data-[orientation=vertical]:border-r",
        pills: "gap-1 rounded-lg bg-muted p-1 [--tab-height:2rem]",
      },
    },
    defaultVariants: {
      variant: "underline",
    },
  },
);

export interface TabsListProps
  extends Omit<BaseTabs.List.Props, "className">,
    VariantProps<typeof tabsListVariants> {
  className?: string;
}

/* `relative` (en las clases de arriba) no es decorativo: el indicador se ubica
   con `offsetLeft` / `offsetTop` del tab activo, que se miden contra el ancestro
   posicionado más cercano. Sin eso, el subrayado aparece en la esquina de la
   página. */
const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, variant = "underline", ...props }, ref) => (
    <BaseTabs.List
      ref={ref}
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  ),
);

TabsList.displayName = "Tabs.List";

/* El estado activo se estiliza con `data-[active]`, que es el atributo que
   emite Base UI. `relative z-10` es lo que deja que la pastilla del indicador
   se pinte por detrás del texto en vez de taparlo. */
/* `justify-start` en vertical: apilados y estirados al ancho de la columna,
   los rótulos centrados dibujan un borde izquierdo en zigzag y cuesta barrer la
   lista con la vista. En horizontal, en cambio, cada tab se ajusta a su texto y
   centrar es lo natural. */
const tabClassName =
  "relative z-10 flex h-[var(--tab-height,2.5rem)] cursor-default select-none items-center justify-center whitespace-nowrap rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[active]:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[orientation=vertical]:justify-start";

export interface TabsTabProps extends Omit<BaseTabs.Tab.Props, "className"> {
  className?: string;
}

const TabsTab = React.forwardRef<HTMLElement, TabsTabProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Tab
      ref={ref}
      className={cn(tabClassName, className)}
      {...props}
    />
  ),
);

TabsTab.displayName = "Tabs.Tab";

/* Base UI publica la posición y el tamaño del tab activo como CSS vars en px
   (`--active-tab-left`, `--active-tab-height`, …) y deja que el diseño decida
   qué hacer con ellas. Las dos variantes parten del mismo origen —esquina
   superior izquierda de la lista— y se mueven con `translate`, que es lo que
   hace que el cambio de tab se anime en el compositor en vez de recalcular
   layout. `underline` además se corre hasta el borde lejano del tab con un
   `calc`, para apoyarse sobre la línea de la lista. */
const indicatorClassName = cn(
  "pointer-events-none absolute left-0 top-0 transition-all duration-200 ease-out",
  "[[data-variant=underline]_&]:h-0.5 [[data-variant=underline]_&]:w-[var(--active-tab-width)] [[data-variant=underline]_&]:translate-x-[var(--active-tab-left)] [[data-variant=underline]_&]:translate-y-[calc(var(--active-tab-top)+var(--active-tab-height)-2px)] [[data-variant=underline]_&]:bg-primary",
  "[[data-variant=underline]_&]:data-[orientation=vertical]:h-[var(--active-tab-height)] [[data-variant=underline]_&]:data-[orientation=vertical]:w-0.5 [[data-variant=underline]_&]:data-[orientation=vertical]:translate-x-[calc(var(--active-tab-left)+var(--active-tab-width)-2px)] [[data-variant=underline]_&]:data-[orientation=vertical]:translate-y-[var(--active-tab-top)]",
  "[[data-variant=pills]_&]:z-0 [[data-variant=pills]_&]:h-[var(--active-tab-height)] [[data-variant=pills]_&]:w-[var(--active-tab-width)] [[data-variant=pills]_&]:translate-x-[var(--active-tab-left)] [[data-variant=pills]_&]:translate-y-[var(--active-tab-top)] [[data-variant=pills]_&]:rounded-md [[data-variant=pills]_&]:bg-card [[data-variant=pills]_&]:shadow-xs",
);

export interface TabsIndicatorProps
  extends Omit<BaseTabs.Indicator.Props, "className"> {
  className?: string;
}

/* `renderBeforeHydration` queda en el default de Base UI (`false`) y se
   documenta: en un sitio con SSR —`apps/docs` es Next.js— sin él el indicador
   recién salta a su lugar después de hidratar, y se ve el salto. */
const TabsIndicator = React.forwardRef<HTMLSpanElement, TabsIndicatorProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Indicator
      ref={ref}
      className={cn(indicatorClassName, className)}
      {...props}
    />
  ),
);

TabsIndicator.displayName = "Tabs.Indicator";

export interface TabsPanelProps
  extends Omit<BaseTabs.Panel.Props, "className"> {
  className?: string;
}

/* El panel es focusable —es lo que deja que después de elegir un tab con el
   teclado, un `Tab` más lleve al contenido y no al tab siguiente— así que
   necesita un anillo de foco propio; sin él, el foco entra a un contenedor sin
   ninguna marca visible. */
const TabsPanel = React.forwardRef<HTMLDivElement, TabsPanelProps>(
  ({ className, ...props }, ref) => (
    <BaseTabs.Panel
      ref={ref}
      className={cn(
        "flex-1 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring",
        className,
      )}
      {...props}
    />
  ),
);

TabsPanel.displayName = "Tabs.Panel";

export const Tabs = {
  Root: TabsRoot,
  List: TabsList,
  Tab: TabsTab,
  Indicator: TabsIndicator,
  Panel: TabsPanel,
};
