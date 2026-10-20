'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, LoaderCircle, UserPlus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';
import { useRegister } from '../hooks/useAuth';
import { getApiError } from '../lib/api-error';
import AuthCard from '../ui/AuthCard';
import GoogleAuthButton from './GoogleAuthButton';

// register Zod schema
const registerSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters'),
  email: z.string().trim().email('Enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

const inputClass =
  'w-full rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/20';

// register form
export default function RegisterForm() {
  const router = useRouter();
  const registerMutation = useRegister();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  // submit registration form
  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const result = await registerMutation.mutateAsync(values);

      toast.success(result.message || 'Account created successfully');
      router.replace('/');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <AuthCard
      title="Create account"
      subtitle="Create your account to get started."
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <div className="space-y-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* full name */}
          <div>
            <label
              htmlFor="name"
              className="mb-2 block text-sm font-medium text-slate-200"
            >
              Full name
            </label>

            <input
              id="name"
              autoComplete="name"
              placeholder="Your full name"
              className={inputClass}
              {...register('name')}
            />

            {errors.name && (
              <p className="mt-1.5 text-xs text-rose-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* email address */}
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
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className={`${inputClass} pr-12`}
                {...register('password')}
              />

              <button
                type="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
                onClick={() => setShowPassword((value) => !value)}
                className="absolute inset-y-0 right-3 flex cursor-pointer items-center text-slate-400 hover:text-white"
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

          {/* register button */}
          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-indigo-500 px-4 py-3 font-semibold text-white transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {registerMutation.isPending ? (
              <LoaderCircle className="animate-spin" size={18} />
            ) : (
              <UserPlus size={18} />
            )}

            {registerMutation.isPending
              ? 'Creating account...'
              : 'Create account'}
          </button>
        </form>

        {/* divider */}
        <div className="flex items-center gap-3">
          <div className="h-px flex-1 bg-white/10" />
          <span className="text-xs font-medium text-slate-500">
            OR CONTINUE WITH
          </span>
          <div className="h-px flex-1 bg-white/10" />
        </div>

        {/* google authentication */}
        <GoogleAuthButton />
      </div>
    </AuthCard>
  );
}
