
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface User {
  email: string;
  pass: string;
  firstName?: string;
  lastName?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, pass: string) => boolean;
  signup: (email: string, pass: string, firstName: string, lastName: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useLocalStorage<boolean>('isAuthenticated', false);
  const [users, setUsers] = useLocalStorage<User[]>('registeredUsers', [
    { email: 'admin@example.com', pass: 'Admin@2314', firstName: 'Admin', lastName: 'User' }
  ]);

  const login = (email: string, pass: string) => {
    const user = users.find(u => u.email === email && u.pass === pass);
    if (user) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const signup = (email: string, pass: string, firstName: string, lastName: string) => {
    if (users.find(u => u.email === email)) {
      return false; // User already exists
    }
    const newUser: User = { email, pass, firstName, lastName };
    setUsers([...users, newUser]);
    setIsAuthenticated(true); // Auto-login after signup
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
