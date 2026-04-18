# Deployment Guide for TrackWise on Render

## Issues Fixed
✅ **Blank white screen on production** - Fixed NODE_ENV detection and dist folder verification
✅ **Missing dist folder error** - Added proper error handling and detection
✅ **SPA routing issues** - Configured fallback to index.html for client-side routing

## Prerequisites
- GitHub account with the repository
- Render.com account (https://render.com)
- Environment variables ready:
  - `GEMINI_API_KEY` - Google Gemini API key
  - `RAZORPAY_KEY_ID` - Razorpay merchant key ID
  - `RAZORPAY_KEY_SECRET` - Razorpay secret key

## Deployment Steps

### 1. Connect Repository to Render
1. Log in to [Render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Select "Deploy an existing repository"
4. Find and authorize your GitHub repository
5. Select the branch (typically `main`)

### 2. Configure Build Settings
The repository includes `render.yaml` with the following configuration:
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Node Environment**: Automatically set to `production`

### 3. Set Environment Variables
In the Render dashboard, add these environment variables:

| Key | Value | Example |
|-----|-------|---------|
| `GEMINI_API_KEY` | Your Google Gemini API key | `AIza...` |
| `RAZORPAY_KEY_ID` | Your Razorpay key ID | `rzp_live_...` |
| `RAZORPAY_KEY_SECRET` | Your Razorpay secret | (Keep this secret!) |
| `NODE_ENV` | production | `production` |

**⚠️ Important**: Never commit sensitive keys to GitHub. Always use Render's environment variable management.

### 4. Deploy
1. Click "Create Web Service"
2. Render will automatically:
   - Install dependencies via `npm install`
   - Build the app via `npm run build`
   - Start the server via `npm start`
3. Monitor the deployment logs

## Troubleshooting

### Blank White Screen
**Cause**: The app is built but not being served correctly
**Solution**: 
- Check that `NODE_ENV=production` is set in Render environment variables
- Verify that `npm run build` completes successfully in build logs
- Check that all required API keys are set

### Build Fails
**Cause**: Missing dependencies or environment variables during build
**Solution**:
- Ensure TypeScript compilation succeeds: `npm run lint`
- Check that date-fns is installed: `npm install date-fns`
- Verify all imports are correct

### API Endpoints Returning 500
**Cause**: Missing or invalid environment variables
**Solution**:
- Double-check environment variable names in Render dashboard
- Verify API keys are valid and have proper permissions
- Check server logs for specific error messages

### CORS Errors
**Cause**: Frontend calling APIs from different domain
**Solution**: All APIs are on the same domain, so CORS should not be an issue

## Monitoring

After deployment:
1. Visit your Render URL
2. Check browser console (F12) for JavaScript errors
3. Use Render's logs tab to view server output
4. Monitor the health check endpoint: `https://your-app.onrender.com/api/health`

## Security Checklist
- [ ] Never commit `.env` file or API keys
- [ ] Use Render's environment variable system
- [ ] Verify HTTPS is enabled (Render provides this automatically)
- [ ] Keep dependencies updated
- [ ] Review API key permissions regularly

## Local Testing
Before deploying, test production build locally:
```bash
npm run build
NODE_ENV=production npm start
```

Then visit http://localhost:3000

---

For more help, check [Render Documentation](https://render.com/docs)
