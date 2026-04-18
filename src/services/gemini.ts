// This file is for TypeScript interfaces only
// All API calls must go through the backend at /api/gemini/predict

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
  efficiencyScore: number;
}

/**
 * Call the backend API to generate business predictions
 * IMPORTANT: The API key is kept securely on the server, not exposed to the client
 */
export async function generateBusinessPredictions(data: BusinessData): Promise<PredictionResult> {
  const response = await fetch('/api/gemini/predict', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Failed to generate predictions');
  }

  return response.json();
}
