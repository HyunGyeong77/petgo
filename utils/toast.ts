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

export const loginToast = (nickname: string) => {
  showToast("success", `환영합니다! ${nickname}님`);
}

export const accessErrorToast = () => {
  showToast("error", "잘못된 접근입니다");
}