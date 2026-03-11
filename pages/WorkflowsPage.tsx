
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ToggleSwitch from '../components/ui/ToggleSwitch';

const WorkflowsPage: React.FC = () => {
    const { workflows, toggleWorkflow, deleteWorkflow } = useAppContext();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredWorkflows = workflows.filter(w => 
        w.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        w.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="relative w-full md:w-96">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                        </svg>
                    </span>
                    <input 
                        type="text" 
                        className="block w-full pl-10 pr-3 py-2 border border-gray-200 dark:border-gray-800 rounded-xl bg-white dark:bg-gray-900 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                        placeholder="Search workflows..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex space-x-3">
                    <Button variant="secondary">Export Logs</Button>
                    <Button>New Folder</Button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {filteredWorkflows.length > 0 ? filteredWorkflows.map(workflow => (
                    <Card key={workflow.id} className="hover:border-indigo-200 dark:hover:border-indigo-900 transition-all p-5">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start space-x-4">
                                <div className={`p-3 rounded-2xl ${workflow.status === 'Active' ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
                                        {workflow.name}
                                        {workflow.status === 'Active' && <span className="ml-2 flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{workflow.description}</p>
                                    <div className="mt-2 flex items-center space-x-4 text-xs font-medium text-gray-400">
                                        <span className="flex items-center"><svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Last run: {workflow.lastExecuted || 'Never'}</span>
                                        <span className="flex items-center"><svg className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> Created: {workflow.createdAt}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-2">
                                    <span className={`text-xs font-bold uppercase tracking-wider ${workflow.status === 'Active' ? 'text-green-600' : 'text-gray-400'}`}>
                                        {workflow.status}
                                    </span>
                                    <ToggleSwitch 
                                        checked={workflow.status === 'Active'} 
                                        onChange={() => toggleWorkflow(workflow.id)} 
                                        srLabel="Toggle Status"
                                    />
                                </div>
                                <div className="flex items-center border-l border-gray-100 dark:border-gray-800 pl-6 space-x-2">
                                    <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors">
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                                    </button>
                                    <button 
                                        onClick={() => deleteWorkflow(workflow.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                    >
                                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Card>
                )) : (
                    <div className="text-center py-20 bg-gray-50 dark:bg-gray-800/50 rounded-3xl border-2 border-dashed border-gray-200 dark:border-gray-700">
                        <div className="mx-auto h-20 w-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-400 mb-4">
                            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">No workflows found</h3>
                        <p className="text-gray-500 mt-1">Start by creating an automation with AI Architect.</p>
                        <Button className="mt-6" onClick={() => window.location.hash = '#/builder'}>Get Started</Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkflowsPage;
