import React from 'react';
import styles from './input.module.scss';

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  hint?: string[];
};

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  isValid,
  required = false,
  hint,
}) => {
  const inputClass = `${styles.input} ${
    isValid === true ? styles.valid : isValid === false ? styles.invalid : ''
  }`;

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        {label}
        {required && <span className={styles.required}>*</span>}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClass}
      />
      {hint && hint.length > 0 && (
        <ul className={styles.hintList}>
          {hint.map((h, i) => (
            <li key={i} className={styles.hintItem}>
              {h}
            </li>
          ))}
        </ul>
      )}
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
