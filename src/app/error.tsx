"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-semibold">Something went wrong!</h1>
      <p className="text-lg">{error.message}</p>

      <button
        onClick={reset}
        className="rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75"
      >
        Try again
      </button>
    </main>
  );
}
