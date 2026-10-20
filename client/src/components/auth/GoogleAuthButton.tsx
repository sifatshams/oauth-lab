'use client';

export default function GoogleAuthButton() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleGoogleLogin = () => {
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_API_URL is missing');
      return;
    }

    window.location.href = `${apiUrl}/auth/google`;
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      className="relative flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-slate-700 bg-white px-4 py-3 font-semibold text-slate-800 transition duration-200 hover:bg-slate-100 active:scale-[0.99]"
    >
      {/* google multicolor logo */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 48 48"
        className="absolute left-4 h-5 w-5"
        aria-hidden="true"
      >
        <path
          fill="#EA4335"
          d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 3.01 13.22l7.98 6.19C12.88 13.72 18.02 9.5 24 9.5Z"
        />
        <path
          fill="#4285F4"
          d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.73 7.18l7.67 5.95c4.48-4.14 7.1-10.24 7.1-17.6Z"
        />
        <path
          fill="#FBBC05"
          d="M10.99 28.59A14.4 14.4 0 0 1 10.25 24c0-1.59.27-3.13.74-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.87.93 7.52 2.58 10.78l8.41-6.19Z"
        />
        <path
          fill="#34A853"
          d="M24 48c6.48 0 11.93-2.13 15.91-5.85l-7.67-5.95c-2.13 1.43-4.86 2.3-8.24 2.3-5.98 0-11.12-4.22-13.01-9.91l-8.41 6.19C6.51 43.02 14.62 48 24 48Z"
        />
      </svg>

      <span>Continue with Google</span>
    </button>
  );
}
