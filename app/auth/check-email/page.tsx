"use client";

import styles from './page.module.scss';
import Link from "next/link";
import { supabase } from '@/lib/supabase';
import { showToast } from '@/utils/toast';
import { ROUTES } from '@/constants/routes';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function Page() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  if(!email) return null;

  const [resendCoolTime, setResendCoolTime] = useState<boolean>(false);
 
  const resend = async () => {
    if(resendCoolTime) {
      showToast("error", "잠시 후 다시 시도해주세요");
      return;
    }

    setResendCoolTime(true);

    setTimeout(() => {
      setResendCoolTime(false);
    }, 30000);

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}${ROUTES.auth.authCallBack}`
        }
      });

      if(error) throw new Error(error.message);

      showToast("success", "이메일을 다시 전송하였습니다. 메일을 확인해주세요.");
    } catch (err) {
      showToast("error", "재발송 중 문제가 발생했습니다. 다시 시도해주세요.");
      console.log(err);
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <div>
          <h2 className={styles.check}>이메일을 확인해주세요.</h2>
          <p className={styles.content}>인증 링크를 클릭하면 가입이 완료됩니다.</p>
        </div>
        <div className={styles.innerResend}>
          <span>인증 링크가 오지 않았나요?</span>
          <div>
            <p className={styles.notice}>링크를 보내기 전에 <br/>가입하신 이메일을 다시 한 번 확인해 주세요.</p>
            <span className={styles.email}>{email}</span>
            <span>{email && "이 메일이 맞나요?"}</span>
          </div>
          <button className={styles.resend} onClick={resend}>인증 링크 재발송</button>
        </div>
        <Link href={ROUTES.app.home} className={styles.link}>홈으로 이동하기</Link>
      </div>
    </div>
  );
}