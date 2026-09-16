import { TextField } from "@intibank/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, waitFor } from "storybook/test";

const meta = {
  args: {
    label: "Mensaje o Motivo",
    onChange: fn(),
  },
  component: TextField,
  decorators: [
    (Story) => (
      <div style={{ width: "min(40rem, calc(100vw - 2rem))" }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
  title: "TextField",
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Escribe un mensaje" },
};

export const Optional: Story = {
  args: {
    defaultValue: "Pago de Honorarios Proyecto Sol Andino",
    optional: true,
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: "Máximo 80 caracteres",
    maxLength: 80,
  },
};

export const CurrencyPrefix: Story = {
  args: {
    defaultValue: "1,250.00",
    inputMode: "decimal",
    label: "Monto",
    startAdornment: "S/.",
  },
};

export const WithSuffix: Story = {
  args: {
    defaultValue: "1500",
    endAdornment: "PEN",
    label: "Monto límite",
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: "0",
    errorMessage: "Ingresa un monto mayor a cero",
    label: "Monto",
    startAdornment: "S/.",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "No disponible",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: "Cuenta sueldo •• 4821",
    label: "Cuenta de origen",
    readOnly: true,
  },
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox");
    const control = input.closest(".ib-text-field__control");
    if (!(control instanceof HTMLElement)) {
      throw new Error("TextField control was not rendered");
    }

    await userEvent.click(control);
    await expect(input).toHaveFocus();
    await waitFor(() => {
      expect(getComputedStyle(control).borderColor).toBe("rgb(245, 158, 11)");
    });
    const pointerBorderColor = getComputedStyle(control).borderColor;

    await userEvent.tab();
    await userEvent.tab({ shift: true });
    await expect(input).toHaveFocus();
    await waitFor(() => {
      expect(getComputedStyle(control).borderColor).toBe(pointerBorderColor);
    });
  },
};

export const FocusVisible: Story = {
  args: { defaultValue: "Pago de servicios" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    await expect(canvas.getByRole("textbox")).toHaveFocus();
  },
};

export const Interaction: Story = {
  args: { defaultValue: "" },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox");
    await userEvent.click(canvas.getByText("Mensaje o Motivo"));
    await expect(input).toHaveFocus();
    await userEvent.type(input, "Pago de honorarios");
    await expect(input).toHaveValue("Pago de honorarios");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
