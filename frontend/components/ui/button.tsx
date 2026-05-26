import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "destructive" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles =
      "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

    const variants = {
      primary: "bg-primary text-primary-foreground hover:bg-primary/90",
      secondary:
        "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      destructive:
        "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      ghost: "hover:bg-muted hover:text-foreground",
      outline:
        "border border-border bg-transparent hover:bg-muted hover:text-foreground",
    };

    const sizes = {
      sm: "h-8 px-3 text-sm",
      md: "h-10 px-4 text-sm",
      lg: "h-12 px-6 text-base",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
