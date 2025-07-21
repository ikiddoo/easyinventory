import type { User } from './types/user';
import { useState, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar';
import ProductManagement from './components/ProductManagement/ProductManagement';
import AuthContainer from './components/AuthContainer/AuthContainer';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (accessToken: string, userData: User) => {
    setToken(accessToken);
    setUser(userData);
    setIsAuthenticated(true);
    
    localStorage.setItem('token', accessToken);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  if (!isAuthenticated) {
    return <AuthContainer onAuthenticated={handleLogin} />;
  }

  return (
    <>
      <Navbar user={user!} onLogout={handleLogout} />
      <ProductManagement token={token!} /> 
    </>
  );
};

export default App;