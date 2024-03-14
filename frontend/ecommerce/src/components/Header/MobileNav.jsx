import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import AuthButtons from './AuthButtons';
import Cart from '../Cart/Cart';

const MobileNav = ({
  mobileMenuOpen,
  setMobileMenuOpen,
  isAuthenticated,
  toggleLoginModal,
  toggleRegisterModal,
  handleLogout,
}) => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen((prevState) => !prevState);
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
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
        <div className="px-2 pt-2 pb-3">
          <div className="flex flex-col space-y-4 justify-center">
            <div className='inline-flex justify-center'> 
              <CartWrapper toggleCart={toggleCart} isCartOpen={isCartOpen} onCloseCart={closeCart} />
            </div>
            <AuthButtons
              isAuthenticated={isAuthenticated}
              toggleLoginModal={toggleLoginModal}
              toggleRegisterModal={toggleRegisterModal}
              handleLogout={handleLogout}
              className="w-full"
            />
          </div>
        </div>
      </div>
      {isCartOpen && <Cart openCart={isCartOpen} onCloseCart={closeCart} />}
    </div>
  );
};

const CartWrapper = ({ toggleCart, isCartOpen, onCloseCart }) => (
  <div className="flex items-center justify-center space-x-4">
    <NavigationItem
      icon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 inline"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
          />
        </svg>
      }
      text="Cart"
      onClick={toggleCart}
    />
  </div>
);

export default MobileNav;