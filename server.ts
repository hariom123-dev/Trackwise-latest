import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Validate required environment variables
const requiredEnvVars = ["GEMINI_API_KEY", "RAZORPAY_KEY_ID", "RAZORPAY_KEY_SECRET"];
const missingEnvVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

if (missingEnvVars.length > 0) {
  console.error(`❌ Missing required environment variables: ${missingEnvVars.join(", ")}`);
  console.error("Please set all required environment variables before starting the server.");
  process.exit(1);
}

let razorpay: Razorpay | null = null;
let genAI: GoogleGenAI | null = null;

function getRazorpay() {
  if (!razorpay) {
    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    if (!keyId || !keySecret) {
      throw new Error("Razorpay keys are not configured");
    }
    razorpay = new Razorpay({
      key_id: keyId,
      key_secret: keySecret,
    });
  }
  return razorpay;
}

function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("Gemini API key is not configured");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
}

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Gemini AI Predictions endpoint
  app.post("/api/gemini/predict", async (req, res) => {
    try {
      const { revenue, expenses, customers, churnRate, industry, goals } = req.body;

      // Validate input
      if (!revenue || !expenses || !customers || churnRate === undefined || !industry || !goals) {
        return res.status(400).json({ error: "Missing required fields for prediction" });
      }

      const prompt = `
        Analyze the following business data and provide strategic predictions and recommendations.
        
        Business Data:
        - Industry: ${industry}
        - Monthly Revenue: $${revenue}
        - Monthly Expenses: $${expenses}
        - Total Customers: ${customers}
        - Churn Rate: ${churnRate}%
        - Business Goals: ${goals}
        
        Provide a detailed analysis including:
        1. A summary of current performance.
        2. A 6-month revenue forecast.
        3. Strategic recommendations to achieve goals.
        4. An overall risk level assessment.
      `;

      const ai = getGenAI();
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
      if (!text) {
        throw new Error("No response from Gemini API");
      }

      res.json(JSON.parse(text));
    } catch (error: any) {
      console.error("Gemini API Error:", error);
      res.status(500).json({ error: error.message || "Failed to generate prediction" });
    }
  });

  app.post("/api/razorpay/create-order", async (req, res) => {
    const { planId, interval } = req.body;

    // Map plan IDs to prices in INR (Razorpay usually uses INR)
    const prices: Record<string, number> = {
      'professional-monthly': 990000, // ₹9,900
      'professional-halfyearly': 5500000, // ₹55,000
      'professional-yearly': 9900000, // ₹99,000
      'enterprise-monthly': 2490000, // ₹24,900
      'enterprise-halfyearly': 12500000, // ₹125,000
      'enterprise-yearly': 22500000, // ₹225,000
    };

    const amount = prices[`${planId}-${interval}`];
    
    if (!amount) {
      return res.status(400).json({ error: "Invalid plan or interval" });
    }

    try {
      const razorpayClient = getRazorpay();
      const options = {
        amount: amount, // amount in the smallest currency unit
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
      };

      const order = await razorpayClient.orders.create(options);
      res.json({
        id: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.RAZORPAY_KEY_ID
      });
    } catch (error: any) {
      console.error("Razorpay Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  // In production (Render sets NODE_ENV=production), serve from the built dist directory
  const isProduction = process.env.NODE_ENV === "production" || process.env.ENVIRONMENT === "production";
  
  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve from the built dist directory
    const distPath = path.resolve(__dirname, "dist");
    
    // Check if dist folder exists, if not, this is an error
    if (!fs.existsSync(distPath)) {
      console.error("❌ ERROR: 'dist' folder not found. Make sure to run 'npm run build' before starting the server in production.");
      process.exit(1);
    }
    
    app.use(express.static(distPath));
    
    // Serve index.html for all non-API routes (SPA routing)
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
}

startServer().catch((error) => {
  console.error("❌ Failed to start server:", error);
  process.exit(1);
});
