import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <svg
        className="w-64 h-64"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="256" cy="256" r="200" fill="#E5E7EB" />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dy=".3em"
          className="text-8xl font-bold fill-gray-700"
        >
          404
        </text>
      </svg>
      <h1 className="text-4xl font-bold text-gray-800 mt-6">Page Not Found</h1>
      <p className="text-lg text-gray-600 mt-2">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
        Go Home
      </Link>
    </div>
  );
}
