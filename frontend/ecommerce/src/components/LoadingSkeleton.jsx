import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="w-full p-4 bg-gray-50">
      <div className="max-w-5xl mx-auto grid grid-cols-1 gap-y-8 p-8">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 bg-white border border-gray-200 rounded-lg shadow p-8 animate-pulse">
          <div className="flex justify-center">
            <div className="bg-gray-300 rounded-lg h-[400px] w-full"></div>
          </div>
          <div className="flex flex-col justify-center">
            <div className="bg-gray-300 rounded-lg h-10 w-3/4 mb-4"></div>
            <div className="bg-gray-300 rounded-lg h-5 w-2/3 mb-2"></div>
            <div className="bg-gray-300 rounded-lg h-5 w-1/2 mb-4"></div>
            <div className="bg-gray-300 rounded-lg h-8 w-1/4 mb-4"></div>
            <div className="bg-gray-300 rounded-lg h-10 w-full"></div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 bg-white border border-gray-200 rounded-lg shadow p-8">
          <div className="flex flex-col justify-center items-center">
            <div className="bg-gray-300 rounded-lg h-8 w-2/3 mb-4"></div>
            <div className="bg-gray-300 rounded-lg h-5 w-1/2 mb-4"></div>
            <div className="bg-gray-300 rounded-lg h-10 w-2/3"></div>
          </div>
          <div className="bg-gray-300 rounded-lg h-[200px]"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;