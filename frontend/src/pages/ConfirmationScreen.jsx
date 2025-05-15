import React from 'react';

const ConfirmationScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center p-4">
      <div className="text-6xl text-gray-500 mb-4">✔</div>
      <h1 className="text-4xl font-bold text-gray-700 mb-6">Done</h1>
      <p className="text-2xl text-gray-700">
        <span className="font-bold">Thank You</span>{' '}
        <span className="text-lg">for choosing</span>{' '}
        <span className="font-bold">GoRyde</span>
      </p>
    </div>
  );
};

export default ConfirmationScreen;