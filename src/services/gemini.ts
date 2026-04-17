import { GoogleGenAI, Type } from "@google/genai";

export interface BusinessData {
  revenue: number;
  expenses: number;
  customers: number;
  churnRate: number;
  industry: string;
  goals: string;
}

export interface PredictionResult {
  summary: string;
  forecast: {
    month: string;
    revenue: number;
  }[];
  recommendations: string[];
  riskLevel: 'Low' | 'Medium' | 'High';
}

export async function generateBusinessPredictions(data: BusinessData): Promise<PredictionResult> {
  try {
    const response = await fetch('/api/gemini/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Server returned ${response.status}`);
    }

    return await response.json() as PredictionResult;
  } catch (error) {
    console.error('Prediction error:', error);
    throw error;
  }
}
