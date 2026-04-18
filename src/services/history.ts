import { PredictionResult } from './gemini';

export interface AnalysisHistory {
  id: string;
  timestamp: string;
  industry: string;
  summary: string;
  riskLevel: string;
  data: any; // The input data used
  prediction: PredictionResult;
}

const STORAGE_KEY = 'trackwise_analysis_history';

export const saveAnalysisToHistory = (data: any, prediction: PredictionResult) => {
  const history = getAnalysisHistory();
  const newEntry: AnalysisHistory = {
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    industry: data.industry,
    summary: prediction.summary,
    riskLevel: prediction.riskLevel,
    data: data,
    prediction: prediction,
  };
  
  const updatedHistory = [newEntry, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedHistory));
  return newEntry;
};

export const getAnalysisHistory = (): AnalysisHistory[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Failed to parse history', e);
    return [];
  }
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
