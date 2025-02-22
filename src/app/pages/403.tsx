import Link from "next/link";

export default function ForbiddenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <svg
        className="w-64 h-64"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="256" cy="256" r="200" fill="#E5E7EB" />
        <path
          d="M180 332 L332 180"
          stroke="gray"
          strokeWidth="20"
          strokeLinecap="round"
        />
        <path
          d="M332 332 L180 180"
          stroke="gray"
          strokeWidth="20"
          strokeLinecap="round"
        />
      </svg>
      <h1 className="text-4xl font-bold text-gray-800 mt-6">Forbidden</h1>
      <p className="text-lg text-gray-600 mt-2">You don&apos;t have permission to access this page.</p>
      <Link href="/" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
        Go Home
      </Link>
    </div>
  );
}
