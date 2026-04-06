'use client';

import { useState, useEffect } from 'react';
import { validateNickname, validateEmail, validatePassword } from '@/utils/validation';

export const useSignupForm = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAgreed, setIsAgreed] = useState(false);

  const [errors, setErrors] = useState<{
    nickname?: string;
    email?: string;
    password?: string;
  }>({});
  
  const [isValid, setIsValid] = useState<{
    nickname?: boolean;
    email?: boolean;
    password?: boolean;
  }>({});

  useEffect(() => {
    const n = validateNickname(nickname);
    const e = validateEmail(email);
    const p = validatePassword(password);

    setIsValid({
      nickname: nickname ? n.valid : undefined,
      email: email ? e.valid : undefined,
      password: password ? p.valid : undefined,
    });

    setErrors({
      nickname: nickname && !n.valid ? n.error : '',
      email: email && !e.valid ? e.error : '',
      password: password && !p.valid ? p.error : '',
    });
  }, [nickname, email, password]);

  const isFormValid =
    isValid.nickname &&
    isValid.email &&
    isValid.password &&
    isAgreed;

  return {
    nickname, setNickname,
    email, setEmail,
    password, setPassword,
    isAgreed, setIsAgreed,
    errors,
    isValid,
    isFormValid,
  };
};