import { MoneyField } from "@intibank/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn } from "storybook/test";

const meta = {
  args: {
    label: "Monto",
    onValueChange: fn(),
  },
  component: MoneyField,
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
  title: "MoneyField",
} satisfies Meta<typeof MoneyField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultPen: Story = {
  args: { defaultValue: "1250.50" },
};

export const Empty: Story = {
  args: { placeholder: "0.00" },
};

export const UsDollar: Story = {
  args: {
    currency: "USD",
    defaultValue: "1250.50",
    label: "Monto en dólares",
    locale: "en-US",
  },
};

export const Invalid: Story = {
  args: {
    defaultValue: "0",
    errorMessage: "Ingresa un monto mayor a cero",
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "1250.50",
    disabled: true,
  },
};

export const ReadOnly: Story = {
  args: {
    defaultValue: "1250.50",
    label: "Saldo disponible",
    readOnly: true,
  },
};

export const FocusVisible: Story = {
  args: { defaultValue: "1250.50" },
  play: async ({ canvas, userEvent }) => {
    await userEvent.tab();
    const input = canvas.getByRole("textbox");
    await expect(input).toHaveFocus();
    await expect(input).toHaveValue("1250.50");
  },
};

export const FormattingInteraction: Story = {
  args: { defaultValue: "1250.50" },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox");
    await expect(input).toHaveValue("1,250.50");
    await userEvent.click(input);
    await expect(input).toHaveValue("1250.50");
    await userEvent.clear(input);
    await userEvent.type(input, "9876.5");
    await userEvent.tab();
    await expect(input).toHaveValue("9,876.50");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("9876.50");
  },
};

export const PasteInteraction: Story = {
  args: { defaultValue: "" },
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox");
    await userEvent.click(input);
    await userEvent.paste("S/ 1,250.5");
    await expect(input).toHaveValue("1250.5");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("1250.5");
  },
};
