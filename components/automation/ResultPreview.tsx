import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { BackendResponse } from '../../types';

interface ResultPreviewProps {
  result: BackendResponse;
}

const ResultPreview: React.FC<ResultPreviewProps> = ({ result }) => {
  if (!result) return null;

  // Use fallback values to prevent runtime crashes if backend fields are missing
  const status = result.status || 'success';
  const intent = result.intent || 'N/A';
  const confidence = typeof result.confidence === 'number' ? result.confidence : 0;
  const summary = result.summary || 'Operation completed successfully with no additional notes.';

  return (
    <Card className="border-2 border-indigo-100 dark:border-indigo-900/50 animate-in zoom-in-95 duration-300 mt-8">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Execution Summary
        </h4>
        <Badge color={status === 'success' ? 'green' : 'red'}>
          {status.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Detected Intent</span>
            <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{intent}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">AI Confidence</span>
            <div className="mt-1 flex items-center">
              <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-full h-2 mr-3">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all duration-1000" 
                  style={{ width: `${confidence}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{confidence}%</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">System Summary</span>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 italic">
            "{summary}"
          </p>
        </div>
      </div>
    </Card>
  );
};

export default ResultPreview;