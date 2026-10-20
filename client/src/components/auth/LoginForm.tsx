'use client';

import AuthCard from '@/components/ui/AuthCard';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LoaderCircle, LogIn } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useLogin } from '../hooks/useAuth';
import { getApiError } from '../lib/api-error';

const loginSchema = z.object({
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const inputClass =
  'w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20';

// login form
export default function LoginForm() {
  const router = useRouter();
  const loginMutation = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const result = await loginMutation.mutateAsync(values);
      toast.success(result.message || 'Logged in successfully');
      router.replace('/');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <AuthCard
      title="Welcome back"
      subtitle="Sign in with your email and password."
      footerText="Don't have an account?"
      footerLinkText="Create one"
      footerLinkHref="/register"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            className={inputClass}
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-rose-400">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* password */}
        <div>
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-medium text-slate-200"
          >
            Password
          </label>

          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              placeholder="Enter your password"
              className={`${inputClass} pr-12`}
              {...register('password')}
            />

            <button
              type="button"
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              onClick={() => setShowPassword((value) => !value)}
              className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-white cursor-pointer"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {errors.password && (
            <p className="mt-1.5 text-xs text-rose-400">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* sign in button */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loginMutation.isPending ? (
            <LoaderCircle className="animate-spin" size={18} />
          ) : (
            <LogIn size={18} />
          )}
          {loginMutation.isPending ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </AuthCard>
  );
}
