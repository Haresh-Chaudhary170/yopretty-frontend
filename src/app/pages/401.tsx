import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <svg
        className="w-64 h-64"
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="80" y="80" width="352" height="352" rx="30" fill="#E5E7EB" />
        <line x1="130" y1="130" x2="382" y2="382" stroke="gray" strokeWidth="20" />
        <line x1="130" y1="382" x2="382" y2="130" stroke="gray" strokeWidth="20" />
      </svg>
      <h1 className="text-4xl font-bold text-gray-800 mt-6">Unauthorized Access</h1>
      <p className="text-lg text-gray-600 mt-2">You need to log in to view this page.</p>
      <Link href="/login" className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg">
        Go to Login
      </Link>
    </div>
  );
}
