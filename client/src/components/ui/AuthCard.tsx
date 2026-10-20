import Link from 'next/link';
import type { ReactNode } from 'react';

// auth card interface
interface AuthCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl shadow-black/30 backdrop-blur-xl sm:p-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/15 text-2xl font-bold text-indigo-300 ring-1 ring-indigo-400/20">
          A
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-white">
          {title}
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-400">{subtitle}</p>
      </div>

      {children}

      <p className="mt-7 text-center text-sm text-slate-400">
        {footerText}{' '}
        <Link
          href={footerLinkHref}
          className="font-semibold text-indigo-400 transition hover:text-indigo-300"
        >
          {footerLinkText}
        </Link>
      </p>
    </div>
  );
}
