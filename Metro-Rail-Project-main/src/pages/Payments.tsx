import React, { useState, useEffect } from 'react';
import { FaMoneyBill, FaCalendarAlt, FaRoute, FaTrain } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';

interface Payment {
  id: number;
  amount: number;
  payment_method: string;
  payment_date: string;
  journey_details: string;
  status: string;
}

const Payments: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState<string>('all');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (!user) {
      navigate('/login');
      return;
    }
    setIsLoggedIn(true);
    fetchPayments();
  }, [navigate]);

  const fetchPayments = async () => {
    setIsLoading(true);
    try {
      // Placeholder for actual API call
      // const response = await axios.get('api/payments');
      // setPayments(response.data);
      
      // Mock data for development
      setTimeout(() => {
        const mockPayments: Payment[] = [
          {
            id: 1,
            amount: 120,
            payment_method: 'Credit Card',
            payment_date: '2023-07-15',
            journey_details: 'Uttara North to Motijheel',
            status: 'completed'
          },
          {
            id: 2,
            amount: 80,
            payment_method: 'Mobile Banking',
            payment_date: '2023-07-10',
            journey_details: 'Agargaon to Farmgate',
            status: 'completed'
          },
          {
            id: 3,
            amount: 150,
            payment_method: 'Credit Card',
            payment_date: '2023-07-05',
            journey_details: 'Uttara Center to Shahbagh',
            status: 'pending'
          },
          {
            id: 4,
            amount: 200,
            payment_method: 'Mobile Banking',
            payment_date: '2023-06-28',
            journey_details: 'Motijheel to Uttara North',
            status: 'completed'
          },
          {
            id: 5,
            amount: 100,
            payment_method: 'Credit Card',
            payment_date: '2023-06-20',
            journey_details: 'Mirpur 10 to Shahbagh',
            status: 'failed'
          }
        ];
        setPayments(mockPayments);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching payments:', error);
      toast.error('Failed to load payment history.');
      setIsLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    if (filter === 'all') return true;
    return payment.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Completed</span>;
      case 'pending':
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-yellow-800 bg-yellow-100 rounded-full">Pending</span>;
      case 'failed':
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-red-800 bg-red-100 rounded-full">Failed</span>;
      default:
        return <span className="inline-flex px-2 text-xs font-semibold leading-5 text-gray-800 bg-gray-100 rounded-full">{status}</span>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method.toLowerCase()) {
      case 'credit card':
        return <FaMoneyBill className="text-blue-500" />;
      case 'mobile banking':
        return <FaMoneyBill className="text-green-500" />;
      default:
        return <FaMoneyBill className="text-gray-500" />;
    }
  };

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div className="container px-4 py-8 mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Payment History</h1>
          <p className="mt-2 text-gray-600">View and manage your payment transactions</p>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === 'all' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === 'completed' 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Completed
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === 'pending' 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('failed')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === 'failed' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              Failed
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="p-6 text-center bg-white rounded-lg shadow">
            <p className="text-xl text-gray-600">No payment records found.</p>
          </div>
        ) : (
          <div className="overflow-hidden bg-white shadow sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <li key={payment.id}>
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getPaymentMethodIcon(payment.payment_method)}
                        <p className="ml-2 text-sm font-medium text-blue-600 truncate">
                          {payment.payment_method} - ৳{payment.amount}
                        </p>
                      </div>
                      <div className="flex flex-shrink-0 ml-2">
                        {getStatusBadge(payment.status)}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <FaRoute className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {payment.journey_details}
                        </p>
                      </div>
                      <div className="flex items-center mt-2 text-sm text-gray-500 sm:mt-0">
                        <FaCalendarAlt className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>
                          {new Date(payment.payment_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="p-6 mt-8 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold text-gray-800">Make a New Payment</h2>
          <p className="mb-4 text-gray-600">
            To make a new payment, please book a journey first or recharge your metro card balance.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/schedule')}
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              <FaTrain className="inline mr-2" />
              Book a Journey
            </button>
            <button
              className="px-4 py-2 text-white bg-green-600 rounded-md hover:bg-green-700"
            >
              <FaMoneyBill className="inline mr-2" />
              Recharge Card
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Payments; 