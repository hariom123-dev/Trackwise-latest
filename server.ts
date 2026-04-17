import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let razorpay: Razorpay | null = null;

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

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
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

    const amount = prices[`${planId}-${interval}`] || 990000;

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
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve from the built dist directory
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
