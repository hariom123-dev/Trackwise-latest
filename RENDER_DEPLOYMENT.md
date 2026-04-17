# 🚀 TrackWise Deployment Guide for Render

This guide will walk you through deploying TrackWise to Render.com in less than 10 minutes.

## ✅ Pre-Deployment Checklist

- [ ] Node.js >= 18.0.0 installed locally
- [ ] All dependencies installed (`npm install`)
- [ ] GitHub account with repository access
- [ ] Render.com account created (free tier works)
- [ ] Gemini API key obtained
- [ ] Razorpay API keys obtained

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Repository

1. **Commit your changes**
   ```bash
   git add .
   git commit -m "Prepare for Render deployment"
   git push origin main
   ```

2. **Verify build locally** (recommended)
   ```bash
   npm run build
   npm run preview
   ```

### Step 2: Create Render Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** button
3. Select **"Web Service"**
4. Click **"Connect Repository"**
5. Search for and select your TrackWise repository
6. Click **"Connect"**

### Step 3: Configure Service Settings

Fill in the following details:

| Field | Value |
|-------|-------|
| **Name** | `trackwise` (or your preferred name) |
| **Environment** | `Node` |
| **Region** | Choose closest to you (e.g., Singapore, Frankfurt) |
| **Branch** | `main` |
| **Build Command** | `npm install && npm run build` |
| **Start Command** | `npm run start` |

### Step 4: Add Environment Variables

1. Scroll down to **"Environment"** section
2. Click **"Add Environment Variable"** for each:

```
GEMINI_API_KEY = [your-gemini-api-key]
RAZORPAY_KEY_ID = [your-razorpay-key-id]
RAZORPAY_KEY_SECRET = [your-razorpay-key-secret]
NODE_ENV = production
```

**Optional**: Add `APP_URL` after deployment (see step 5)

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will start building (watch the logs)
3. Wait for "Deploy successful" message ✓
4. Your app URL will appear at the top (e.g., `https://trackwise.onrender.com`)

### Step 6: Update APP_URL Variable (Optional)

1. Go back to your service in Render
2. Click **"Environment"** tab
3. Click **"Edit"** next to `APP_URL`
4. Set it to your deployed URL: `https://trackwise.onrender.com`
5. Save and the app will auto-redeploy

## 🔍 Verify Deployment

### Check Health Endpoint
```bash
curl https://your-service-name.onrender.com/api/health
```

Expected response:
```json
{"status":"ok","timestamp":"2024-04-17T..."}
```

### Test Features
1. Navigate to your deployed URL
2. Try the login page
3. Test subscription flow
4. Verify Razorpay payment form loads
5. Try creating a prediction (if available)

## 🆘 Troubleshooting

### Issue: Build Fails
**Check:**
- Build logs in Render dashboard
- All required environment variables are set
- `npm install` and `npm run build` work locally

**Solution:**
```bash
npm install
npm run clean
npm run build
```

### Issue: "Cannot find module 'react'"
**Cause:** Dependencies not installed
**Solution:**
- Clear Render's build cache
- Click "Logs" → scroll to bottom → find "Clear build cache" option
- Redeploy

### Issue: Gemini API Errors
**Check:**
- `GEMINI_API_KEY` is correct and not truncated
- API key is enabled in Google Cloud Console
- You have API quota remaining

**Test locally:**
```bash
echo $GEMINI_API_KEY  # Should show your key
```

### Issue: Razorpay Not Loading
**Check:**
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are correct
- Razorpay account is in live mode (not sandbox)
- Network requests aren't blocked (check browser console)

### Issue: App Crashes After Deploy
**Check logs:**
1. Go to Render Dashboard → Your Service
2. Click "Logs" tab
3. Look for error messages
4. Common causes:
   - Missing environment variables
   - Port conflicts
   - Module not found errors

## 🔐 Security Notes

⚠️ **IMPORTANT:**
- Never commit `.env` or `.env.local` to git
- Keep `RAZORPAY_KEY_SECRET` private (don't expose in client code)
- Use Render's environment variables, not hardcoded values
- Regenerate keys if accidentally committed

## 📊 Monitoring

### View Logs
- Render Dashboard → Your Service → "Logs"
- Filter by time period
- Use search to find specific errors

### Set Up Alerts (Optional)
- Render Dashboard → Your Service → "Settings"
- Look for notification settings
- Configure for deployment failures

## 🔄 Updating Your App

1. Make changes locally
2. Test with `npm run dev`
3. Build and verify: `npm run build && npm run preview`
4. Commit and push:
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```
5. Render automatically redeploys (watch "Deploys" tab)

## 📞 Getting Help

If deployment fails:

1. **Check Render Status**: https://status.render.com/
2. **Review Error Logs**: Look for specific error messages
3. **Verify Locally**: Run `npm run build` to catch issues
4. **Contact Render Support**: https://support.render.com/

## 🎉 Success!

Your TrackWise app is now live! 🚀

- **URL**: https://your-service-name.onrender.com
- **Health Check**: https://your-service-name.onrender.com/api/health
- **Environment**: Production
- **Auto-deploy**: Enabled (deploys on git push)

---

**Need more help?** See [README.md](./README.md) for more information.
