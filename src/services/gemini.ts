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
  efficiencyScore: number;
}

export async function generateBusinessPredictions(data: BusinessData): Promise<PredictionResult> {
  const prompt = `
    Analyze this specific business profile and generate a data-driven predictive intelligence report.
    
    CRITICAL: Your response must be directly influenced by the specific values provided. 
    - If Churn Rate is high (>5%), focus heavily on retention strategies.
    - If Expenses are close to Revenue, focus on burn rate and runaway.
    - If Revenue is high but churn is also high, identify the "leaky bucket" problem.
    - If Goals are aggressive, assess the feasibility based on current metrics.

    BUSINESS DATA:
    - Industry: ${data.industry}
    - Monthly Revenue: $${data.revenue}
    - Monthly Expenses: $${data.expenses}
    - Total Customers: ${data.customers}
    - Churn Rate: ${data.churnRate}%
    - Revenue per Customer (ARPU): $${(data.revenue / (data.customers || 1)).toFixed(2)}
    - Operating Margin: ${((data.revenue - data.expenses) / (data.revenue || 1) * 100).toFixed(1)}%
    - Business Goals: ${data.goals}
    
    YOUR REPORT MUST INCLUDE:
    1. SUMMARY: A 2-3 sentence expert assessment of their current financial health and market positioning.
    2. FORECAST: A 6-month projected revenue list. Calculate this logically: 
       New Revenue = Old Revenue * (1 + GrowthFactor - (ChurnRate/100)). 
       Assume a reasonable growth factor based on the industry and goals.
    3. RECOMMENDATIONS: 3-4 highly specific, actionable strategic steps.
    4. RISK LEVEL: "Low", "Medium", or "High" based on the margin and churn.
    5. EFFICIENCY SCORE: A number from 0-100 representing operational efficiency.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class Business Intelligence Analyst. Provide precise, data-backed reports in JSON format. Use the provided metrics to calculate trends.",
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
          },
          efficiencyScore: { type: Type.NUMBER }
        },
        required: ["summary", "forecast", "recommendations", "riskLevel", "efficiencyScore"]
      }
    }
  });

  const text = response.text;
  if (!text) throw new Error("No response from AI");
  
  return JSON.parse(text) as PredictionResult;
}
