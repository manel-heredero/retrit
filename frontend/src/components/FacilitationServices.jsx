import React from 'react';
import { Link } from 'react-router-dom';

const FacilitationServices = () => {
  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md my-8 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Our Facilitation Services</h2>
      <p className="text-gray-700 mb-6">
        We offer professional facilitation services to help teams and organizations 
        achieve their goals through structured and effective collaboration. Let us 
        help you make your next meeting or workshop a success.
      </p>
      <Link 
        to="/services" 
        className="inline-block bg-blue-600 text-white px-6 py-2 rounded-md 
                  hover:bg-blue-700 transition-colors duration-300"
      >
        Find Out More
      </Link>
    </div>
  );
};

export default FacilitationServices;