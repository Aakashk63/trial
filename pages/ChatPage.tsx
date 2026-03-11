
import React, { useState, useRef, useEffect } from 'react';
import Card from '../components/ui/Card';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
}

const ChatPage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        {
            role: 'assistant',
            content: 'Hi! I am your FlowPilot AI Assistant. How can I help you optimize your automations today?',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

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

            const errorMsg: Message = {
                role: 'assistant',
                content: "I'm having trouble connecting to my brain right now. Please try again shortly.",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };

            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-12rem)] flex flex-col">
            <Card className="flex-1 flex flex-col overflow-hidden p-0 rounded-2xl border-none shadow-xl">

                <div className="p-4 border-b border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 flex items-center space-x-3">
                    <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-bold text-gray-900 dark:text-white">FlowPilot AI Assistant</h3>
                        <p className="text-xs text-green-500 font-bold flex items-center">
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-1.5"></span> Always Online
                        </p>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((m, i) => (
                        <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-2xl p-4 ${m.role === 'user'
                                    ? 'bg-indigo-600 text-white rounded-tr-none'
                                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-tl-none'
                                }`}>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.content}</p>
                                <p className={`text-[10px] mt-2 opacity-60 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                                    {m.timestamp}
                                </p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 flex space-x-1 items-center">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        </div>
                    )}

                    <div ref={messagesEndRef} />
                </div>

                <div className="p-4 border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="flex items-center space-x-3">
                        <input
                            type="text"
                            placeholder="Ask anything about your automations..."
                            className="flex-1 bg-gray-50 dark:bg-gray-800 border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-indigo-500 dark:text-white"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="h-12 w-12 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center justify-center transition-all disabled:opacity-50"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                        </button>
                    </div>
                </div>

            </Card>
        </div>
    );
};

export default ChatPage;