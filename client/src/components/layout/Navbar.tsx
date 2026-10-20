'use client';

import { LogOut, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { useCurrentUser, useLogout } from '../hooks/useAuth';
import { getApiError } from '../lib/api-error';

export default function Navbar() {
  const router = useRouter();
  const { data, isPending } = useCurrentUser();
  const logoutMutation = useLogout();
  const user = data?.user;

  const handleLogout = async () => {
    try {
      const result = await logoutMutation.mutateAsync();

      // toast msg
      toast.success(result.message || 'Logged out successfully');
      router.replace('/login');
    } catch (error) {
      toast.error(getApiError(error));
    }
  };

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight text-white">
          OAuth<span className="text-indigo-400">App.</span>
        </Link>

        <div className="flex items-center gap-3">
          {isPending ? (
            <div className="h-9 w-20 animate-pulse rounded-lg bg-white/10" />
          ) : user ? (
            <>
              <div className="hidden items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 sm:flex">
                <UserRound size={17} className="text-indigo-300" />
                <span className="max-w-36 truncate text-sm text-slate-200">
                  {user.name}
                </span>
              </div>

              <button
                onClick={handleLogout}
                disabled={logoutMutation.isPending}
                className="flex items-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-sm text-slate-300 transition hover:border-rose-400/30 hover:bg-rose-500/10 hover:text-rose-300 disabled:opacity-60"
              >
                <LogOut size={16} />
                <span>
                  {logoutMutation.isPending ? 'Logging out...' : 'Logout'}
                </span>
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="rounded-xl px-3 py-2 text-sm font-medium text-slate-300 hover:text-white"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
