import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/callback`, {
          ...Object.fromEntries(searchParams.entries()),
        });
        setStatus(response.data.status);
        setIsLoading(false);
      } catch (error) {
        setStatus('Payment verification failed');
        setIsLoading(false);
      }
    };

    verifyPayment();
  }, [searchParams]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">Payment Status</h1>
        {isLoading ? (
          <p className="text-gray-600">Verifying your payment...</p>
        ) : (
          <p className={`text-lg ${status === 'TXN_SUCCESS' ? 'text-green-500' : 'text-red-500'}`}>
            {status === 'TXN_SUCCESS' ? 'Payment Successful!' : 'Payment Failed'}
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentStatus;
