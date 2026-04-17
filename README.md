<div align="center">
<img width="1200" height="475" alt="TrackWise" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# TrackWise - Business Analytics & AI-Powered Predictions

Smart business analytics platform powered by Google Gemini AI and real-time forecasting.

## 🚀 Quick Start

### Prerequisites
- **Node.js** >= 18.0.0
- **npm** or **yarn**
- API Keys:
  - [Gemini API Key](https://aistudio.google.com/app/apikey)
  - [Razorpay API Keys](https://dashboard.razorpay.com/)

### Local Development

1. **Clone & Install**
   ```bash
   npm install
   ```

2. **Setup Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Fill in your API keys in `.env.local`:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `RAZORPAY_KEY_ID`: Your Razorpay Key ID
   - `RAZORPAY_KEY_SECRET`: Your Razorpay Key Secret

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser

4. **Build for Production**
   ```bash
   npm run build
   ```

## 📦 Deployment on Render

### 1. **Connect Your Repository**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository and branch

### 2. **Configure Build Settings**
   - **Name**: TrackWise (or your preferred name)
   - **Environment**: Node
   - **Region**: Choose closest to your users
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
   - **Node Version**: Leave default (Render will use compatible version)

### 3. **Add Environment Variables**
   In Render Dashboard → Your Service → Environment:
   ```
   GEMINI_API_KEY=<your-gemini-api-key>
   RAZORPAY_KEY_ID=<your-razorpay-key-id>
   RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
   NODE_ENV=production
   APP_URL=https://<your-service-name>.onrender.com
   ```

### 4. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy
   - Your app will be live at: `https://<your-service-name>.onrender.com`

### 5. **Verify Deployment**
   - Check the health endpoint: `https://<your-service-name>.onrender.com/api/health`
   - You should see: `{"status":"ok","timestamp":"2024-..."}`

## 🔑 Getting API Keys

### Google Gemini API
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Get API Key"
3. Choose or create a Google Cloud project
4. Copy the API key

### Razorpay API Keys
1. Log in to [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Go to Settings → API Keys
3. You'll see:
   - Key ID (public)
   - Key Secret (keep this private!)
4. Copy both keys

## 📚 Project Structure

```
├── src/
│   ├── components/       # React components
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Styles
├── server.ts            # Express server
├── vite.config.ts       # Vite config
├── tsconfig.json        # TypeScript config
├── package.json         # Dependencies
├── index.html           # HTML template
└── .env.example         # Environment variables template
```

## ⚙️ Available Scripts

```bash
npm run dev       # Start development server with hot reload
npm run build     # Build for production
npm run preview   # Preview production build locally
npm run clean     # Remove dist directory
npm run lint      # Check TypeScript types
npm run start     # Start production server
```

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI**: Google Gemini API
- **Payments**: Razorpay
- **Build Tool**: Vite
- **UI Components**: Lucide React, Motion

## 🐛 Troubleshooting

### Missing Environment Variables
**Error**: "Missing required environment variables"
**Solution**: Make sure all required variables in `.env.example` are set

### Gemini API Errors
**Error**: "No response from Gemini API"
**Solution**: 
- Verify your API key is correct
- Check that your API key has permissions enabled
- Ensure you have API credits

### Razorpay Errors
**Error**: "Razorpay SDK failed to load"
**Solution**:
- Verify your Key ID and Secret are correct
- Check network connectivity
- Ensure you're not blocking external scripts

### Build Fails on Render
**Error**: "Build failed"
**Solution**:
1. Check build logs in Render dashboard
2. Ensure `package.json` build script is correct
3. Verify Node version compatibility (>=18.0.0)
4. Check for missing environment variables

## 📄 License

This project is provided as-is for educational and commercial use.

## 🤝 Support

For issues and questions:
1. Check the [Troubleshooting](#-troubleshooting) section
2. Review environment variable setup
3. Check API key permissions and quotas

---

**Last Updated**: April 2026  
**Version**: 1.0.0
