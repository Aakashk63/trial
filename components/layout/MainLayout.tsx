
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';
import ChatWidget from '../ai/ChatWidget';
import { NavTab } from '../../types';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    const getTitle = () => {
        switch (location.pathname) {
            case '/': return NavTab.Dashboard;
            case '/builder': return NavTab.Builder;
            case '/admin': return NavTab.Admin;
            case '/settings': return NavTab.Settings;
            default: return 'Dashboard';
        }
    };

    return (
        <div className="flex h-screen relative overflow-hidden bg-transparent">
            <Sidebar />
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <Header title={getTitle()} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-transparent p-6">
                    <div className="max-w-7xl mx-auto">
                        {children}
                    </div>
                </main>
            </div>
            {/* Floating AI Assistant Widget */}
            <ChatWidget />
        </div>
    );
};

export default MainLayout;
