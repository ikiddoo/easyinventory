import React, { useState } from 'react';
import type { User } from '../../types/user';
import Register from '../Register/Register';
import Login from '../Login/Login';

const AuthContainer: React.FC<{ onAuthenticated: (token: string, user: User) => void }> = ({ onAuthenticated }) => {
  const [showRegister, setShowRegister] = useState(false);

  const handleShowRegister = () => setShowRegister(true);
  const handleBackToLogin = () => setShowRegister(false);

  if (showRegister) {
    return (
      <Register 
        onRegister={onAuthenticated}
        onBackToLogin={handleBackToLogin}
      />
    );
  }

  return (
    <Login 
      onLogin={onAuthenticated}
      onShowRegister={handleShowRegister}
    />
  );
};

export default AuthContainer;