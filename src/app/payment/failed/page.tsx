import Link from 'next/link';
import React from 'react';

const FailurePage: React.FC = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-yellow-500">
            <div className="text-center p-10 bg-white rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-16 w-16 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-semibold text-red-600 mb-4">Payment Failed!</h2>
                <p className="text-lg text-gray-600 mb-6">
                    Something went wrong with your payment. Please try again or contact support if the issue persists.
                </p>
                <Link
                    href="/"
                    className="bg-red-600 text-white px-6 py-3 rounded-full text-xl hover:bg-red-700 transition duration-300"
                >
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default FailurePage;
