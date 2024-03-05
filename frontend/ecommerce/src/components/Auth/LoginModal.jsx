// LoginModal.jsx
import { useState, useEffect } from 'react';
import LoginForm from './LoginForm';

function LoginModal({ openModal, onClose, isAuthenticated, onLogout, onLoginSuccess }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(openModal);
  }, [openModal]);

  const closeModal = () => {
    setIsOpen(false);
    onClose(false); // This will inform the parent component that the modal is closed
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const handleLoginSuccess = () => {
    closeModal();
    onLoginSuccess(); // Update isAuthenticated state in the parent component
  };

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('access_token');
    onLogout();
  };

  return (
    <>
      {/* Main modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center">
          {/* Modal overlay */}
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleOverlayClick}
            aria-hidden="true"
          ></div>
          {/* Modal content */}
          <div
            id="login-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="relative p-4 w-full max-w-md"
          >
            <div className="relative bg-white rounded-lg shadow">
              {/* Modal header */}
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-gray-900">
                  Log in to your account
                </h3>
                <button
                  onClick={closeModal}
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center"
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 14 14"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              {/* Modal body */}
              <div className="p-4 md:p-5">
                {isAuthenticated ? (
                  <div>
                    <p className="text-lg font-medium text-gray-900">You are logged in!</p>
                    <button onClick={handleLogout} className="mt-4 block w-full bg-red-500 hover:bg-red-600 text-white text-sm font-medium rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-red-300">Logout</button>
                  </div>
                ) : (
                  <LoginForm onLogin={handleLoginSuccess} />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LoginModal;
