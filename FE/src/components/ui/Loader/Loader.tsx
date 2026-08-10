import styles from "./Loader.module.css";

export function Loader({ label = "Loading…" }: { label?: string }) {
  return (
    <div className={styles["wrap"]} role="status" aria-live="polite">
      <span className={styles["spinner"]} />
      <span>{label}</span>
    </div>
  );
}
