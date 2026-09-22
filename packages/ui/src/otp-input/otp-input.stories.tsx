import { OtpInput, type OtpInputProps } from "@intibank/ui";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import { useCallback, useState } from "react";
import { expect, fn, waitFor } from "storybook/test";

function ControlledOtpInput(props: OtpInputProps) {
  const [value, setValue] = useState(props.value);
  const handleValueChange = useCallback(
    (nextValue: string) => {
      setValue(nextValue);
      props.onValueChange(nextValue);
    },
    [props.onValueChange]
  );

  return (
    <OtpInput {...props} onValueChange={handleValueChange} value={value} />
  );
}

const meta = {
  args: {
    helperText: "Ingresa el código de seis dígitos que recibiste.",
    label: "Código de verificación",
    onValueChange: fn(),
    value: "",
  },
  component: OtpInput,
  decorators: [
    (Story, context) => {
      const StoryContainer = context.viewMode === "story" ? "main" : "div";

      return (
        <StoryContainer style={{ width: "min(34rem, calc(100vw - 2rem))" }}>
          <Story />
        </StoryContainer>
      );
    },
  ],
  parameters: {
    layout: "centered",
  },
  render: (args) => <ControlledOtpInput {...args} />,
  tags: ["autodocs"],
  title: "OtpInput",
} satisfies Meta<typeof OtpInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  play: async ({ args, canvas, userEvent }) => {
    const input = canvas.getByRole("textbox", {
      name: "Código de verificación",
    });
    await userEvent.click(input);
    await userEvent.type(input, "12");
    await expect(input).toHaveValue("12");
    await expect(args.onValueChange).toHaveBeenLastCalledWith("12");
  },
};

export const PartiallyFilled: Story = {
  args: {
    value: "739",
  },
};

export const Completed: Story = {
  args: {
    value: "739418",
  },
};

export const Invalid: Story = {
  args: {
    errorMessage: "El código ingresado no es válido.",
    value: "739410",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "739",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox")).toBeDisabled();
  },
};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: "739418",
  },
  play: async ({ canvas }) => {
    await expect(canvas.getByRole("textbox")).toHaveAttribute("readonly");
  },
};

export const KeyboardAndPaste: Story = {
  play: async ({ canvas, userEvent }) => {
    const input = canvas.getByRole("textbox") as HTMLInputElement;
    const field = input.closest(".ib-otp-input");
    await userEvent.click(input);
    await userEvent.paste("73 94-18");
    await expect(input).toHaveValue("739418");
    await expect(
      new FormData(canvas.getByTestId("otp-form") as HTMLFormElement).get("otp")
    ).toBe("739418");

    input.setSelectionRange(2, 4);
    input.dispatchEvent(
      new KeyboardEvent("keyup", { bubbles: true, key: "Shift" })
    );
    await waitFor(() => {
      expect(field?.querySelectorAll("[data-selected]")).toHaveLength(2);
    });
    await userEvent.keyboard("00");
    await expect(input).toHaveValue("730018");
    await userEvent.keyboard("{ArrowLeft}{Backspace}");
    await expect(input).toHaveValue("73018");
  },
  render: (args) => (
    <form data-testid="otp-form">
      <ControlledOtpInput {...args} name="otp" />
    </form>
  ),
};

export const NarrowContainer: Story = {
  args: {
    value: "739",
  },
  decorators: [
    (Story) => (
      <div style={{ width: 280 }}>
        <Story />
      </div>
    ),
  ],
};

const customTheme = {
  "--intibank-otp-input-cell-border": "#6366f1",
  "--intibank-otp-input-cell-filled-background": "#eef2ff",
  "--intibank-otp-input-cell-foreground": "#1e1b4b",
  "--intibank-otp-input-focus": "#c2410c",
} as CSSProperties;

export const CustomTheme: Story = {
  args: {
    value: "7394",
  },
  decorators: [
    (Story) => (
      <div style={{ ...customTheme, width: "min(34rem, calc(100vw - 2rem))" }}>
        <Story />
      </div>
    ),
  ],
};
