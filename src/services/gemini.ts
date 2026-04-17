import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

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
  const prompt = `
    Analyze the following business data and provide strategic predictions and recommendations.
    
    Business Data:
    - Industry: ${data.industry}
    - Monthly Revenue: $${data.revenue}
    - Monthly Expenses: $${data.expenses}
    - Total Customers: ${data.customers}
    - Churn Rate: ${data.churnRate}%
    - Business Goals: ${data.goals}
    
    Provide a detailed analysis including:
    1. A summary of current performance.
    2. A 6-month revenue forecast.
    3. Strategic recommendations to achieve goals.
    4. An overall risk level assessment.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          summary: { type: Type.STRING },
          forecast: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                month: { type: Type.STRING },
                revenue: { type: Type.NUMBER }
              },
              required: ["month", "revenue"]
            }
          },
          recommendations: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          riskLevel: {
            type: Type.STRING,
            enum: ["Low", "Medium", "High"]
          }
        },
        required: ["summary", "forecast", "recommendations", "riskLevel"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as PredictionResult;
}
