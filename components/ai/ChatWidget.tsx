
import React, { useState, useRef, useEffect } from 'react';
import Card from '../ui/Card';
import Spinner from '../ui/Spinner';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hi! I am your FlowPilot AI Assistant. How can I help you today?', timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isTyping, isOpen]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = {
            role: 'user',
            content: input,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        const currentInput = input;
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch("/api/webhook-proxy", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    webhookUrl: "https://tejaswisnsct.app.n8n.cloud/webhook/chatbot",
                    payload: {
                        message: currentInput,
                        chatInput: currentInput,
                        sessionId: (() => {
                            let id = sessionStorage.getItem('chatSessionId');
                            if (!id) {
                                id = Math.random().toString(36).substring(2, 15);
                                sessionStorage.setItem('chatSessionId', id);
                            }
                            return id;
                        })()
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Webhook error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();

            // Handle different possible n8n response formats
            let aiReply = "I encountered an issue processing your request.";
            if (data) {
                if (typeof data === "string") {
                    aiReply = data;
                } else if (Array.isArray(data) && data.length > 0) {
                    aiReply = data[0].output || data[0].reply || data[0].text || data[0].message || JSON.stringify(data[0]);
                } else if (typeof data === "object") {
                    aiReply = data.output || data.reply || data.text || data.message || data.response || JSON.stringify(data);
                }
            }

            const assistantMsg: Message = {
                role: 'assistant',
                content: aiReply,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error("Assistant Error:", error);
            let errorMessage = "I'm having trouble connecting to my brain right now. Please try again shortly.";

            if (error instanceof Error && error.message.includes("500")) {
                errorMessage = "I'm sorry, I received a server error (500) from the automation service. This suggests an issue with the backend workflow itself. Please check the n8n logs for that webhook to debug the problem.";
            } else if (error instanceof Error) {
                errorMessage = `A connection error occurred. Please check your network and the webhook configuration. Details: ${error.message}`;
            }

            const assistantMsg: Message = {
                role: 'assistant',
                content: errorMessage,
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            setMessages(prev => [...prev, assistantMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {isOpen && (
                <Card className="w-80 md:w-96 h-[500px] flex flex-col overflow-hidden p-0 rounded-2xl border-none shadow-2xl mb-4 animate-in slide-in-from-bottom-4">
                    <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-indigo-600 flex items-center justify-between text-white">
                        <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 bg-white/20 rounded-lg flex items-center justify-center">
                                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm">FlowPilot AI Assistant</h3>
                                <p className="text-[10px] opacity-80">Online & ready to help</p>
                            </div>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-900">
                        {messages.map((m, i) => (
                            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] rounded-2xl p-3 ${m.role === 'user'
                                        ? 'bg-indigo-600 text-white rounded-tr-none shadow-sm'
                                        : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-none shadow-sm border border-gray-100 dark:border-gray-700'
                                    }`}>
                                    <p className="text-xs leading-relaxed">{m.content}</p>
                                    <p className={`text-[9px] mt-1.5 opacity-60 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>{m.timestamp}</p>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-3 shadow-sm flex space-x-1 items-center">
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                    <div className="w-1 h-1 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="p-3 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                placeholder="Type a message..."
                                className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-2 px-3 text-sm focus:ring-1 focus:ring-indigo-500 dark:text-white"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            />
                            <button
                                onClick={handleSend}
                                disabled={!input.trim() || isTyping}
                                className="h-9 w-9 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                            >
                                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                            </button>
                        </div>
                    </div>
                </Card>
            )}

            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-14 w-14 rounded-full flex items-center justify-center shadow-2xl transition-all transform hover:scale-110 active:scale-95 ${isOpen ? 'bg-gray-200 dark:bg-gray-800 text-gray-600' : 'bg-indigo-600 text-white'
                    }`}
            >
                {isOpen ? (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                ) : (
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
