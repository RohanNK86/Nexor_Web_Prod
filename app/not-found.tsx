import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 pb-28 hero-gradient">
      <div className="text-center">
        <p className="font-mono text-amber-400/40 text-8xl font-bold mb-4">404</p>
        <h1 className="font-display font-bold text-4xl text-white mb-4">Page not found</h1>
        <p className="text-ash-400 mb-8 max-w-xs mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-semibold rounded-full text-sm transition-all hover:scale-105"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
