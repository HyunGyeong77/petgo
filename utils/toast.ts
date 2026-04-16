import { toast } from 'react-toastify';

let successToastId: string | number | null  = null;
let errorToastId: string | number | null = null;

type ToastType = 'success' | 'error';

export const showToast = (type: ToastType, message: string) => {
  if(type === 'success') {
    // success 메시지가 이미 표시되었는지 확인
    if(successToastId === null || !toast.isActive(successToastId)) {
      successToastId = toast.success(message);
    }
  } else if(type === 'error') {
    // error 메시지가 이미 표시되었는지 확인
    if(errorToastId === null || !toast.isActive(errorToastId)) {
      errorToastId = toast.error(message);
    }
  }
}