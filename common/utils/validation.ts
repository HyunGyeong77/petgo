export const validateNickname = (val: string) => {
  const regex = /^[a-zA-Z0-9가-힣]{2,5}$/;
  if (!val) return { valid: false, error: '' };
  if (!regex.test(val)) {
    return {
      valid: false,
      error: '2~5자 사이의 한글, 영문, 숫자로 입력해주세요 (특수문자 불가)',
    };
  }
  return { valid: true, error: '' };
};

export const validateEmail = (val: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!val) return { valid: false, error: '' };
  if (!regex.test(val)) {
    return {
      valid: false,
      error: '올바른 이메일 형식으로 입력해주세요 (예: user@example.com)',
    };
  }
  return { valid: true, error: '' };
};

export const validatePassword = (val: string) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
  if (!val) return { valid: false, error: '' };
  if (!regex.test(val)) {
    return {
      valid: false,
      error: '8자 이상, 대/소문자, 숫자, 특수문자(!@#$%^&*)를 포함해야 합니다',
    };
  }
  return { valid: true, error: '' };
};