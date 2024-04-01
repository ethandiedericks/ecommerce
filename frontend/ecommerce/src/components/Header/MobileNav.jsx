import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import NavigationItem from './NavigationItem';
import AuthButtons from './AuthButtons';
import Cart from '../Cart/Cart';
import Dropdown from './Dropdown';

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
        <div className="px-2 pt-2 pb-3 ">
          <div className="flex flex-col space-y-4 justify-center">
            <AuthButtons
              isAuthenticated={isAuthenticated}
              toggleLoginModal={toggleLoginModal}
              toggleRegisterModal={toggleRegisterModal}
              handleLogout={handleLogout}
              className="w-full"
            />
            
            <div className='flex-col text-center'> 
              <CartWrapper toggleCart={toggleCart} isCartOpen={isCartOpen} onCloseCart={closeCart} />
              <Dropdown/>
            </div>
            
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
      text="Cart"
      onClick={toggleCart}
    />
  </div>
);

export default MobileNav;