import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found | Bravoo</title>
        <meta name="description" content="The page you're looking for doesn't exist. Let's guide you back to safety!" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300">
        <div className="text-center px-6 max-w-lg">
          {/* Big 404 */}
          <h1 className="text-7xl font-extrabold text-gray-800 drop-shadow-lg mb-6 animate-bounce">
            404
          </h1>

          {/* Fun message */}
          <p className="text-xl md:text-2xl font-semibold text-gray-700 mb-4">
            🚧 Oops! You found a{" "}
            <span className="text-red-600 font-bold">dead end</span>.
          </p>
          <p className="text-gray-600 mb-8">
            Looks like this page got lost in the traffic jam of the internet.
            Don't worry, we'll guide you back to safety!
          </p>

          {/* Call-to-actions */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
            >
              🏠 Go Home
            </Link>
            <Link
              href="/wall-of-fame"
              className="px-6 py-3 bg-yellow-500 text-white rounded-xl shadow hover:bg-yellow-600 transition"
            >
              🌟 Visit Wall of Fame
            </Link>
          </div>

          {/* Bonus fun text */}
          <p className="mt-8 text-sm text-gray-500 italic">
            Tip: Great explorers always find their way back 😉
          </p>
        </div>
      </div>
    </>
  );
}
