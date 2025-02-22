
'use client'
import axios from 'axios';
/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react'

const Payment = () => {
    const [selectedPayment, setSelectedPayment] = useState(1);

    const handleSelectPayment = (paymentId: React.SetStateAction<number>) => {
        setSelectedPayment(paymentId);
    };
    async function khalti() {
        try {
            const response = await axios.post(
                "http://localhost:8000/api/payment/khalti/initiate", 
                {
                    bookingId: "cm6f1a4pq0001001pxyaueqq6",
                    totalAmount: 10,
                    serviceName: "Beauty Treatment"
                },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(response);
            if (response.status === 200) {
                // Redirect to payment gateway
                window.location.href = response.data.payment_url;
            }
        } catch (error) {
            console.error('Error during payment initiation:', error);
        }
    }

    const cod = async () => {
        const response = await axios.post(
            "http://localhost:8000/api/payment/cod", 
            {
                bookingId: "cm6f1a4pq0001001pxyaueqq6",
                totalAmount: 10,
                serviceName: "Beauty Treatment"
            },
            {
                withCredentials: true,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log(response);
    }
    
    // Simulate payment processing
    const handlePayment = async () => {
        // check selected payment method
        if (selectedPayment === 1) {
            khalti();
        } else if(selectedPayment===2){
            cod();        }
    };
    return (
        <div className="flex justify-center">
            <div className="mt-24 max-w-xl p-6 bg-white rounded-lg shadow-lg">
                {/* Show payment options */}
                <h1 className="font-bold text-2xl text-center mb-6">Choose your payment method:</h1>

                <div className="flex gap-6 justify-center">
                    {/* Payment Option 1 */}
                    <span
                        className={`w-32 cursor-pointer p-2 rounded-md transition-all duration-300 ease-in-out ${selectedPayment === 1 ? 'border-4 border-blue-500' : 'hover:border-2 hover:border-gray-300'
                            }`}
                        onClick={() => handleSelectPayment(1)}
                    >
                        <img
                            src="https://apps.odoo.com/web/image/loempia.module/134775/icon_image/300x300?unique=7aab179"
                            alt="Payment Option 1"
                            className="w-full h-auto rounded-md"
                        />
                    </span>
                    {/* Payment Option 2 */}
                    <span
                        className={`w-32 cursor-pointer p-2 rounded-md transition-all duration-300 ease-in-out ${selectedPayment === 2 ? 'border-4 border-blue-500' : 'hover:border-2 hover:border-gray-300'
                            }`}
                        onClick={() => handleSelectPayment(2)}
                    >
                        <img
                            src="https://t3.ftcdn.net/jpg/04/49/22/98/360_F_449229860_uczw7ZS0sw6Ou31yhifld9s0KHkdULcR.jpg"
                            alt="Payment Option 2"
                            className="w-full h-auto rounded-md"
                        />
                    </span>
                </div>

                {/* Pay Now Button */}
                <div className="text-center mt-6">
                    <button
                        onClick={handlePayment}
                        className="bg-blue-500 text-white px-8 py-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                        disabled={!selectedPayment}
                    >
                        Pay Now
                    </button>
                </div>

                {/* Disclaimer */}
                <div className="text-gray-800 text-sm text-center mt-4">
                    Please note that this is a mock payment page. Actual payment processing will occur on the payment gateway.
                </div>
            </div>
        </div>
    );
};

export default Payment;
