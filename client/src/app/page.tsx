'use client';

import {
  CalendarDays,
  CheckCircle2,
  ShieldCheck,
  UserRound,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useCurrentUser } from '@/components/hooks/useAuth';
import Navbar from '@/components/layout/Navbar';

export default function HomePage() {
  const router = useRouter();
  const { data, isPending, isError } = useCurrentUser();
  const user = data?.user;

  useEffect(() => {
    if (isError) {
      router.replace('/login');
    }
  }, [isError, router]);

  if (isPending || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-indigo-400 border-t-transparent" />
          <p className="mt-4 text-sm text-slate-400">
            Checking your session...
          </p>
        </div>
      </main>
    );
  }

  const joinedDate = new Date(user.createdAt);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />

      <main className="mx-auto max-w-6xl px-5 py-12 sm:py-16">
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/15 via-slate-900 to-slate-900 p-7 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-500/20 blur-3xl" />

          <div className="relative">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
              <CheckCircle2 size={14} />
              Authenticated successfully
            </div>

            <p className="text-sm font-medium text-indigo-300">
              YOUR PERSONAL SPACE
            </p>

            <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-5xl">
              Welcome back, {user.name}!
            </h1>

            <p className="mt-4 max-w-xl leading-7 text-slate-400">
              Your account is active. You have successfully signed in to your
              personal dashboard.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-5 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/15 text-indigo-300">
              <UserRound size={21} />
            </div>

            <h2 className="mt-5 text-lg font-semibold">Account details</h2>
            <p className="mt-1 text-sm text-slate-400">
              Your registered profile information.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs text-slate-500">Full name</p>
                <p className="mt-1 break-words text-sm text-slate-200">
                  {user.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-slate-500">Email address</p>
                <p className="mt-1 break-all text-sm text-slate-200">
                  {user.email}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-6">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-300">
              <ShieldCheck size={21} />
            </div>

            <h2 className="mt-5 text-lg font-semibold">Session status</h2>
            <p className="mt-1 text-sm text-slate-400">
              Authentication details for this session.
            </p>

            <div className="mt-6 flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4">
              <CheckCircle2 className="shrink-0 text-emerald-400" size={20} />
              <div>
                <p className="text-sm font-medium text-emerald-300">
                  Signed in
                </p>
                <p className="mt-1 text-xs text-slate-400">
                  Your session was verified by the server.
                </p>
              </div>
            </div>

            <div className="mt-5 flex items-center gap-3">
              <CalendarDays size={18} className="text-slate-500" />
              <div>
                <p className="text-xs text-slate-500">Member since</p>
                <p className="mt-1 text-sm text-slate-200">
                  {Number.isNaN(joinedDate.getTime())
                    ? 'Unavailable'
                    : joinedDate.toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-10 text-center text-xs text-slate-600">
          Built with Next.js, Express and PostgreSQL.
        </footer>
      </main>
    </div>
  );
}
