
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import { useTheme } from '../contexts/ThemeContext';
import Card from '../components/ui/Card';
import ToggleSwitch from '../components/ui/ToggleSwitch';
import { SunIcon, MoonIcon } from '../components/icons/IconComponents';

const SettingsPage: React.FC = () => {
    const { clearSessionData } = useAppContext();
    const { theme, toggleTheme } = useTheme();

    const handleClearData = () => {
        if (window.confirm('Are you sure you want to clear all session data? This cannot be undone.')) {
            clearSessionData();
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <Card>
                <h2 className="text-lg font-bold border-b pb-3 mb-4 border-gray-200 dark:border-gray-700 dark:text-white">Appearance</h2>
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-medium dark:text-white">Theme Mode</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Personalize your workspace visibility.</p>
                    </div>
                    <ToggleSwitch
                        checked={theme === 'dark'}
                        onChange={toggleTheme}
                        srLabel="Toggle theme"
                        onIcon={<MoonIcon />}
                        offIcon={<SunIcon />}
                    />
                </div>
            </Card>
            
            <Card>
                <h2 className="text-lg font-bold border-b pb-3 mb-4 border-gray-200 dark:border-gray-700 dark:text-white">Account Preferences</h2>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-medium dark:text-white">Notifications</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive desktop alerts for workflow failures.</p>
                        </div>
                        <ToggleSwitch checked={true} onChange={() => {}} srLabel="Toggle notifications" />
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default SettingsPage;
