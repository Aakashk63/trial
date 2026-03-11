import { AutomationRequest, BackendResponse, ExecutionLog } from '../types';

const DEFAULT_WEBHOOK_URL = 'https://tejaswisnsct.app.n8n.cloud/webhook/a65baa17-758e-4063-a8de-e58e55c75b9c';

/**
 * Service to handle n8n backend communication
 */
export const AutomationAPI = {
  /**
   * Submits a new automation request to the n8n webhook
   */
  submitAutomationRequest: async (
    url: string, 
    data: AutomationRequest
  ): Promise<BackendResponse> => {
    const targetUrl = url || DEFAULT_WEBHOOK_URL;
    
    try {
      const response = await fetch('/api/webhook-proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          webhookUrl: targetUrl,
          payload: data
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Backend error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Failed to connect to the local proxy server. Make sure the dev server is running.');
      }
      throw error;
    }
  },

  /**
   * Fetches latest execution status (Simulated or via specific n8n polling endpoint)
   */
  fetchExecutionStatus: async (executionId: string): Promise<any> => {
    // This would typically hit a GET endpoint in n8n or a database
    console.log(`Fetching status for ${executionId}`);
    return { status: 'completed' };
  },

  /**
   * Fetches history of executions
   */
  fetchExecutionLogs: async (): Promise<ExecutionLog[]> => {
    // Mocking n8n execution list retrieval
    return [];
  }
};