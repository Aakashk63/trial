
import React from 'react';
import { useAppContext } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import { NavLink } from 'react-router-dom';
import AutomationForm from '../components/automation/AutomationForm';
import ResultPreview from '../components/automation/ResultPreview';

const DashboardPage: React.FC = () => {
    const { messages, lastResponse } = useAppContext();

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Automation Command Center</h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">Connect your frontend inputs to n8n backend workflows.</p>
                </div>
                <div className="flex space-x-2">
                  <NavLink to="/builder">
                      <button className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 font-bold py-2.5 px-6 rounded-xl border border-indigo-200 dark:border-indigo-900/50 transition-all hover:bg-indigo-100 dark:hover:bg-indigo-900/40">
                          Architect Flow
                      </button>
                  </NavLink>
                </div>
            </div>

            {/* Visual Hero Section - Enlarge Primary Hero */}
            <div className="relative overflow-hidden rounded-3xl bg-indigo-600 h-80 shadow-2xl">
                <img 
                    src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" 
                    alt="AI Automation" 
                    className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                />
                <div className="relative h-full flex flex-col justify-center p-12 text-white">
                    <div className="flex items-center space-x-3 mb-4">
                        <span className="bg-indigo-400 h-2 w-2 rounded-full animate-pulse"></span>
                        <span className="text-xs font-bold uppercase tracking-widest text-indigo-200">System Active</span>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-black tracking-tight leading-tight uppercase max-w-3xl">FlowPilot AI: The Pulse of Intelligent Workflows.</h3>
                    <p className="mt-4 text-indigo-100 text-lg md:text-xl font-medium max-w-2xl">Empower your business with autonomous routing and native intelligence. Orchestrate logic seamlessly across every platform.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <AutomationForm />
                    {lastResponse && <ResultPreview result={lastResponse} />}
                    
                    <Card>
                      <div className="flex items-center justify-between mb-6">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Platform Quick Start Guide</h3>
                            <p className="text-sm text-gray-500">Master the FlowPilot AI workflow in 4 simple steps.</p>
                          </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">1</div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">Backend Connectivity</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Set up your <b>n8n Webhook URL</b> in the Admin Panel. This acts as the secure digital bridge, allowing the dashboard to send raw data directly to your private automation server for real-time processing.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">2</div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">Architectural Strategy</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Utilize the <b>AI Architect</b> to conceptualize complex workflows. Instead of starting from scratch, the AI generates technical blueprints—outlining triggers, logic gates, and final actions based on your input.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">3</div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">Operation Command</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Use the <b>Command Center</b> to trigger live executions. By submitting data here, you initiate active routing, transforming static messages into actionable tasks through your configured workflows.</p>
                            </div>
                        </div>
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0 h-10 w-10 bg-indigo-100 dark:bg-indigo-900/40 rounded-xl flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">4</div>
                            <div>
                                <h4 className="font-bold text-gray-900 dark:text-white">Contextual Guidance</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Engage the <b>AI Assistant</b> for on-demand platform mastery. Whether you need help optimizing your logic or troubleshooting a connection, the assistant provides real-time, context-aware advice.</p>
                            </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 p-4 bg-indigo-50/50 dark:bg-indigo-900/10 rounded-2xl border border-indigo-100 dark:border-indigo-900/20 text-center">
                        <p className="text-sm text-indigo-700 dark:text-indigo-300 font-medium italic">
                            "Automation is not just about tools, it's about the logic that flows through them."
                        </p>
                      </div>
                  </Card>
                </div>

                <div className="space-y-6">
                    <Card className="h-full">
                        <div className="flex items-center justify-between mb-6">
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">Latest Submissions</h3>
                          <NavLink to="/builder" className="text-xs font-bold text-indigo-600 hover:underline">New Concept</NavLink>
                        </div>
                        <div className="space-y-6 overflow-y-auto max-h-[600px] pr-2">
                            {messages.length > 0 ? messages.slice(0, 8).map(msg => (
                                <div key={msg.id} className="flex items-start space-x-3 border-b border-gray-50 dark:border-gray-700/50 pb-4 last:border-0">
                                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center flex-shrink-0 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600`}>
                                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between">
                                          <p className="text-xs font-bold text-gray-900 dark:text-white truncate">{msg.sender_email}</p>
                                          <span className="text-[10px] text-gray-400">{msg.confidence}%</span>
                                        </div>
                                        <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{msg.workflow_action}</p>
                                    </div>
                                </div>
                            )) : (
                              <div className="text-center py-12 text-gray-400 italic text-sm">
                                No submissions yet. Run an automation to see original activity counts.
                              </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
