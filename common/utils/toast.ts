import { toast } from 'react-toastify';
import { ErrorResponse } from '../types/ApiError';

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

export const apiExceptionErrorToast = (error: ErrorResponse) => {
  showToast("error", `에러코드: ${error.code}\n${error.message}`);
}

export const loginToast = (nickname: string) => {
  showToast("success", `환영합니다! ${nickname}님`);
}

export const accessErrorToast = () => {
  showToast("error", "잘못된 접근입니다");
}

export const unknownErrorToast = () => {
  showToast("error", "알 수 없는 오류가 발생했습니다");
}

export const unableServerToast = () => {
  showToast("error", "서버와 통신할 수 없습니다");
}