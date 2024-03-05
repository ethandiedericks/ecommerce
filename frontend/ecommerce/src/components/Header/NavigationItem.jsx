import React from 'react';

const NavigationItem = ({ icon, text, onClick }) => (
  <button
    className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-700"
    onClick={onClick}
  >
    {icon && <span className="mr-2">{icon}</span>}
    {text}
  </button>
);

export default NavigationItem;