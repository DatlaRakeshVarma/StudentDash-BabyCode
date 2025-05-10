import React from 'react';
import { GraduationCap, Home } from 'lucide-react';
import LoginForm from '../components/auth/LoginForm';
import { Link } from 'react-router-dom';

const Login: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link 
          to="/dashboard" 
          className="absolute top-4 left-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 shadow-sm"
        >
          <Home size={16} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="flex flex-col items-center mb-6">
          <div className="bg-blue-100 p-3 rounded-full">
            <GraduationCap size={32} className="text-blue-600" />
          </div>
          <h2 className="mt-3 text-center text-3xl font-extrabold text-gray-900">StudentDash</h2>
          <p className="mt-2 text-center text-sm text-gray-600 max-w">
            Manage your students effectively and efficiently
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;