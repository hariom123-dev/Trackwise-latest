// SECURITY: call Gemini from the backend only (/api/gemini/predict)
// so the API key never ships to the browser bundle.

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

export async function generateBusinessPredictions(data: BusinessData): Promise<PredictionResult> {
  const response = await fetch('/api/gemini/predict', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error?.error || 'Failed to generate predictions');
  }

  return response.json();
}
