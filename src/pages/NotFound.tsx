import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="text-center px-4">
        <div className="text-9xl font-bold text-primary-600 dark:text-primary-400 animate-fade-in">
          404
        </div>
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mt-4">
          Page Not Found
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2 max-w-md">
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/dashboard"
          className="inline-flex items-center mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg"
        >
          <FiHome className="w-5 h-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default NotFound;