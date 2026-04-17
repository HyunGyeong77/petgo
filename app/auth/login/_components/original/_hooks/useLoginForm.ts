'use client';

import { useState, useEffect } from "react";

export const useLoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(!(email.length > 0 && password.length > 0));
  }, [email, password]);

  return {
    email, setEmail,
    password, setPassword,
    disabled
  }
}