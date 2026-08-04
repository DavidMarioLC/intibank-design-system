import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Tabs } from "./tabs";

/* `eventDetails: unknown` en vez del tipo real de Base UI: el handler solo se
   usa para espiar el valor, y anotarlo así evita arrastrar un import de tipos
   internos a cada helper de test. */
function ProductosDeCuenta({
  onValueChange,
  activateOnFocus,
  keepMounted,
}: {
  onValueChange?: (value: unknown, eventDetails: unknown) => void;
  activateOnFocus?: boolean;
  keepMounted?: boolean;
} = {}) {
  return (
    <Tabs.Root defaultValue="movimientos" onValueChange={onValueChange}>
      <Tabs.List activateOnFocus={activateOnFocus}>
        <Tabs.Tab value="movimientos">Movimientos</Tabs.Tab>
        <Tabs.Tab value="detalle">Detalle</Tabs.Tab>
        <Tabs.Tab value="cci" disabled>
          CCI
        </Tabs.Tab>
        <Tabs.Indicator />
      </Tabs.List>
      <Tabs.Panel value="movimientos" keepMounted={keepMounted}>
        Yape a Rosa Quispe — S/ 45.00
      </Tabs.Panel>
      <Tabs.Panel value="detalle" keepMounted={keepMounted}>
        Cuenta Sol en soles, abierta el 12/03/2024
      </Tabs.Panel>
      <Tabs.Panel value="cci" keepMounted={keepMounted}>
        002-193-001234567890-14
      </Tabs.Panel>
    </Tabs.Root>
  );
}

describe("Tabs", () => {
  it("shows only the panel of the active tab", () => {
    render(<ProductosDeCuenta />);

    expect(screen.getByRole("tabpanel")).toHaveTextContent(
      "Yape a Rosa Quispe",
    );
    expect(screen.queryByText(/Cuenta Sol en soles/)).not.toBeInTheDocument();
  });

  it("wires each tab to its panel", () => {
    render(<ProductosDeCuenta />);

    const tab = screen.getByRole("tab", { name: "Movimientos" });
    const panel = screen.getByRole("tabpanel");

    expect(
      within(screen.getByRole("tablist")).getAllByRole("tab"),
    ).toHaveLength(3);
    expect(tab).toHaveAttribute("aria-selected", "true");
    expect(tab).toHaveAttribute("aria-controls", panel.id);
    expect(panel).toHaveAttribute("aria-labelledby", tab.id);
  });

  it("switches panels on click and reports the new value", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ProductosDeCuenta onValueChange={onValueChange} />);

    await user.click(screen.getByRole("tab", { name: "Detalle" }));

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Cuenta Sol");
    expect(screen.getByRole("tab", { name: "Movimientos" })).toHaveAttribute(
      "aria-selected",
      "false",
    );
    expect(onValueChange).toHaveBeenCalledWith("detalle", expect.anything());
  });

  it("moves focus with the arrow keys and activates with Enter", async () => {
    const user = userEvent.setup();
    render(<ProductosDeCuenta />);

    /* Roving tabindex: un solo Tab del teclado entra al tablist y cae en el
       tab activo, no en el primero de la lista. */
    await user.tab();
    expect(screen.getByRole("tab", { name: "Movimientos" })).toHaveFocus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Detalle" })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Yape a Rosa");

    await user.keyboard("{Enter}");
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Cuenta Sol");
  });

  it("activates on arrow focus when activateOnFocus is set", async () => {
    const user = userEvent.setup();
    render(<ProductosDeCuenta activateOnFocus />);

    await user.tab();
    await user.keyboard("{ArrowRight}");

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Cuenta Sol");
  });

  it("does not select a disabled tab", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ProductosDeCuenta onValueChange={onValueChange} />);

    await user.click(screen.getByRole("tab", { name: "CCI" }));

    expect(screen.getByRole("tabpanel")).toHaveTextContent("Yape a Rosa");
    expect(onValueChange).not.toHaveBeenCalled();
  });

  it("keeps hidden panels in the DOM with keepMounted", () => {
    render(<ProductosDeCuenta keepMounted />);

    const oculto = screen.getByText(/Cuenta Sol en soles/);
    expect(oculto).toBeInTheDocument();
    expect(oculto).not.toBeVisible();
  });

  it("merges a custom className over the tab classes", () => {
    render(
      <Tabs.Root defaultValue="movimientos">
        <Tabs.List>
          <Tabs.Tab value="movimientos" className="h-14">
            Movimientos
          </Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>,
    );

    const tab = screen.getByRole("tab");
    expect(tab).toHaveClass("h-14");
    expect(tab).not.toHaveClass("h-[var(--tab-height,2.5rem)]");
  });

  /* La variante se declara sola vez y baja por CSS: lo que hay que sostener es
     que la lista publique `data-variant`, porque es contra ese atributo que se
     estilan el tab y el indicador. */
  it("publishes the variant on the list for the other parts to read", () => {
    render(
      <Tabs.Root defaultValue="movimientos">
        <Tabs.List variant="pills">
          <Tabs.Tab value="movimientos">Movimientos</Tabs.Tab>
          <Tabs.Indicator />
        </Tabs.List>
      </Tabs.Root>,
    );

    const list = screen.getByRole("tablist");
    expect(list).toHaveAttribute("data-variant", "pills");
    expect(list).toHaveClass("[--tab-height:2rem]");
  });

  it("defaults the list variant to underline", () => {
    render(
      <Tabs.Root defaultValue="movimientos">
        <Tabs.List>
          <Tabs.Tab value="movimientos">Movimientos</Tabs.Tab>
        </Tabs.List>
      </Tabs.Root>,
    );

    expect(screen.getByRole("tablist")).toHaveAttribute(
      "data-variant",
      "underline",
    );
  });
});
