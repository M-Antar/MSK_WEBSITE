import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.css";

type Variant = "primary" | "outline" | "light" | "ghost";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  block?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  block = false,
  className = "",
  children,
  ...rest
}: ButtonProps) {
  const classes = [styles["base"], styles[variant], block ? styles["block"] : "", className]
    .filter(Boolean)
    .join(" ");
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

/** Class names for rendering a link that looks like a Button. */
export function buttonClasses(variant: Variant = "primary", block = false): string {
  return [styles["base"], styles[variant], block ? styles["block"] : ""].filter(Boolean).join(" ");
}
