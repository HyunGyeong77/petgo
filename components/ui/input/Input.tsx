'use client'

import React from 'react';
import styles from './input.module.scss';
import { useState } from 'react';

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  isValid?: boolean;
  required?: boolean;
  disabled?: boolean;
  readonly?: boolean;
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
  disabled = false,
  readonly = false,
  hint,
}) => {
  // type이 password 일 때만 사용
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const typePassword = type === "password";

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
        type={!typePassword ? type : (showPassword ? "text" : "password")}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`${inputClass} ${typePassword && styles.inputPassword}`}
        disabled={disabled}
        readOnly={readonly}
      />
      {typePassword && 
        <button 
          className={styles.screenBtn} 
          onClick={(e) => {
            e.preventDefault();
            setShowPassword(prev => !prev)
          }}
          aria-label={showPassword ? "패스워드 숨기기" : "패스워드 보이기"}
        >
          <i className={showPassword ? "ri-eye-off-fill" : "ri-eye-fill"}></i>
        </button>
      }
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
