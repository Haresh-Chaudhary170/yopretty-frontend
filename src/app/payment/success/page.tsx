import Link from 'next/link';
import React from 'react';

const SuccessPage: React.FC = () => {


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <div className="text-center p-10 bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-3xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase. Your payment has been processed successfully. We appreciate your business!
        </p>
        <Link
          href="/"
          className="bg-green-600 text-white px-6 py-3 rounded-full text-xl hover:bg-green-700 transition duration-300"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
