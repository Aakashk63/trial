
export enum NavTab {
  Dashboard = 'Dashboard',
  Builder = 'AI Architect',
  Admin = 'Admin Panel',
  Settings = 'Settings'
}

export type Theme = 'light' | 'dark';

export interface WorkflowAction {
  id: string;
  type: 'trigger' | 'action';
  app: string;
  description: string;
}

export interface Workflow {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Inactive';
  createdAt: string;
  lastExecuted?: string;
  steps: WorkflowAction[];
}

export interface ExecutionLog {
  id: string;
  workflowId: string;
  workflowName: string;
  timestamp: string;
  status: 'Success' | 'Failed';
  duration: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
}

export interface Metrics {
  activeWorkflows: number;
  totalExecutions: number;
  successRate: number;
  timeSavedHours: number;
}

export interface AppMessage {
  id: string;
  timestamp: string;
  sender_email: string;
  subject?: string;
  intent: string;
  confidence: number;
  priority: 'High' | 'Medium' | 'Low';
  workflow_action: string;
}

/**
 * n8n Backend Interfaces
 */
export interface AutomationRequest {
  Name: string;
  Email: string;
  Company: string;
  Message: string;
  submittedAt: string;
  formMode: string;
}

export interface BackendResponse {
  status: 'success' | 'error';
  intent: string;
  summary: string;
  confidence: number;
  id?: string;
}
