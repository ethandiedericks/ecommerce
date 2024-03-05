import React, { useState } from 'react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import Logo from './Logo';
import SearchForm from './SearchForm';
import MobileNav from './MobileNav';
import DesktopNav from './DesktopNav';
import LoginModal from '../Auth/LoginModal';
import RegisterModal from '../Auth/RegisterModal';
import axios from '../../axios'

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('access_token'));

  const toggleLoginModal = () => {
    setLoginModalOpen(prevState => !prevState);
  };

  const toggleRegisterModal = () => {
    setRegisterModalOpen(prevState => !prevState);
  };

  const handleLogin = () => {
    // Perform login actions, including setting tokens in localStorage
    // After successful login, update isAuthenticated state
    setIsAuthenticated(true);
    setLoginModalOpen(false); // Close the login modal
  };

  const handleLogout = async () => {
    try {
        // Fetch the refresh token from localStorage
        const refresh_token = localStorage.getItem('refresh_token');

        // Check if the refresh token exists
        if (!refresh_token) {
            console.error('Refresh token not found.');
            return;
        }

        // Make a POST request to the logout endpoint with the refresh token
        const response = await axios.post('u/logout/', { refresh_token });

        // Check if the logout was successful
        if (response.status === 200) {
            // Clear the tokens from localStorage
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            // Update authentication state if needed
            setIsAuthenticated(false);
            console.log('Logged out successfully.');
        } else {
            console.error('Logout failed:', response.data.message);
        }
    } catch (error) {
        console.error('Error logging out:', error.message);
    }
};

  return (
    <header className="inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 md:px-8 w-full" aria-label="Global">
        <Logo />
        <Bars3IconWrapper setMobileMenuOpen={setMobileMenuOpen} />
        <SearchForm />
        <DesktopNav
          isAuthenticated={isAuthenticated}
          toggleLoginModal={toggleLoginModal}
          toggleRegisterModal={toggleRegisterModal}
          handleLogout={handleLogout}
        />
      </nav>
      <MobileNav
          isAuthenticated={isAuthenticated}
          toggleLoginModal={toggleLoginModal}
          toggleRegisterModal={toggleRegisterModal}
          handleLogout={handleLogout}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      <LoginModal openModal={loginModalOpen} onClose={setLoginModalOpen} isAuthenticated={isAuthenticated} onLogout={handleLogout} onLoginSuccess={() => setIsAuthenticated(true)} />

      <RegisterModal openModal={registerModalOpen} onClose={setRegisterModalOpen} />
    </header>
  );
};

const Bars3IconWrapper = ({ setMobileMenuOpen }) => (
  <div className="flex md:hidden">
    <button
      type="button"
      className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
      onClick={() => setMobileMenuOpen(true)}
    >
      <span className="sr-only">Open main menu</span>
      <Bars3Icon className="h-6 w-6" aria-hidden="true" />
    </button>
  </div>
);

export default Header;
