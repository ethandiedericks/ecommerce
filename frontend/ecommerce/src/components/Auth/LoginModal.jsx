import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';

function LoginModal({ openModal, onClose }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setIsOpen(openModal);
    }, [openModal]);

    const closeModal = () => {
        onClose(false);
    };

    const handleOverlayClick = (event) => {
        if (event.target === event.currentTarget) {
            closeModal();
        }
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto overflow-x-hidden flex items-center justify-center">
                    <div className="fixed inset-0 bg-black opacity-50" onClick={handleOverlayClick} aria-hidden="true"></div>
                    <div className="relative p-4 w-full max-w-md">
                        <div className="relative bg-white rounded-lg shadow">
                            <div className="flex items-center justify-between p-4 border-b rounded-t">
                                <h3 className="text-xl font-semibold text-gray-900">Sign in to our platform</h3>
                                <button onClick={closeModal} type="button" className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg w-8 h-8 flex justify-center items-center">
                                    <svg className="w-3 h-3" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                        <path d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            <div className="p-4">
                                <LoginForm />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;
