import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Button } from "../button";
import { Dialog } from "./dialog";

function Confirmacion({
  onOpenChange,
}: {
  onOpenChange?: (open: boolean) => void;
}) {
  return (
    <Dialog.Root onOpenChange={onOpenChange}>
      <Dialog.Trigger render={<Button />}>Transferir</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop data-testid="backdrop" />
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Confirmar transferencia</Dialog.Title>
            <Dialog.Description>
              Vas a enviar S/ 1,250.00 a Rosa Quispe.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline" />}>
              Cancelar
            </Dialog.Close>
            <Dialog.Close render={<Button />}>Confirmar</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

describe("Dialog", () => {
  it("stays closed until the trigger is pressed", () => {
    render(<Confirmacion />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("opens from the trigger", async () => {
    const user = userEvent.setup();
    render(<Confirmacion />);

    await user.click(screen.getByRole("button", { name: "Transferir" }));

    expect(await screen.findByRole("dialog")).toBeInTheDocument();
  });

  it("names and describes the dialog with Title and Description", async () => {
    const user = userEvent.setup();
    render(<Confirmacion />);

    await user.click(screen.getByRole("button", { name: "Transferir" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveAccessibleName("Confirmar transferencia");
    expect(dialog).toHaveAccessibleDescription(
      "Vas a enviar S/ 1,250.00 a Rosa Quispe.",
    );
  });

  it("closes from any Close and reports the change", async () => {
    const user = userEvent.setup();
    const onOpenChange = vi.fn();
    render(<Confirmacion onOpenChange={onOpenChange} />);

    await user.click(screen.getByRole("button", { name: "Transferir" }));
    await screen.findByRole("dialog");
    await user.click(screen.getByRole("button", { name: "Cancelar" }));

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
    expect(onOpenChange).toHaveBeenLastCalledWith(false, expect.anything());
  });

  it("closes on Escape", async () => {
    const user = userEvent.setup();
    render(<Confirmacion />);

    await user.click(screen.getByRole("button", { name: "Transferir" }));
    await screen.findByRole("dialog");
    await user.keyboard("{Escape}");

    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
    );
  });

  /* El diálogo es modal por defecto: Base UI envuelve el resto de la página en
     un contenedor `aria-hidden`, que es lo que evita que un lector de pantalla
     siga leyendo la pantalla anterior mientras el diálogo pide una
     confirmación. Se comprueba por rol y no por texto: las consultas `*ByRole`
     son las que excluyen los subárboles ocultos del árbol accesible. */
  it("hides the rest of the page from assistive tech while open", async () => {
    const user = userEvent.setup();
    render(
      <div>
        <h1>Saldo disponible</h1>
        <Confirmacion />
      </div>,
    );

    const fondo = { name: "Saldo disponible" };
    expect(screen.getByRole("heading", fondo)).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Transferir" }));
    await screen.findByRole("dialog");

    expect(screen.queryByRole("heading", fondo)).not.toBeInTheDocument();
  });

  it("merges a custom className over the popup classes", async () => {
    const user = userEvent.setup();
    render(
      <Dialog.Root>
        <Dialog.Trigger render={<Button />}>Abrir</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Popup className="max-w-lg">
            <Dialog.Title>Título</Dialog.Title>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>,
    );

    await user.click(screen.getByRole("button", { name: "Abrir" }));

    const dialog = await screen.findByRole("dialog");
    expect(dialog).toHaveClass("max-w-lg");
    expect(dialog).not.toHaveClass("max-w-md");
  });
});
