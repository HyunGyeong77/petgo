"use client";

import { handleApiError } from "@/common/utils/handleApiError";

export default function Page() {
  const {
    nickname, setNickname,
    email, setEmail,
    password, setPassword,
    isAgreed, setIsAgreed,
    errors, isValid, 
    isFormValid
  } = useSignupForm();
  
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const { error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}${ROUTES.auth.authCallBack}`,
          data: {
            display_name: nickname
          }
        }
      });

      if(authError) throw new Error(authError.message);

      router.push(
        `${ROUTES.auth.checkEmail}?email=${encodeURIComponent(email)}`
      );
    } catch (err) {
      showToast("error", "이메일 발송 중 문제가 발생했습니다. 다시 시도해 주세요.");
      console.log(err);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Link href={ROUTES.app.home} direction="left" value="이전" />

        <h1 className={styles.title}>회원가입</h1>

        <div className={styles.notice}>
          <p>본 사이트는 <span className={styles.accent}>포트폴리오 사이트</span>입니다.</p>
          <p>{
            `회원가입 직후 생성된 임시 계정은 1일 동안 유지되며, 
            사용하지 않으면 자동으로 삭제됩니다.`
          }</p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="닉네임"
            placeholder="닉네임을 입력하세요"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            isValid={isValid.nickname}
            error={errors.nickname}
            required
            hint={[
              '2~5자 사이로 입력해주세요',
              '한글, 영문, 숫자 사용 가능',
              '특수문자는 사용할 수 없습니다',
            ]}
          />

          <Input
            label="이메일"
            type="email"
            placeholder="example@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            isValid={isValid.email}
            error={errors.email}
            required
            hint={[
              '올바른 이메일 형식으로 입력해주세요 (예: user@example.com)',
              '인증 메일이 발송되므로, 실제 사용 가능한 이메일 주소를 입력해 주세요'
            ]}
          />

          <Input
            label="비밀번호"
            type="password"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            isValid={isValid.password}
            error={errors.password}
            required
            hint={[
              '8자 이상, 영문 대문자, 소문자, 숫자 포함',
              '최소 1개의 특수문자(!@#$%^&*) 포함',
              '다른 사람과 공유하지 마세요',
            ]}
          />

          <Checkbox
            label="안내를 확인했으며, 회원가입을 진행합니다"
            checked={isAgreed}
            onChange={setIsAgreed}
            required
          />

          <Button
            type="submit"
            disabled={!isFormValid}
            className={styles.submitBtn}
          >
            회원가입 완료
          </Button>
        </form>
      </div>
    </div>
  );
}