import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('loggedInUser');
    if (token && user) {
      setIsAuthenticated(true);
      setLoggedInUser(user);
      if (
        window.location.pathname === '/' ||
        window.location.pathname === '/login' ||
        window.location.pathname === '/signup'
      ) {
        navigate('/home', { replace: true });
      }
    }
  }, [navigate]);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('loggedInUser', user);
    setIsAuthenticated(true);
    setLoggedInUser(user);
    setTimeout(() => {
                    navigate('/home');
                }, 1000);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    setTimeout(() => {
                    setIsAuthenticated(false);
                }, 1000);
    
    setLoggedInUser('');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loggedInUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};