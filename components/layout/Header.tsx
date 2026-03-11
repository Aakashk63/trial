
import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../contexts/ThemeContext';
import ToggleSwitch from '../ui/ToggleSwitch';
import { SunIcon, MoonIcon } from '../icons/IconComponents';
import { useAuth } from '../../contexts/AuthContext';
import { useAppContext } from '../../contexts/AppContext';

const Header: React.FC<{ title: string }> = ({ title }) => {
    const { theme, toggleTheme } = useTheme();
    const { logout } = useAuth();
    const { notifications, markNotificationRead } = useAppContext();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [notifOpen, setNotifOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const notifRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setDropdownOpen(false);
            }
            if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
                setNotifOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
            <div className="flex items-center space-x-6">
                <ToggleSwitch
                    checked={theme === 'dark'}
                    onChange={toggleTheme}
                    srLabel="Toggle dark mode"
                    onIcon={<MoonIcon />}
                    offIcon={<SunIcon />}
                />
                
                {/* Notifications */}
                <div className="relative" ref={notifRef}>
                    <button
                        onClick={() => setNotifOpen(!notifOpen)}
                        className="p-2 text-gray-500 hover:text-indigo-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-full transition-all relative"
                    >
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        {unreadCount > 0 && (
                            <span className="absolute top-1 right-1 block h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white dark:ring-gray-900"></span>
                        )}
                    </button>
                    {notifOpen && (
                        <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-50 animate-in fade-in slide-in-from-top-2">
                            <div className="p-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800/50">
                                <h3 className="font-bold text-gray-900 dark:text-white">Notifications</h3>
                                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full">New: {unreadCount}</span>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {notifications.length > 0 ? notifications.map(n => (
                                    <div 
                                        key={n.id} 
                                        className={`p-4 border-b border-gray-50 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors cursor-pointer ${!n.read ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}
                                        onClick={() => markNotificationRead(n.id)}
                                    >
                                        <div className="flex items-start space-x-3">
                                            <div className={`mt-1 h-2 w-2 rounded-full flex-shrink-0 ${n.type === 'error' ? 'bg-red-500' : 'bg-green-500'}`}></div>
                                            <div className="flex-1">
                                                <p className="text-sm font-bold text-gray-900 dark:text-white">{n.title}</p>
                                                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 line-clamp-2">{n.message}</p>
                                                <p className="text-[10px] text-gray-400 mt-1">{n.timestamp}</p>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="p-8 text-center text-gray-400 text-sm">No new notifications</div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 group focus:outline-none"
                    >
                        <div className="h-9 w-9 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold border-2 border-transparent group-hover:border-indigo-400 transition-all">
                            ST
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-bold text-gray-900 dark:text-white">ST</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
                        </div>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden z-50">
                            <div className="py-2">
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Account Profile</button>
                                <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">Billing & Subscription</button>
                                <div className="border-t border-gray-100 dark:border-gray-700 my-1"></div>
                                <button
                                    onClick={logout}
                                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 font-medium"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
