import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <button onClick={handleGoBack} className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">Back</button>
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      <div className="bg-white shadow-md rounded-md p-4">
        <div className="border-b-2 border-gray-200 mb-4 pb-2">
          <h2 className="text-lg font-semibold">Order #12345</h2>
          <p className="text-gray-600">Status: Shipped</p>
        </div>
        <div className="border-b-2 border-gray-200 mb-4 pb-2">
          <h2 className="text-lg font-semibold">Order #54321</h2>
          <p className="text-gray-600">Status: Processing</p>
        </div>
        <div className="border-b-2 border-gray-200 mb-4 pb-2">
          <h2 className="text-lg font-semibold">Order #98765</h2>
          <p className="text-gray-600">Status: Delivered</p>
        </div>
      </div>
    </div>
  );
};

export default Orders;
