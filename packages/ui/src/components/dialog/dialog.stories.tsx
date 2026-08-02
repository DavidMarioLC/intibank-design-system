import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, waitFor, within } from "storybook/test";

import { Button } from "../button";
import { Field } from "../field";
import { Input } from "../input";
import { Dialog } from "./dialog";

const meta = {
  title: "Feedback/Dialog",
  component: Dialog.Popup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog.Popup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Confirmation: Story = {
  name: "Confirmación",
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button />}>Transferir</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Confirmar transferencia</Dialog.Title>
            <Dialog.Description>
              Vas a enviar S/ 1,250.00 a Rosa Quispe (BCP · **** 8842). La
              operación no se puede revertir.
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
  ),
};

export const Destructive: Story = {
  name: "Acción destructiva",
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button variant="outline" />}>
        Bloquear tarjeta
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Bloquear la Visa Inti **** 4021</Dialog.Title>
            <Dialog.Description>
              Se rechazarán los consumos y las suscripciones asociadas. Podés
              desbloquearla desde la app cuando quieras.
            </Dialog.Description>
          </Dialog.Header>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline" />}>
              Cancelar
            </Dialog.Close>
            <Dialog.Close render={<Button variant="destructive" />}>
              Bloquear
            </Dialog.Close>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

export const WithForm: Story = {
  name: "Con formulario",
  render: () => (
    <Dialog.Root>
      <Dialog.Trigger render={<Button />}>Editar alias</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Backdrop />
        <Dialog.Popup>
          <Dialog.Header>
            <Dialog.Title>Editar alias de la cuenta</Dialog.Title>
            <Dialog.Description>
              Es el nombre con el que ves la cuenta dentro de la app.
            </Dialog.Description>
          </Dialog.Header>
          <Field.Root name="alias">
            <Field.Label>Alias</Field.Label>
            <Input defaultValue="Cuenta Sol" />
            <Field.Description>Máximo 24 caracteres.</Field.Description>
          </Field.Root>
          <Dialog.Footer>
            <Dialog.Close render={<Button variant="outline" />}>
              Cancelar
            </Dialog.Close>
            <Dialog.Close render={<Button />}>Guardar</Dialog.Close>
          </Dialog.Footer>
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  ),
};

/* El popup se porta a `body`, así que las consultas van contra `screen` y no
   contra el canvas de la story. */
export const OpenAndConfirm: Story = {
  name: "Abrir y confirmar",
  ...Confirmation,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const screen = within(canvasElement.ownerDocument.body);

    await step("abre el diálogo desde el trigger", async () => {
      await userEvent.click(canvas.getByRole("button", { name: "Transferir" }));

      const dialog = await screen.findByRole("dialog");
      await expect(dialog).toHaveAccessibleName("Confirmar transferencia");
      await expect(dialog).toHaveAccessibleDescription(
        /Vas a enviar S\/ 1,250.00/,
      );
    });

    await step("cierra al confirmar", async () => {
      await userEvent.click(screen.getByRole("button", { name: "Confirmar" }));

      await waitFor(() =>
        expect(screen.queryByRole("dialog")).not.toBeInTheDocument(),
      );
    });
  },
};
