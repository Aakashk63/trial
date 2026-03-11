
import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MainLayout from './components/layout/MainLayout';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import BuilderPage from './pages/BuilderPage';
import AdminPage from './pages/AdminPage';
import SettingsPage from './pages/SettingsPage';

const App: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-transparent dark:bg-gray-900/50 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300 antialiased">
      <HashRouter>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <LoginPage />} />
          <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route 
            path="/*"
            element={
              isAuthenticated ? (
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/builder" element={<BuilderPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/settings" element={<SettingsPage />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </MainLayout>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </HashRouter>
    </div>
  );
};

export default App;
