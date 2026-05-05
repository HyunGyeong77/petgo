"use client";

import Button from "@/components/ui/button/Button";
import styles from "./profile-account-danger-zone.module.scss";
import { useAuth } from "@/providers/AuthContext";
import { useEffect, useState } from "react";
import clsx from "clsx";
import Loading from "@/app/loading";

export default function ProfileAccountDangerZone(): React.JSX.Element {
  /* =========================
   STATE
   ========================= */

  const auth = useAuth();
  const email = auth?.user?.email;

  const [value, setValue] = useState<string>("");
  const [isModal, setIsModal] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  /* =========================
   VALIDATION
   ========================= */

  useEffect(() => {
    if(email === value) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [value]);

  /* =========================
   RENDER GUARD
   ========================= */

  if(!email) return <Loading />

  return (
    <>
      <div className={styles.quickActionGroup}>
        <Button 
          className={styles.deleteButton}
          onClick={() => setIsModal(true)}
        >
          계정 삭제
        </Button>
      </div>
      {isModal &&
        <div className={styles.deleteModal}>
          <div className={styles.deleteModalInner}>
            <Button 
              className={styles.back}
              onClick={() => setIsModal(false)}
            >
              돌아가기
            </Button>

            <p>정말 이 계정을 삭제하시겠습니까?</p>
            <p>
              <b className={styles.deleteText}>삭제</b>를 원하실 경우 <b>현재 로그인된 이메일</b>을 입력해 주세요.
            </p>

            <div className={styles.inputWrapper}>
              <input
                type="email"
                className={styles.input}
                onChange={(e) => setValue(e.target.value)}
              />
              <span className={clsx(
                styles.label,
                value && styles.active
              )}>{email}</span>
            </div>

            <Button
              className={styles.deleteButton}
              disabled={disabled}
            >
              삭제하기
            </Button>
          </div>
        </div>
      }
    </>
  );
}
