"use client";

import styles from './google.module.scss';
import Script from "next/script";
import { auth } from '@/lib/firebase';
import { useEffect } from 'react';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { showToast } from '@/utils/toast';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/constants/routes';

export default function Google() {
  const router = useRouter();

  async function handleCredentialResponse(response: google.accounts.id.CredentialResponse) {
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);

    try {
      const login = await signInWithCredential(auth, credential);
      const { email, displayName } = login.user;

      const { error: loginError } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken
      });

      if(loginError) throw new Error(loginError.message);

      const { error } = await supabase
        .rpc("insert_google_user_if_not_exists", {
          p_email: email,
          p_display_name: displayName,
          p_auth_provider: "google"
        });

      if(error) throw new Error(error.message);

      showToast("success", `환영합니다 ${displayName}님`);
      router.push(ROUTES.app.home);
    } catch (err) {
      if(err instanceof Error) {
        showToast("error", "로그인에 실패하셨습니다.");
        console.log(err.message);
      } else {
        showToast("error", "알 수 없는 오류가 발생했습니다.");
        console.log(err)
      }
    }
  }

  function initializeGoogle() {
    if (!window.google?.accounts) return;

    window.google.accounts.id.initialize({
      client_id: process.env.NEXT_PUBLIC_GOOGLE_CLOUD_CLIENT_ID!,
      callback: handleCredentialResponse
    });

    window.google.accounts.id.renderButton(
      document.getElementById("google-signin-btn"),
      { theme: "outline", size: "large" }
    );
  }

  useEffect(() => {
    const checkGoogle = () => {
      if (window.google?.accounts) {
        initializeGoogle()
        return true
      }
      return false
    }
  
    if (checkGoogle()) return
  
    const interval = setInterval(() => {
      if (checkGoogle()) {
        clearInterval(interval)
      }
    }, 100)
  
    return () => clearInterval(interval)
  }, [])

  return (
    <>
      <Script 
        src="https://accounts.google.com/gsi/client"
        strategy="afterInteractive"
        onLoad={initializeGoogle} // 최초 방문 시 처리
      />

      <div id="google-signin-btn" className={`g_id_signin ${styles.signIn}`}></div>
    </>
  );
}