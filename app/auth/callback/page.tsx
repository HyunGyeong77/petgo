"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { loginToast, showToast } from "@/utils/toast";
import Loading from "@/app/loading";
import { ROUTES } from "@/constants/routes";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if(error) throw new Error(error.message);

        const session = data.session;
        if(!data.session) throw new Error("아직 로그인 안됨");

        const user = session?.user;
        if(!user?.email_confirmed_at) throw new Error("이메일 인증 안됨");

       const nickname = data.session.user.user_metadata.display_name;

        showToast("success", '회원가입이 완료되었습니다!');
        loginToast(nickname);
        router.push(ROUTES.app.home);
      } catch (err) {
        showToast("error", "인증에 실패했습니다. 다시 시도해 주세요.");
        console.log(err);
        router.push(ROUTES.auth.login);
      }
    }

    handle();
  }, []);

  return <Loading />
}