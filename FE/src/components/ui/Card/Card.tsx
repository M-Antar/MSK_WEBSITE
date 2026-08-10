import type { ReactNode, MouseEventHandler, KeyboardEventHandler, MouseEvent } from "react";
import styles from "./Card.module.css";

interface CardProps {
  children: ReactNode;
  hoverable?: boolean;
  flush?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export function Card({
  children,
  hoverable = false,
  flush = false,
  className = "",
  onClick,
}: CardProps) {
  const classes = [styles["card"], hoverable ? styles["hoverable"] : "", flush ? styles["flush"] : "", className]
    .filter(Boolean)
    .join(" ");

  const handleKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (onClick && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      onClick(e as unknown as MouseEvent<HTMLDivElement>);
    }
  };

  return (
    <div
      className={classes}
      onClick={onClick}
      role={onClick ? "link" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      {children}
    </div>
  );
}