import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/cn";

export const inputVariants = cva(
  "flex w-full rounded-md border border-input bg-card text-foreground shadow-xs transition-colors placeholder:text-muted-foreground outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[invalid]:border-destructive data-[invalid]:focus-visible:ring-destructive aria-invalid:border-destructive aria-invalid:focus-visible:ring-destructive",
  {
    variants: {
      size: {
        sm: "h-8 px-2.5 text-sm",
        default: "h-10 px-3 text-sm",
        lg: "h-12 px-4 text-base",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
);

export interface InputProps
  extends Omit<BaseInput.Props, "className" | "size">,
    VariantProps<typeof inputVariants> {
  className?: string;
}

export const Input = React.forwardRef<HTMLElement, InputProps>(
  ({ className, size, ...props }, ref) => {
    return (
      <BaseInput
        ref={ref}
        className={cn(inputVariants({ size }), className)}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
