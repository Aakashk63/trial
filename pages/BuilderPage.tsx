
import React, { useState } from 'react';
import { useAppContext } from '../contexts/AppContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import Badge from '../components/ui/Badge';
import { GoogleGenAI, Type } from "@google/genai";

const BuilderPage: React.FC = () => {
    const { webhookUrl } = useAppContext();
    const [prompt, setPrompt] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [preview, setPreview] = useState<any>(null);

    const examples = [
        "When I get a new lead in HubSpot, send a personalized LinkedIn connection request.",
        "Monitor my mentions on Twitter and alert the marketing team on Slack if sentiment is negative.",
        "Daily at 9AM, summarize my unread Gmails and create Trello tasks for actionable items."
    ];

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
            const response = await ai.models.generateContent({
                model: 'gemini-3-pro-preview',
                contents: `Brainstorm a conceptual automation architecture for: "${prompt}"`,
                config: {
                    systemInstruction: "You are a senior Workflow Consultant for FlowPilot AI. Your task is to provide architectural ideas and conceptual blueprints. Design a concept with a catchy name, a strategic description, and 3 specific technical steps. Focus on high-level logic and best practices.",
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            description: { type: Type.STRING },
                            steps: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        type: { type: Type.STRING, description: 'Step category (e.g., Trigger, Logic, Action)' },
                                        app: { type: Type.STRING },
                                        description: { type: Type.STRING }
                                    },
                                    required: ['type', 'app', 'description']
                                }
                            }
                        },
                        required: ['name', 'description', 'steps']
                    }
                }
            });

            const result = JSON.parse(response.text || '{}');
            setPreview({
                id: Math.random().toString(36).substr(2, 9),
                ...result
            });
        } catch (error) {
            console.error("Concept Generation Error:", error);
            // Fallback for demo stability
            setPreview({
                id: Math.random().toString(36).substr(2, 9),
                name: "Workflow Concept",
                description: "A conceptual approach to solving your request with intelligent routing.",
                steps: [
                    { id: '1', type: 'Trigger', app: 'Primary App', description: 'Detect initial event' },
                    { id: '2', type: 'Logic', app: 'FlowPilot AI', description: 'Analyze intent and filter data' },
                    { id: '3', type: 'Action', app: 'Secondary App', description: 'Execute final process' }
                ]
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-4 duration-500 pb-20">
            <div className="text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">AI Concept Lab</h2>
                <p className="mt-2 text-gray-500 dark:text-gray-400">Collaborate with our AI to brainstorm sophisticated automation architectures and logic flows.</p>
            </div>

            <Card className="p-1">
                <div className="relative">
                    <textarea
                        rows={6}
                        className="block w-full p-6 bg-transparent border-none focus:ring-0 text-lg placeholder-gray-400 dark:placeholder-gray-600 dark:text-white resize-none"
                        placeholder="E.g., 'I want a system that handles high-ticket lead qualification and redirects them to my private Slack channel...'"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                    />
                    <div className="absolute bottom-4 right-4">
                        <button onClick={handleGenerate} disabled={!prompt || isLoading} className="h-12 px-8 rounded-xl shadow-lg shadow-indigo-100 dark:shadow-none bg-indigo-600 text-white font-bold hover:bg-indigo-700 disabled:opacity-50 transition-all">
                            {isLoading ? <Spinner size="sm" /> : 'Brainstorm Concept'}
                        </button>
                    </div>
                </div>
            </Card>

            <div className="flex flex-wrap gap-2 justify-center">
                <span className="text-sm text-gray-500 mr-2 py-1 font-medium">Inspiration:</span>
                {examples.map((ex, i) => (
                    <button 
                        key={i} 
                        onClick={() => setPrompt(ex)}
                        className="text-xs font-semibold bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-indigo-50 hover:text-indigo-600 dark:hover:bg-indigo-900/30 px-4 py-2 rounded-xl transition-all border border-gray-100 dark:border-gray-700 hover:border-indigo-200"
                    >
                        {ex.substring(0, 40)}...
                    </button>
                ))}
            </div>

            {preview && (
                <div className="space-y-6 animate-in zoom-in-95 duration-300">
                    <div className="flex items-center space-x-4 px-2">
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Architectural Suggestion</span>
                        <div className="h-px flex-1 bg-gray-200 dark:bg-gray-800"></div>
                    </div>

                    <Card className="border-2 border-indigo-100 dark:border-indigo-900/50 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <svg className="h-24 w-24" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                        </div>
                        
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">{preview.name}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mt-1 max-w-2xl">{preview.description}</p>
                            </div>
                            <Badge color="purple" className="h-fit">Conceptual Blueprint</Badge>
                        </div>

                        <div className="space-y-4 relative">
                            {/* Connecting line */}
                            <div className="absolute left-6 top-6 bottom-6 w-0.5 bg-indigo-50 dark:bg-indigo-900/20 z-0"></div>
                            
                            {preview.steps.map((step: any, idx: number) => (
                                <div key={idx} className="relative z-10 flex items-center space-x-6 p-5 rounded-2xl bg-gray-50/50 dark:bg-gray-900/30 hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-all">
                                    <div className="h-12 w-12 rounded-2xl bg-white dark:bg-gray-900 border-2 border-indigo-500 flex items-center justify-center font-bold text-indigo-600 shadow-sm">
                                        {idx + 1}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-indigo-500">{step.type}</span>
                                            <span className="text-xs text-gray-300">•</span>
                                            <span className="text-xs font-bold text-gray-600 dark:text-gray-400">{step.app}</span>
                                        </div>
                                        <p className="text-gray-900 dark:text-white font-bold text-lg mt-0.5">{step.description}</p>
                                    </div>
                                    {idx === 1 && <div className="hidden sm:block"><Badge color="purple" className="opacity-80">AI Enhanced</Badge></div>}
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p className="text-xs text-gray-400 italic">This blueprint is a recommendation. You can implement this logic manually in your workflow engine.</p>
                            <Button variant="secondary" onClick={() => setPreview(null)} className="rounded-xl px-6">
                                Clear Blueprint
                            </Button>
                        </div>
                    </Card>
                </div>
            )}
        </div>
    );
};

export default BuilderPage;
