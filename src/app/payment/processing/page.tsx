'use client'

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

// Type definitions for the query parameters from the URL
interface PaymentParams {
    pidx: string | null;
    transaction_id: string | null;
    tidx: string | null;
    amount: string | null;
    total_amount: string | null;
    mobile: string | null;
    status: string | null;
    purchase_order_id: string | null;
    purchase_order_name: string | null;
}

// Type for the API response
interface ApiResponse {
    status: 'success' | 'Pending' | 'Refunded' | 'User Cancelled'; // Adjust according to your actual API response
}

const Processing: React.FC = () => {
    const router = useRouter();

    const [loading, setLoading] = useState(true); // To manage loading state

    // Function to parse the URL parameters and return them as an object
    const parseUrlParams = (): PaymentParams => {
        const urlParams = new URLSearchParams(window.location.search);
        return {
            pidx: urlParams.get('pidx'),
            transaction_id: urlParams.get('transaction_id'),
            tidx: urlParams.get('tidx'),
            amount: urlParams.get('amount'),
            total_amount: urlParams.get('total_amount'),
            mobile: urlParams.get('mobile'),
            status: urlParams.get('status'),
            purchase_order_id: urlParams.get('purchase_order_id'),
            purchase_order_name: urlParams.get('purchase_order_name'),
        };
    };

    const validatePayment = async () => {
        const params = parseUrlParams();

        if (!params.transaction_id || !params.status) {
            router.push('/payment/failed')
        }

        try {
            const response = await axios.post<ApiResponse>('http://localhost:8000/api/payment/khalti/verify', {
                transactionId: params.transaction_id,
                status: params.status || "Failed",
                amount: params.amount,
                bookingId: params.purchase_order_id,
            },
                {
                    withCredentials: true,
                });
            if (response.status !== 200) {
                console.log('failed to verify.')
            }
            if (params.status === 'Completed') {
                setLoading(false);  // Hide loading state when payment is successful
                router.push('/payment/success')
            } else {
                router.push('/payment/failed')
            }
        } catch (error) {
            console.error('Error validating payment:', error);
        }
    };

    // Run validatePayment when the component is mounted
    useEffect(() => {
        validatePayment();
    }, []);



    // Show success or failure message based on paymentStatus
    return (
        <>
            {loading && <div className='text-xl'>Processing...</div>}
        </>
    );
};

export default Processing;
