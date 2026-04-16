'use client';

import { useLoginForm } from "./_hooks/useLoginForm";
import Input from "@/components/ui/input/Input";
import Button from "@/components/ui/button/Button";
import { showToast } from "@/utils/toast";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function Original() {
  const {
    email, setEmail,
    password, setPassword,
    disabled
  } = useLoginForm();
  
  const router = useRouter();

  const handleCredentialResponse = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // 이메일 인증 미완료 에러 처리: supabase는 인증이 안 된 사용자 로그인 시 error.message에 관련 메시지가 들어옴
      if (error) {
        // Supabase의 에러코드가 'Email not confirmed' 혹은 관련 메시지 포함하는지 체크
        if (
          error.message?.toLowerCase().includes("email") &&
          error.message?.toLowerCase().includes("confirm")
        ) {
          showToast("error", "이 계정은 이메일 인증이 필요합니다. 이메일을 확인해 주세요.");
          router.push(`${ROUTES.auth.checkEmail}?email=${encodeURIComponent(email)}`);
        } else {
          throw new Error(error.message);
        }
        return;
      }

      const { data, error: selectError } = await supabase.rpc("select_users", {
        p_email: email
      });

      if(selectError) throw new Error(selectError.message);
      
      // 로그인 성공 처리 (예시: 환영 메시지)
      showToast("success", `환영합니다! ${data}님`);
      router.push(ROUTES.app.home);
    } catch (err) {
      showToast("error", "아이디 또는 비밀번호가 다릅니다");
      setEmail("");
      setPassword("");
      console.log(err);
    }
  }

  return (
    <form onSubmit={handleCredentialResponse}>
      <Input
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button 
        type="submit" 
        disabled={disabled}
      >
        로그인
      </Button>
    </form>
  );
}