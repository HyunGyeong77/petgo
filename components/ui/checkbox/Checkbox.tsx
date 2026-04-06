import React from 'react';
import styles from './checkbox.module.scss';

type CheckboxProps = {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  error?: string;
  required?: boolean;
};

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  onChange,
  error,
  required = false,
}) => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className={styles.checkbox}
        />
        <span className={styles.labelText}>
          {label}
          {required && <span className={styles.required}>*</span>}
        </span>
      </label>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Checkbox;
