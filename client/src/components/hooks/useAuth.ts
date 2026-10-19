'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../lib/axios';
import {
  AuthResponse,
  CurrentUserResponse,
  RegisterPayload,
} from '../types/auth';

// auth key
export const AUTH_QUERY_KEY = ['authUser'] as const;

// current user
export function useCurrentUser() {
  return useQuery({
    queryKey: AUTH_QUERY_KEY,
    queryFn: async () => {
      const { data } = await axiosInstance.get<CurrentUserResponse>('/auth/me');
      return data;
    },
  });
}

// register
export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const { data } = await axiosInstance.post<AuthResponse>(
        '/auth/register',
        payload,
      );
      return data;
    },

    onSuccess: (data) => {
      queryClient.setQueryData(AUTH_QUERY_KEY, {
        success: true,
        user: data.user,
      });
    },
  });
}
