
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const ForgotPasswordPage: React.FC = () => {
    const [submitted, setSubmitted] = useState(false);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
            <div className="max-w-md w-full">
                <Card className="rounded-3xl shadow-2xl border-none p-8">
                    {!submitted ? (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">Reset Password</h1>
                                <p className="text-gray-500 dark:text-gray-400 mt-2">Enter your email and we'll send you a link to reset your password.</p>
                            </div>
                            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                                <Input label="Email Address" type="email" placeholder="name@company.com" required />
                                <Button className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-indigo-200 dark:shadow-none">
                                    Send Reset Link
                                </Button>
                            </form>
                        </>
                    ) : (
                        <div className="text-center py-4">
                            <div className="inline-flex items-center justify-center p-3 bg-green-100 dark:bg-green-900/20 rounded-full mb-4">
                                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check your email</h2>
                            <p className="mt-2 text-gray-500 dark:text-gray-400">If an account exists for that address, we have sent password reset instructions.</p>
                        </div>
                    )}
                    <div className="mt-8 text-center">
                        <NavLink to="/login" className="text-indigo-600 font-bold hover:underline">Back to Sign In</NavLink>
                    </div>
                </Card>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
