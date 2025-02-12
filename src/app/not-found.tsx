import Link from "next/link";

function NotFoundPage() {
  return (
    <section className="bg-not-found flex h-dvh items-center bg-cover bg-center py-20 text-white">
      <div className="wrapper">
        <div className="mx-auto w-full max-w-3xl text-center">
          <h1 className="mb-2 text-[140px] font-bold leading-tight">404</h1>
          <p className="mb-4 text-lg">
            As a network expert we can conclude that our server doesn’t
            understand about your request. It’s because your url request is not
            correct or the data process is corrupt.
          </p>
          <p className="mb-12 text-lg">
            Try to clean up your browser cache and cookies, it will help!
          </p>

          <Link
            href="/"
            className="rounded bg-green px-4 py-3 font-semibold text-white transition-all duration-300 hover:bg-green/75"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
