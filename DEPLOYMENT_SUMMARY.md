# AJFS Innovations Website - GCP Cloud Run Deployment Summary

## Overview

Your website is now ready to be deployed to Google Cloud Run. This document provides a complete summary of all the deployment resources and steps.

## What's Included

### 📋 Documentation Files

1. **GCP_CLOUD_RUN_DEPLOYMENT.md** (MAIN GUIDE)
   - Comprehensive step-by-step deployment guide
   - Covers prerequisites, setup, deployment, monitoring
   - Includes troubleshooting and security best practices
   - **Read this first for detailed instructions**

2. **QUICK_DEPLOY_MANUAL.md**
   - Quick reference for fast deployments
   - Copy-paste commands for common tasks
   - Useful for repeated deployments
   - Best for experienced users

3. **DEPLOYMENT_CHECKLIST.md**
   - Pre-deployment verification checklist
   - Ensures nothing is missed
   - Post-deployment verification steps
   - Cost management considerations

### 🚀 Automation & Configuration

4. **deploy-to-cloud-run.sh**
   - Automated deployment script (BASH)
   - Interactive prompts for configuration
   - Deploys backend and frontend
   - Usage: `bash deploy-to-cloud-run.sh`

5. **Updated Dockerfiles**
   - `backend/Dockerfile`: Optimized for Cloud Run
   - `frontend/Dockerfile`: Multi-stage build optimized
   - Both follow Google Cloud best practices

6. **Updated Cloud Build Configurations**
   - `backend/cloudbuild.yaml`: Automated backend build & deploy
   - `frontend/cloudbuild.yaml`: Automated frontend build & deploy
   - Proper dependency management with waitFor
   - Environment variable substitutions

7. **Nginx Configuration**
   - `frontend/nginx.conf`: Pre-configured for Cloud Run
   - Port 8080, gzip compression, security headers
   - React Router fallback configured

## Quick Start (3 Steps)

### Step 1: Prerequisites
```bash
# Install gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set your GCP project
gcloud config set project YOUR_PROJECT_ID

# Enable required APIs
gcloud services enable run.googleapis.com cloudbuild.googleapis.com
```

### Step 2: Deploy Backend
```bash
cd backend

gcloud run deploy ajfs-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars \
    EMAIL_HOST=smtp.hostinger.com,\
    EMAIL_PORT=465,\
    EMAIL_SECURE=true,\
    EMAIL_USER=ajith4uuu@ajfsindia.com,\
    EMAIL_PASS=YOUR_EMAIL_PASSWORD,\
    CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com,\
    FRONTEND_URL=https://www.ajfsindia.com,\
    NODE_ENV=production

# Save the backend URL
BACKEND_URL=$(gcloud run services describe ajfs-backend --region us-central1 --format='value(status.url)')
echo "Backend URL: $BACKEND_URL"

cd ..
```

### Step 3: Deploy Frontend
```bash
cd frontend

gcloud run deploy ajfs-frontend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars REACT_APP_BACKEND_URL=$BACKEND_URL

# Get frontend URL
FRONTEND_URL=$(gcloud run services describe ajfs-frontend --region us-central1 --format='value(status.url)')
echo "Frontend URL: $FRONTEND_URL"

# Update backend with frontend URL
cd ..
gcloud run services update ajfs-backend --region us-central1 --update-env-vars FRONTEND_URL=$FRONTEND_URL
```

## Deployment Methods

### Method 1: Using Automated Script (Easiest)
```bash
bash deploy-to-cloud-run.sh
```
The script will guide you through the entire deployment process interactively.

### Method 2: Using gcloud CLI (Recommended for CI/CD)
```bash
# See QUICK_DEPLOY_MANUAL.md for copy-paste commands
```

### Method 3: Using Cloud Build Triggers (Automatic)
1. Connect your GitHub/GitLab repository to Google Cloud Build
2. Create triggers for `backend/cloudbuild.yaml` and `frontend/cloudbuild.yaml`
3. Every push to main automatically deploys

### Method 4: Using Google Cloud Console (UI)
1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Click "Create Service"
3. Use pre-existing Dockerfiles or source deploy
4. Configure environment variables
5. Deploy

## Environment Variables

### Backend (ajfs-backend)
```
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=ajith4uuu@ajfsindia.com
EMAIL_PASS=YOUR_EMAIL_PASSWORD
CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com
FRONTEND_URL=https://your-frontend-url.run.app
NODE_ENV=production
PORT=8080 (auto-set by Cloud Run)
```

### Frontend (ajfs-frontend)
```
REACT_APP_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app
```

## Architecture

```
┌─────────────────────────────────────────┐
│         User's Browser                   │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Cloud Run: ajfs-frontend              │
│   (Nginx serving React SPA)              │
│   Port: 8080                             │
│   Memory: 256Mi                          │
│   CPU: 1                                 │
└─────────────────────────────────────────┘
              ↓
┌─────────────────────────────────────────┐
│    Cloud Run: ajfs-backend               │
│   (Node.js Express API)                  │
│   Port: 8080                             │
│   Memory: 512Mi                          │
│   CPU: 1                                 │
│   ↓                                      │
│   SMTP Email Sending                     │
└─────────────────────────────────────────┘
```

## Cost Estimation

With current configuration:
- **Min instances**: 0 (scales to zero when idle - free when not used)
- **Max instances**: 10
- **Memory**: Backend 512Mi, Frontend 256Mi
- **CPU**: 1 vCPU per service

**Estimated monthly costs**:
- Low traffic (~100 requests/day): $1-5/month
- Medium traffic (~1000 requests/day): $10-20/month
- High traffic (~10000 requests/day): $50-100/month

Use the [Cloud Run Pricing Calculator](https://cloud.google.com/run/pricing) for accurate estimates.

## Testing Deployment

### Backend Health Check
```bash
BACKEND_URL=$(gcloud run services describe ajfs-backend --region us-central1 --format='value(status.url)')
curl $BACKEND_URL/health
# Expected: OK or "healthy"
```

### Frontend Access
```bash
FRONTEND_URL=$(gcloud run services describe ajfs-frontend --region us-central1 --format='value(status.url)')
# Open in browser: $FRONTEND_URL
```

### Form Submission Test
```bash
curl -X POST $BACKEND_URL/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "company": "Test Co",
    "phone": "+1 (555) 000-0000",
    "cloudPlatform": "gcp",
    "primaryChallenge": "cloud-migration",
    "message": "This is a test",
    "type": "strategy-call"
  }'
```

## Monitoring & Logs

```bash
# View logs
gcloud run logs read ajfs-backend --region us-central1 --limit 50
gcloud run logs read ajfs-frontend --region us-central1 --limit 50

# Stream logs (real-time)
gcloud run logs read ajfs-backend --region us-central1 --follow

# View service metrics
gcloud run services describe ajfs-backend --region us-central1

# Use Cloud Monitoring
# https://console.cloud.google.com/monitoring
```

## Custom Domain Setup (Optional)

To use your custom domain (ajfsindia.com):

1. **Go to Cloud Run Console**
   ```
   https://console.cloud.google.com/run
   ```

2. **Select Frontend Service**
   - Click "ajfs-frontend"

3. **Click "Manage Custom Domains"**
   - Add domain: ajfsindia.com
   - Add subdomain: www.ajfsindia.com

4. **Configure DNS Records**
   - Cloud Run will show DNS records to add
   - Update your domain registrar
   - Wait for DNS propagation (~1-24 hours)

5. **For Backend API**
   - Option A: Use subdomain like api.ajfsindia.com
   - Option B: Use Cloud Load Balancer

## Security Best Practices

✓ Already implemented:
- HTTPS/SSL (automatic with Cloud Run)
- Non-root user in Docker containers
- Health checks configured
- Rate limiting on API (5 requests per 15 minutes)
- Input validation and sanitization
- CORS protection
- Security headers (X-Frame-Options, X-Content-Type-Options, X-XSS-Protection)

⚠️ Additional recommendations:
- Use Cloud Secret Manager for sensitive credentials
- Set up Cloud Armor for DDoS protection
- Enable VPC if needed
- Regular security audits
- Monitor logs for suspicious activity
- Keep dependencies updated

## Troubleshooting

### Issue: "502 Bad Gateway"
**Solution**: Check logs
```bash
gcloud run logs read ajfs-backend --region us-central1
```

### Issue: "Cannot connect to backend"
**Solution**: Verify environment variables
```bash
gcloud run services describe ajfs-backend --region us-central1 --format=json | grep FRONTEND_URL
```

### Issue: "404 on page refresh"
**Solution**: Nginx configuration (should already be fixed)
Check: `frontend/nginx.conf` has `try_files $uri $uri/ /index.html;`

### Issue: "Email not sending"
**Solution**: Verify email configuration
```bash
gcloud run logs read ajfs-backend --region us-central1 --limit 50
# Look for email errors
```

For more troubleshooting, see **GCP_CLOUD_RUN_DEPLOYMENT.md**

## Updating Deployment

When you make code changes:

```bash
# Backend
cd backend
gcloud run deploy ajfs-backend --source . --region us-central1
cd ..

# Frontend
cd frontend
gcloud run deploy ajfs-frontend --source . --region us-central1
cd ..
```

## Setting Up CI/CD

### GitHub Actions (Coming Soon)
You can set up automatic deployments with GitHub Actions. This will deploy automatically when you push to main branch.

### Cloud Build Triggers (Now)
Set up Cloud Build triggers for automatic deployment:
```bash
gcloud builds triggers create github \
  --name=ajfs-deploy \
  --repo-name=your-repo \
  --repo-owner=your-username \
  --branch-pattern=^main$ \
  --build-config=backend/cloudbuild.yaml
```

## Useful Resources

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Deploying Node.js to Cloud Run](https://cloud.google.com/run/docs/quickstarts/build-and-deploy/nodejs)
- [Deploying with Cloud Build](https://cloud.google.com/build/docs/deploying-builds/deploy-cloud-run)
- [Cloud Run Pricing](https://cloud.google.com/run/pricing)
- [Troubleshooting Guide](https://cloud.google.com/run/docs/troubleshooting)

## Next Steps

1. ✅ **Review** GCP_CLOUD_RUN_DEPLOYMENT.md
2. ✅ **Check** DEPLOYMENT_CHECKLIST.md
3. ✅ **Run** deploy-to-cloud-run.sh OR follow QUICK_DEPLOY_MANUAL.md
4. ✅ **Test** your deployment
5. ✅ **Set up** custom domain (optional)
6. ✅ **Configure** monitoring and alerts
7. ✅ **Plan** backup and disaster recovery

## Support

If you encounter issues:

1. Check the [Cloud Run Troubleshooting Guide](https://cloud.google.com/run/docs/troubleshooting)
2. Review logs: `gcloud run logs read SERVICE_NAME --region REGION`
3. Check Cloud Build logs for deployment errors
4. Visit [Google Cloud Support](https://cloud.google.com/support)

---

**Website**: https://www.ajfsindia.com  
**Backend Service**: ajfs-backend (Cloud Run)  
**Frontend Service**: ajfs-frontend (Cloud Run)  
**Region**: us-central1

**Last Updated**: December 2025

---

## File Structure

```
.
├── backend/
│   ├── Dockerfile                    (Updated for Cloud Run)
│   ├── cloudbuild.yaml               (Updated with optimizations)
│   ├── package.json
│   ├── server.js
│   └── ...
├── frontend/
│   ├── Dockerfile                    (Updated - multi-stage)
│   ├── cloudbuild.yaml               (Updated with optimizations)
│   ├── nginx.conf                    (Cloud Run ready)
│   ├── package.json
│   ├── public/
│   ├── src/
│   └── ...
├── GCP_CLOUD_RUN_DEPLOYMENT.md       (Main guide)
├── QUICK_DEPLOY_MANUAL.md            (Quick reference)
├── DEPLOYMENT_CHECKLIST.md           (Pre-deployment checks)
├── deploy-to-cloud-run.sh            (Automated script)
└── DEPLOYMENT_SUMMARY.md             (This file)
```

---

**You're all set! Ready to deploy to Google Cloud Run.** 🚀
