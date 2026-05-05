"use client";

import type { ChangeEvent } from "react";
import type { ProfileFormState } from "@/lib/profile/profile-types";
import styles from "./profile-account-form.module.scss";
import { useEffect, useState } from "react";
import { validateNickname } from "@/utils/validation";
import { supabase } from "@/lib/supabase";
import Input from "@/components/ui/input/Input";
import clsx from "clsx";

export type ProfileAccountFormProps = {
  form: ProfileFormState;
  isNicknameEditable: boolean;
  checkPassword: string;
  isCheckPassword: boolean;
  isNicknameModal: boolean;
  onNicknameModalEdit: () => void;
  onNicknameChange: () => void;
  onCheckPassword: () => void;
  onNicknameCancel: () => void;
  onCheckPasswordChange: (value: string) => void;
  onFieldChange: (field: keyof ProfileFormState, value: string) => void;
  onPasswordEdit: () => void;
};

export default function ProfileAccountForm({
  form,
  isNicknameEditable,
  checkPassword,
  isCheckPassword,
  isNicknameModal,
  onNicknameModalEdit,
  onNicknameChange,
  onCheckPassword,
  onNicknameCancel,
  onCheckPasswordChange,
  onFieldChange,
  onPasswordEdit,
}: ProfileAccountFormProps): React.JSX.Element {
  const [isValid, setIsValid] = useState<boolean | undefined>(false);
  const [errors, setErrors] = useState<string>("");

  let nicknameTimeout: NodeJS.Timeout;
  useEffect(() => {
    const n = validateNickname(form.nickname);

    if(n.valid) {
      if(nicknameTimeout) clearTimeout(nicknameTimeout);

      nicknameTimeout = setTimeout(async () => {
        try {
          const { data, error } = await supabase
            .rpc("check_nickname_exists", {
              p_nickname: form.nickname
            });
          
          if(error) throw new Error(error.message);
          setIsValid(data ? false : true );
          setErrors(data ? "이미 사용중인 닉네임입니다" : "");
        }
        catch (err) {
          console.log(err);
        }
      }, 300);
    } else {
      setIsValid(form.nickname ? n.valid : undefined);
      setErrors(form.nickname && !n.valid ? n.error : "");
    }

    return () => clearTimeout(nicknameTimeout);
  }, [form.nickname]);

  return (
    <>
      <div className={styles.formRow}>
        <div className={styles.inputWithAction}>
          {!isCheckPassword ?
            <Input
              type="text"
              label="닉네임"
              value={form.nickname}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onFieldChange("nickname", event.target.value)
              }
              disabled={!isNicknameEditable}
            /> :
            <Input
              type="text"
              label="닉네임"
              placeholder="닉네임을 입력하세요"
              value={form.nickname}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                onFieldChange("nickname", event.target.value)
              }
              isValid={isValid}
              error={errors}
              disabled={!isNicknameEditable}
              hint={[
                '2~5자 사이로 입력해주세요',
                '한글, 영문, 숫자 사용 가능',
                '특수문자는 사용할 수 없습니다',
              ]}
            />
          }

          <button 
            type="button" 
            className={clsx(
              styles.inlineActionButton, 
              (isCheckPassword && (!isValid || errors)) && styles.actionButtonError,
              (isCheckPassword && (isValid || !errors)) && styles.actionButtonPass
            )}
            onClick={!isCheckPassword ? onNicknameModalEdit : onNicknameChange}
            disabled={(isCheckPassword && (!isValid || !!errors))}
          >
            닉네임 변경
          </button>
          
          {isCheckPassword && 
            <button 
              type="button"
              className={clsx(
                styles.inlineCancelButton,
                (isCheckPassword && (!isValid || errors)) && styles.actionButtonError,
                (isCheckPassword && (isValid || !errors)) && styles.actionButtonPass
              )}
              onClick={onNicknameCancel}
            >취소</button>
          }
        </div>

        {isNicknameModal &&
          <div className={styles.nicknameModal}>
            <div className={styles.nicknameModalInner}>
              <label className={styles.modalLabel}>현재 계정의 패스워드를 입력해주세요</label>
              <input 
                id="check-password" 
                className={styles.checkPassword}
                type="password" 
                placeholder="패스워드 입력"
                value={checkPassword} 
                onChange={(event: ChangeEvent<HTMLInputElement>) => 
                  onCheckPasswordChange(event.target.value)
                } 
              />
              <div className={styles.modalButtons}>
                <button className={styles.check} onClick={onCheckPassword}>확인</button>
                <button className={styles.close} onClick={onNicknameModalEdit}>닫기</button>
              </div>
            </div>
          </div>
        }
      </div>

      <div className={styles.formRow}>
        <Input
          label="이메일"
          type="email"
          value={form.email}
          readonly={true}
          hint={["이메일은 변경이 불가능합니다"]}
        />
      </div>

      <div className={styles.formRow}>
        <div className={clsx(
            styles.inputWithAction,
            styles.passwordInner
          )}
        >
          <p className={styles.passwordLabel}>패스워드</p>

          <button 
            type="button" 
            className={clsx(
              styles.inlineActionButton,
              styles.passwordButton
            )} 
            onClick={onPasswordEdit}
          >
            이메일 전송하기
          </button>
        </div>
      </div>
    </>
  );
}
