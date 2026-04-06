import React from 'react';
import styles from './button.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const Button: React.FC<ButtonProps> = ({
  children,
  type = 'button',
  onClick,
  disabled = false,
  className = '',
  variant = 'primary',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
