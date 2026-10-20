'use client';

export default function GoogleAuthButton() {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
      className="w-full rounded-xl border border-slate-700 px-4 py-3 font-medium transition hover:bg-slate-800"
    >
      Continue with Google
    </button>
  );
}
