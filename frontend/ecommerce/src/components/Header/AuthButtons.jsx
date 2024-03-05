import React from 'react';
import NavigationItem from './NavigationItem';

const AuthButtons = ({ isAuthenticated, toggleLoginModal, toggleRegisterModal, handleLogout }) => (
  <>
    {isAuthenticated ? (
      <NavigationItem text="Log Out" onClick={handleLogout} />
    ) : (
      <>
        <NavigationItem text="Register" onClick={toggleRegisterModal} />
        <NavigationItem text="Log in" onClick={toggleLoginModal} />
      </>
    )}
  </>
);

export default AuthButtons;