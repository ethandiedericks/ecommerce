import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom if you're using it
import Logo from './Logo'; // Import the Logo component if you have one

const MobileNav = ({ mobileMenuOpen, setMobileMenuOpen, isAuthenticated, toggleLoginModal, toggleRegisterModal, handleLogout }) => (
  <div className={`${mobileMenuOpen ? 'block' : 'hidden'} md:hidden`}>
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white">
      <div className="flex items-center justify-between px-4 py-4">
        <Logo />
        <button
          type="button"
          className="text-gray-700 focus:outline-none"
          onClick={() => setMobileMenuOpen(false)}
        >
            
          <XMarkIcon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      
      <div className="px-2 pt-2 pb-3 space-y-1">
        {isAuthenticated ? (
          <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100">Logout</button>
        ) : (
          <>
          <button className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" onClick={toggleRegisterModal}>Register</button>
          <button className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100" onClick={toggleLoginModal}>Log in</button>
            
          </>
        )}
        
      </div>
    </div>
  </div>
);

export default MobileNav;
