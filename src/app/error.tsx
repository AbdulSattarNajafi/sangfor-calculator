"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-6 py-14 md:py-16 lg:py-20">
      <div className="wrapper text-center">
        <h1 className="mb-2 text-2xl font-bold md:text-3xl lg:text-4xl">
          Something went wrong!
        </h1>
        <p className="lg:text-lg">{error.message}</p>
      </div>

      <button
        onClick={reset}
        className="rounded bg-green px-4 py-2 font-semibold text-white transition-all duration-300 hover:bg-green/75"
      >
        Try again
      </button>
    </section>
  );
}
