import styles from "./QuantitySelector.module.css";

interface QuantitySelectorProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({ value, onChange, min = 1, max = 99 }: QuantitySelectorProps) {
  return (
    <div className={styles["wrap"]}>
      <button
        type="button"
        className={styles["btn"]}
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className={styles["value"]} aria-live="polite">
        {value}
      </span>
      <button
        type="button"
        className={styles["btn"]}
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
