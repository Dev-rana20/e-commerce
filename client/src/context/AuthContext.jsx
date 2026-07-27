import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe, login as authLogin, register as authRegister } from '../services/authService';
import { TOKEN_KEY, USER_KEY } from '../constants/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = localStorage.getItem(TOKEN_KEY) || localStorage.getItem('kelys_token');
      if (storedToken) {
        setToken(storedToken);
        try {
          const userData = await getMe();
          setUser(userData);
          localStorage.setItem(USER_KEY, JSON.stringify(userData));
        } catch (error) {
          console.error("Failed to authenticate user", error);
          localStorage.removeItem(TOKEN_KEY);
          localStorage.removeItem('kelys_token');
          localStorage.removeItem(USER_KEY);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (loginData) => {
    const data = await authLogin(loginData);
    const user = { id: data.userId, email: data.email, firstName: data.firstName, lastName: data.lastName, role: data.role };
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem('kelys_token', data.token);
    setToken(data.token);
    setUser(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return data;
  };

  const register = async (registerData) => {
    const data = await authRegister(registerData);
    const user = { id: data.userId, email: data.email, firstName: data.firstName, lastName: data.lastName, role: data.role };
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem('kelys_token', data.token);
    setToken(data.token);
    setUser(user);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    return data;
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('kelys_token');
    localStorage.removeItem(USER_KEY);
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: user !== null,
    isAdmin: user?.role === 'ADMIN'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
