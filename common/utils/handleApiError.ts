import axios from 'axios';
import { ErrorResponse } from '../types/ApiError';
import { apiExceptionErrorToast, unableServerToast, unknownErrorToast } from './toast';

export const handleApiError = (error: unknown) => {
  if (!axios.isAxiosError<ErrorResponse>(error)) {
    unknownErrorToast();
    return;
  }

  const response = error.response;

  if (!response) {
    unableServerToast();
    return;
  }

  apiExceptionErrorToast(response.data);
};