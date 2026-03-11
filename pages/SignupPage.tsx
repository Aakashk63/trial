
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SignupPage: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        
        if (!firstName || !lastName || !email || !password) {
            setError('Please fill in all fields.');
            return;
        }

        const success = signup(email, password, firstName, lastName);
        if (success) {
            navigate('/');
        } else {
            setError('An account with this email already exists.');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-3 bg-indigo-600 rounded-2xl mb-4 shadow-xl shadow-indigo-200 dark:shadow-none">
                        <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">Create Account</h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-2">Start automating your business with AI</p>
                </div>
                <Card className="rounded-3xl shadow-2xl border-none p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="grid grid-cols-2 gap-4">
                            <Input 
                                label="First Name" 
                                placeholder="Jane" 
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                required
                            />
                            <Input 
                                label="Last Name" 
                                placeholder="Doe" 
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                required
                            />
                        </div>
                        <Input 
                            label="Work Email" 
                            type="email" 
                            placeholder="jane@company.com" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input 
                            label="Password" 
                            type="password" 
                            placeholder="••••••••" 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        
                        {error && (
                            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm font-bold flex items-center">
                                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                {error}
                            </div>
                        )}

                        <div className="flex items-center">
                            <input type="checkbox" required className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                            <label className="ml-2 block text-xs text-gray-600 dark:text-gray-400">
                                I agree to the <a href="#" className="text-indigo-600 font-bold underline">Terms of Service</a> and <a href="#" className="text-indigo-600 font-bold underline">Privacy Policy</a>.
                            </label>
                        </div>
                        
                        <Button type="submit" className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-none">
                            Create Free Account
                        </Button>
                    </form>
                    
                    <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Already have an account? <NavLink to="/login" className="text-indigo-600 font-bold hover:underline">Sign in</NavLink>
                        </p>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default SignupPage;
