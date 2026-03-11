
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const AdminPage: React.FC = () => {
    const { webhookUrl, setWebhookUrl } = useAppContext();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    
    const [localWebhookUrl, setLocalWebhookUrl] = useState(webhookUrl);
    const [saved, setSaved] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === 'Admin2314' && password === 'Admin@2314') {
            setIsAuthenticated(true);
            setError('');
        } else {
            setError('Invalid credentials for admin access.');
        }
    };

    const handleSave = () => {
        setWebhookUrl(localWebhookUrl);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    if (!isAuthenticated) {
        return (
            <div className="max-w-md mx-auto mt-20">
                <Card className="p-8">
                    <div className="text-center mb-6">
                        <div className="inline-flex items-center justify-center p-3 bg-red-100 dark:bg-red-900/30 text-red-600 rounded-full mb-4">
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                        </div>
                        <h2 className="text-xl font-bold dark:text-white">Admin Restricted Area</h2>
                        <p className="text-sm text-gray-500 mt-1">Please enter your specialized credentials to access backend configuration.</p>
                    </div>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input 
                            label="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                        <Input 
                            label="Password" 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                        {error && <p className="text-xs text-red-500 font-bold">{error}</p>}
                        <Button type="submit" className="w-full">Unlock Panel</Button>
                    </form>
                </Card>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Admin Panel</h2>
                <button 
                    onClick={() => setIsAuthenticated(false)}
                    className="text-sm font-bold text-red-600 hover:underline"
                >
                    Lock Session
                </button>
            </div>

            <Card>
                <div className="flex items-center space-x-3 mb-6 border-b border-gray-100 dark:border-gray-800 pb-4">
                    <div className="bg-indigo-600 p-2 rounded-lg text-white">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                        <h3 className="text-lg font-bold dark:text-white">Backend Integration</h3>
                        <p className="text-sm text-gray-500">Configure the primary automation engine connection.</p>
                    </div>
                </div>

                <div className="space-y-6">
                    <div>
                        <Input
                            label="Webhook URL"
                            id="webhook-url"
                            type="text"
                            value={localWebhookUrl}
                            onChange={(e) => setLocalWebhookUrl(e.target.value)}
                            placeholder="https://your-n8n-instance.com/webhook/..."
                        />
                        <div className="mt-3 p-3 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                             <div className="flex items-start">
                                <svg className="h-5 w-5 text-indigo-600 mt-0.5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                <p className="text-xs text-indigo-700 dark:text-indigo-300 leading-relaxed">
                                    All customer message data submitted through the Command Center is routed to this endpoint for processing. Ensure your n8n workflow is listening for POST requests.
                                </p>
                             </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center pt-4 border-t border-gray-100 dark:border-gray-800">
                        {saved && <span className="text-sm font-bold text-green-600 mr-4">Configuration Saved</span>}
                        <Button onClick={handleSave} className="px-8">Update Webhook</Button>
                    </div>
                </div>
            </Card>

            <Card className="border-red-100 dark:border-red-900/30">
                <h3 className="text-lg font-bold text-red-600 mb-4">Danger Zone</h3>
                <div className="flex items-center justify-between p-4 bg-red-50 dark:bg-red-900/10 rounded-xl border border-red-100 dark:border-red-900/20">
                    <div>
                        <p className="font-bold text-sm text-gray-900 dark:text-white">Reset Application State</p>
                        <p className="text-xs text-gray-500">Wipe all message history and local cache. This cannot be undone.</p>
                    </div>
                    <Button variant="danger">Factory Reset</Button>
                </div>
            </Card>
        </div>
    );
};

export default AdminPage;
