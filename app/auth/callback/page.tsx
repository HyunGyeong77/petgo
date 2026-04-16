"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { showToast } from "@/utils/toast";
import Loading from "@/app/loading";
import { ROUTES } from "@/constants/routes";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const handle = async () => {
      try {
        const { error } = await supabase.auth.getSession();

        if(error) throw new Error(error.message);

        showToast("success", '회원가입이 완료되었습니다!');
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