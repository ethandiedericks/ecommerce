import { useNavigate } from 'react-router-dom';

const AccountDetails = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="mx-auto max-w-lg p-6">
      <button onClick={handleGoBack} className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md">Back</button>
      <h1 className="text-2xl font-bold mb-4">Account Details</h1>
      <div className="bg-white shadow-md rounded-md p-4">
        <p className="text-gray-800">Account Information</p>
        <p className="text-gray-600">Name: John Doe</p>
        <p className="text-gray-600">Email: johndoe@example.com</p>
        <p className="text-gray-600">Address: 123 Main St, City, Country</p>
      </div>
    </div>
  );
};

export default AccountDetails;
