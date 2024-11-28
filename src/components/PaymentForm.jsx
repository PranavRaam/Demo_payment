import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [orderId, setOrderId] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');

  const handlePayment = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/pay`, { orderId, amount });
      setPaymentUrl(response.data.paymentUrl);
      setIsLoading(false);
    } catch (error) {
      console.error('Payment initiation failed:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">Payment Mechanism</h1>
        <form onSubmit={handlePayment} className="space-y-4">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">
              Order ID
            </label>
            <input
              id="orderId"
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="Enter Order ID"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
              Amount
            </label>
            <input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount"
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
          >
            {isLoading ? 'Processing...' : 'Make Payment'}
          </button>
        </form>
        {paymentUrl && (
          <div className="mt-4 text-center">
            <a
              href={paymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline hover:text-blue-700"
            >
              Complete Payment Here
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
