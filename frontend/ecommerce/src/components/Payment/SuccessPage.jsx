import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SuccessPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      // You can update the order status or perform other actions based on the sessionId
      console.log('Payment successful. Session ID:', sessionId);
    }
  }, [sessionId]);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your order!</p>
    </div>
  );
};

export default SuccessPage;