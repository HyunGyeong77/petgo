import axios from 'axios';
import { showToast } from './toast';

export const handleApiError = (error: unknown, toast: () => void) => {
  if (axios.isAxiosError(error) && !error.response) {
    toast();
    return;
  }

  if (error instanceof Error) {
    showToast("error", error.message);
    return;
  }
}