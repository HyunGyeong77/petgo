"use client";

import Input from '@/components/ui/input/Input';
import styles from './page.module.scss';
import { useEffect, useState } from 'react';
import Button from '@/components/ui/button/Button';
import { validatePassword } from '@/utils/validation';
import { supabase } from '@/lib/supabase';
import { accessErrorToast, showToast } from '@/utils/toast';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';
import { useAuth } from '@/providers/AuthContext';

export default function Page() {
  /* =========================
   STATE
   ========================= */

  const [canAccess, setCanAccess] = useState<boolean | null>(null);
  const auth = useAuth();
  const router = useRouter();

  /* =========================
   PASSWORD STATE
   ========================= */

   const [newPassword, setNewPassword] = useState<string>("");
   const [npValid, setNpValid] = useState<boolean | undefined>(false);
   const [npErrors, setNpErrors] = useState<string>("");
 
   const [checkPassword, setCheckPassword] = useState<string>("");
   const [cpValid, setCpValid] = useState<boolean | undefined>(undefined);
   const [cpErrors, setCpErrors] = useState<string>("");
 
   const [isComplete, setIsComplete] = useState<boolean>(true);

  /* =========================
   RESET PASSWORD FLOW (GUARD)
   ========================= */
  
  // reset flow 확인 
  useEffect(() => {
    if(auth?.event === "PASSWORD_RECOVERY") {
      setCanAccess(true);
    } else {
      setCanAccess(false);
    }
  }, []);

  //접근 제한
  useEffect(() => {
    if(canAccess === false) {
      accessErrorToast();
      router.push(ROUTES.app.home);
    }
  }, [canAccess]);

  /* =========================
   VALIDATION
   ========================= */

  // 새로운 비밀번호 규칙
  useEffect(() => {
    const p = validatePassword(newPassword);

    setNpValid(newPassword ? p.valid : undefined);
    setNpErrors(newPassword && !p.valid ? p.error : "");
  }, [newPassword]);

  // 새로운 비밀번호와 확인 비밀번호가 동일한 지 판단
  useEffect(() => {
    if(!checkPassword) return;

    if(newPassword !== checkPassword) {
      setCpValid(false);
      setCpErrors("비밀번호가 동일하지 않습니다");
    } else {
      setCpValid(true);
      setCpErrors("");
    }
  }, [checkPassword, newPassword]);

  // 변경하기 버튼 활성화 및 비활성화 판단
  useEffect(() => {
    setIsComplete(!npValid || !cpValid);
  }, [npValid, cpValid]);

  /* =========================
   ACTION
   ========================= */

  // 비밀번호 변경
  const handlePasswordChange = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if(error) throw new Error(error.message);

      showToast("success", "비밀번호가 변경되었습니다.");
      router.push(ROUTES.app.home);
    } catch (err) {
      showToast("error", `비밀번호를 변경하는 도중 문제가 발생했습니다.\n다시 시도해 주세요.`);
      console.log(err);
    }
  }

  /* =========================
   RENDER GUARD
   ========================= */

  if(canAccess === null) return null;

  return (
    <div className={styles.wrapper}>
      <h2>패스워드 변경</h2>
      <div>
        <Input 
          label="새 패스워드"
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          isValid={npValid}
          error={npErrors}
          hint={[
            '8자 이상, 영문 대문자, 소문자, 숫자 포함',
            '최소 1개의 특수문자(!@#$%^&*) 포함',
            '다른 사람과 공유하지 마세요',
          ]}
        />
        <Input 
            label="패스워드 확인"
            type="password"
            value={checkPassword}
            onChange={(e) => {setCheckPassword(e.target.value)}}
            isValid={cpValid}
            error={cpErrors}
            disabled={!npValid || !!npErrors}
          />
      </div>
      <div>
        <Button 
          children="변경하기"
          disabled={isComplete}
          onClick={handlePasswordChange}
        />
      </div>
    </div>
  );
}