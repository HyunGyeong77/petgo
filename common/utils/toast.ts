import { toast } from 'react-toastify';

type ToastType = 'success' | 'error';

export const showToast = (type: ToastType, message: string) => {
  const id = `${type}-${message}`;

  if(type === 'success') {
    toast.success(message, {
      toastId: id
    })
  } else if(type === 'error') {
    toast.error(message, {
      toastId: id
    })
  }
}

export const networkErrorToast = () => {
  showToast("error", "서버에 연결할 수 없습니다\n잠시 후 다시 시도해 주세요");
}

export const emailSendErrorToast = () => {
  showToast("error", "이메일 인증 메일 전송에 실패했습니다\n잠시 후 다시 시도해 주세요");
}

export const loginToast = (nickname: string) => {
  showToast("success", `환영합니다! ${nickname}님`);
}

export const accessErrorToast = () => {
  showToast("error", "잘못된 접근입니다");
}