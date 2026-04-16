"use client";

import { useState, useEffect } from "react";
import {
  validateNickname,
  validateEmail,
  validatePassword,
} from "@/utils/validation";
import { supabase } from "@/lib/supabase";

export const useSignupForm = () => {
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [isAgreed, setIsAgreed] = useState<boolean>(false);

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

  let nicknameTimeout: NodeJS.Timeout;
  useEffect(() => {
    const n = validateNickname(nickname);

    if(n.valid) {
      if(nicknameTimeout) clearTimeout(nicknameTimeout);

      nicknameTimeout = setTimeout(async () => {
        try {
          const { data, error } = await supabase
            .rpc("check_nickname_exists", {
              p_nickname: nickname
            });
          
          if(error) throw new Error(error.message);
          setIsValid({ ...isValid, nickname: data ? false : true });
          setErrors({ ...errors, nickname: data ? "이미 사용중인 닉네임입니다" : "" });
        }
        catch (err) {
          console.log(err);
        }
      }, 300);
    } else {
      setIsValid({ ...isValid, nickname: nickname ? n.valid : undefined });
      setErrors({ ...errors, nickname: nickname && !n.valid ? n.error : "" });
    }

    return () => clearTimeout(nicknameTimeout);
  }, [nickname]);

  let emailTimeout: NodeJS.Timeout;
  useEffect(() => {
    const e = validateEmail(email);

    if(e.valid) {
      if(e.valid) {
        if(emailTimeout) clearTimeout(emailTimeout);
  
        emailTimeout = setTimeout(async () => {
          try {
            const { data, error } = await supabase
              .rpc("check_email_exists", {
                p_email: email
              });
            
            if(error) throw new Error(error.message);
            setIsValid({ ...isValid, email: data ? false : true });
            setErrors({ ...errors, email: data ? "이미 사용중인 이메일입니다" : "" });
          }
          catch (err) {
            console.log(err);
          }
        }, 300);
      } else {
        setIsValid({ ...isValid, nickname: nickname ? e.valid : undefined });
        setErrors({ ...errors, nickname: nickname && !e.valid ? e.error : "" });
      }
    }

    return () => clearTimeout(email);
  }, [email]);

  useEffect(() => {
    const p = validatePassword(password);

    setIsValid({ ...isValid, password: password ? p.valid : undefined });
    setErrors({ ...errors, password: password && !p.valid ? p.error : "" });
  }, [password]);

  const isFormValid =
    isValid.nickname && isValid.email && isValid.password && isAgreed;

  return {
    nickname,
    setNickname,
    email,
    setEmail,
    password,
    setPassword,
    isAgreed,
    setIsAgreed,
    errors,
    isValid,
    isFormValid,
  };
};
