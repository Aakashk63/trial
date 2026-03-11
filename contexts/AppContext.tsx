import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import {
  type Workflow,
  type ExecutionLog,
  type Metrics,
  type Notification,
  type AppMessage,
  type AutomationRequest,
  type BackendResponse
} from '../types';
import { AutomationAPI } from '../services/api';

interface AppContextType {
  webhookUrl: string;
  setWebhookUrl: (url: string) => void;
  workflows: Workflow[];
  setWorkflows: React.Dispatch<React.SetStateAction<Workflow[]>>;
  logs: ExecutionLog[];
  notifications: Notification[];
  metrics: Metrics;
  messages: AppMessage[];
  isSubmitting: boolean;
  lastResponse: BackendResponse | null;
  submitAutomation: (data: Omit<AutomationRequest, 'submittedAt'>) => Promise<void>;
  addWorkflow: (workflow: Workflow) => void;
  toggleWorkflow: (id: string) => void;
  deleteWorkflow: (id: string) => void;
  markNotificationRead: (id: string) => void;
  clearSessionData: () => void;
}

const INITIAL_METRICS: Metrics = {
  activeWorkflows: 0,
  totalExecutions: 2450,
  successRate: 98.4,
  timeSavedHours: 124,
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Using useState instead of useLocalStorage ensures we explicitly use the requested webhook URL without being overridden by a stale cached value.
  const [webhookUrl, setWebhookUrl] = useState<string>('https://tejaswisnsct.app.n8n.cloud/webhook/a65baa17-758e-4063-a8de-e58e55c75b9c');
  const [workflows, setWorkflows] = useLocalStorage<Workflow[]>('workflows', []);
  const [logs, setLogs] = useState<ExecutionLog[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [messages, setMessages] = useLocalStorage<AppMessage[]>('submissionHistory', []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastResponse, setLastResponse] = useState<BackendResponse | null>(null);

  const metrics: Metrics = {
    ...INITIAL_METRICS,
    activeWorkflows: workflows.filter(w => w.status === 'Active').length,
    totalExecutions: INITIAL_METRICS.totalExecutions + messages.length
  };

  const submitAutomation = async (formData: Omit<AutomationRequest, 'submittedAt'>) => {
    setIsSubmitting(true);
    setLastResponse(null);

    const payload: AutomationRequest = {
      ...formData,
      submittedAt: new Date().toISOString()
    };

    try {
      const result = await AutomationAPI.submitAutomationRequest(webhookUrl, payload);
      setLastResponse(result);

      // Update history
      const newMessage: AppMessage = {
        id: result.id || Math.random().toString(36).substr(2, 9),
        timestamp: payload.submittedAt,
        sender_email: payload.Email,
        intent: result.intent || 'Unknown',
        confidence: result.confidence || 0,
        priority: (result.confidence || 0) > 80 ? 'High' : 'Medium',
        workflow_action: result.summary || 'Processed',
        subject: `Automation: ${payload.formMode}`
      };

      setMessages(prev => [newMessage, ...prev]);

      setNotifications(prev => [{
        id: Math.random().toString(),
        title: 'Automation Executed',
        message: `Successfully processed ${payload.formMode} for ${payload.Name}`,
        type: 'success',
        timestamp: 'Just now',
        read: false
      }, ...prev]);

    } catch (error) {
      console.error('Automation Submission Error:', error);
      setNotifications(prev => [{
        id: Math.random().toString(),
        title: 'Execution Failed',
        message: error instanceof Error ? error.message : 'Unknown backend error',
        type: 'error',
        timestamp: 'Just now',
        read: false
      }, ...prev]);
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const addWorkflow = (workflow: Workflow) => {
    setWorkflows(prev => [workflow, ...prev]);
  };

  const toggleWorkflow = (id: string) => {
    setWorkflows(prev => prev.map(w => w.id === id ? { ...w, status: w.status === 'Active' ? 'Inactive' : 'Active' } : w));
  };

  const deleteWorkflow = (id: string) => {
    setWorkflows(prev => prev.filter(w => w.id !== id));
  };

  const markNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const clearSessionData = () => {
    setWorkflows([]);
    setLogs([]);
    setNotifications([]);
    setMessages([]);
  };

  return (
    <AppContext.Provider value={{
      webhookUrl, setWebhookUrl, workflows, setWorkflows, logs, notifications, metrics,
      messages, isSubmitting, lastResponse, submitAutomation,
      addWorkflow, toggleWorkflow, deleteWorkflow, markNotificationRead, clearSessionData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};