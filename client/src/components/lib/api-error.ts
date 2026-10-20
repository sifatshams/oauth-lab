import axios from 'axios';

export function getApiError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'Request failed. Please try again!';
  }
  return 'Something went wrong. Please try again!';
}
