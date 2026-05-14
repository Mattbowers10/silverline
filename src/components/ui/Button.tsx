import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "default" | "sm" | "lg";

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-white text-black hover:bg-[var(--color-accent)] hover:text-black",
  secondary:
    "border border-[var(--color-line)] text-[var(--color-text)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]",
  ghost: "text-[var(--color-text)] hover:text-[var(--color-accent)]",
};

const sizeClasses: Record<Size, string> = {
  default: "px-6 py-3 text-[length:var(--text-15)]",
  sm: "px-4 py-2 text-[length:var(--text-13)]",
  lg: "px-7 py-3.5 text-[length:var(--text-16)]",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-full font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]/40",
          "disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
