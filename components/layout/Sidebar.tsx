
import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { NavTab } from '../../types';
import { DashboardIcon, BuilderIcon, SettingsIcon } from '../icons/IconComponents';
import { useAuth } from '../../contexts/AuthContext';

interface NavItemProps {
    to: string;
    icon: React.ReactNode;
    label: string;
    isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, label, isCollapsed }) => {
    const location = useLocation();
    const isActive = location.pathname === to || (to === '/' && location.pathname === '/');

    return (
        <NavLink
            to={to}
            className={`flex items-center p-3 my-1 rounded-lg transition-all duration-200 group ${
                isActive
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-gray-700/50'
            }`}
        >
            <span className={`${isActive ? 'text-white' : 'text-gray-500 group-hover:text-indigo-600 dark:text-gray-400'}`}>
                {icon}
            </span>
            {!isCollapsed && <span className="ml-4 font-semibold text-sm">{label}</span>}
        </NavLink>
    );
};

const Sidebar: React.FC = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { logout } = useAuth();

    return (
        <aside className={`flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 shadow-sm z-40 ${isCollapsed ? 'w-20' : 'w-64'}`}>
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800 h-16">
                {!isCollapsed && (
                    <div className="flex items-center space-x-2">
                        <div className="bg-indigo-600 p-1.5 rounded-lg shadow-md shadow-indigo-100 dark:shadow-none">
                            <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <span className="text-xl font-black text-gray-900 dark:text-white tracking-tight">FlowPilot AI</span>
                    </div>
                )}
                <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isCollapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
                    </svg>
                </button>
            </div>
            <nav className="flex-1 p-3 space-y-1">
                <NavItem to="/" icon={<DashboardIcon />} label={NavTab.Dashboard} isCollapsed={isCollapsed} />
                <NavItem to="/builder" icon={<BuilderIcon />} label={NavTab.Builder} isCollapsed={isCollapsed} />
                <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800">
                    <NavItem 
                        to="/admin" 
                        icon={<svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944a11.955 11.955 0 01-8.618 3.04M12 2.944V21m0-18.056L3.382 6m17.236 0L12 2.944" /></svg>} 
                        label={NavTab.Admin} 
                        isCollapsed={isCollapsed} 
                    />
                    <NavItem to="/settings" icon={<SettingsIcon />} label={NavTab.Settings} isCollapsed={isCollapsed} />
                </div>
            </nav>
            
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
                <button 
                    onClick={logout}
                    className={`w-full flex items-center p-3 rounded-xl transition-all duration-200 group bg-red-50 dark:bg-red-900/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/20 border border-red-100 dark:border-red-900/20 ${isCollapsed ? 'justify-center px-0' : ''}`}
                    title="Sign Out"
                >
                    <span className="flex-shrink-0">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </span>
                    {!isCollapsed && <span className="ml-4 font-bold text-sm">Sign Out</span>}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
