import * as React from "react";
import { Field as BaseField } from "@base-ui/react/field";

import { cn } from "../../lib/cn";

export interface FieldRootProps
  extends Omit<BaseField.Root.Props, "className"> {
  className?: string;
}

const FieldRoot = React.forwardRef<HTMLDivElement, FieldRootProps>(
  ({ className, ...props }, ref) => (
    <BaseField.Root
      ref={ref}
      className={cn("flex w-full flex-col gap-1.5", className)}
      {...props}
    />
  ),
);

FieldRoot.displayName = "Field.Root";

export interface FieldLabelProps
  extends Omit<BaseField.Label.Props, "className"> {
  className?: string;
}

const FieldLabel = React.forwardRef<HTMLLabelElement, FieldLabelProps>(
  ({ className, ...props }, ref) => (
    <BaseField.Label
      ref={ref}
      className={cn(
        "text-sm font-medium text-foreground data-[disabled]:opacity-50",
        className,
      )}
      {...props}
    />
  ),
);

FieldLabel.displayName = "Field.Label";

export interface FieldDescriptionProps
  extends Omit<BaseField.Description.Props, "className"> {
  className?: string;
}

const FieldDescription = React.forwardRef<
  HTMLParagraphElement,
  FieldDescriptionProps
>(({ className, ...props }, ref) => (
  <BaseField.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));

FieldDescription.displayName = "Field.Description";

export interface FieldErrorProps
  extends Omit<BaseField.Error.Props, "className"> {
  className?: string;
}

const FieldError = React.forwardRef<HTMLDivElement, FieldErrorProps>(
  ({ className, ...props }, ref) => (
    <BaseField.Error
      ref={ref}
      className={cn("text-sm text-destructive", className)}
      {...props}
    />
  ),
);

FieldError.displayName = "Field.Error";

export const Field = {
  Root: FieldRoot,
  Label: FieldLabel,
  Description: FieldDescription,
  Error: FieldError,
};
