import type { ReactNode } from "react";
import styles from "./EmptyState.module.css";

interface EmptyStateProps {
  title: string;
  message?: string;
  action?: ReactNode;
}

export function EmptyState({ title, message, action }: EmptyStateProps) {
  return (
    <div className={styles["wrap"]}>
      <h3 className={styles["title"]}>{title}</h3>
      {message ? <p className={styles["message"]}>{message}</p> : null}
      {action ? <div className={styles["actions"]}>{action}</div> : null}
    </div>
  );
}
