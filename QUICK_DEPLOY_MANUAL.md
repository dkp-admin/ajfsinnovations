# Quick Manual Deployment Guide - GCP Cloud Run

This is a quick reference guide for manually deploying to GCP Cloud Run without using Cloud Build.

## Prerequisites

```bash
# Install gcloud CLI
# https://cloud.google.com/sdk/docs/install

# Authenticate
gcloud auth login

# Set your project
gcloud config set project YOUR_PROJECT_ID

# Enable APIs
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

## Deploy Backend

### Option 1: Using Source Deploy (Recommended - Fastest)

```bash
cd backend

gcloud run deploy ajfs-backend \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 60 \
  --set-env-vars \
    EMAIL_HOST=smtp.hostinger.com,\
    EMAIL_PORT=465,\
    EMAIL_SECURE=true,\
    EMAIL_USER=ajith4uuu@ajfsindia.com,\
    EMAIL_PASS=YOUR_PASSWORD,\
    CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com,\
    FRONTEND_URL=https://www.ajfsindia.com,\
    NODE_ENV=production

cd ..
```

### Option 2: Using Docker Build & Push

```bash
cd backend

# Configure authentication
gcloud auth configure-docker gcr.io

# Build the image
docker build -t gcr.io/YOUR_PROJECT_ID/ajfs-backend:latest .

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/ajfs-backend:latest

# Deploy from image
gcloud run deploy ajfs-backend \
  --image gcr.io/YOUR_PROJECT_ID/ajfs-backend:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 60 \
  --set-env-vars \
    EMAIL_HOST=smtp.hostinger.com,\
    EMAIL_PORT=465,\
    EMAIL_SECURE=true,\
    EMAIL_USER=ajith4uuu@ajfsindia.com,\
    EMAIL_PASS=YOUR_PASSWORD,\
    CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com,\
    FRONTEND_URL=https://www.ajfsindia.com,\
    NODE_ENV=production

cd ..
```

## Get Backend URL

```bash
BACKEND_URL=$(gcloud run services describe ajfs-backend --region us-central1 --format='value(status.url)')
echo "Backend URL: $BACKEND_URL"
```

## Deploy Frontend

### Option 1: Using Source Deploy (Recommended - Fastest)

```bash
cd frontend

gcloud run deploy ajfs-frontend \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 60 \
  --set-env-vars REACT_APP_BACKEND_URL=$BACKEND_URL

cd ..
```

### Option 2: Using Docker Build & Push

```bash
cd frontend

# Configure authentication
gcloud auth configure-docker gcr.io

# Build the image
docker build -t gcr.io/YOUR_PROJECT_ID/ajfs-frontend:latest .

# Push to Container Registry
docker push gcr.io/YOUR_PROJECT_ID/ajfs-frontend:latest

# Deploy from image
gcloud run deploy ajfs-frontend \
  --image gcr.io/YOUR_PROJECT_ID/ajfs-frontend:latest \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --memory 256Mi \
  --cpu 1 \
  --timeout 60 \
  --set-env-vars REACT_APP_BACKEND_URL=$BACKEND_URL

cd ..
```

## Get Frontend URL

```bash
FRONTEND_URL=$(gcloud run services describe ajfs-frontend --region us-central1 --format='value(status.url)')
echo "Frontend URL: $FRONTEND_URL"
```

## Update Backend with Frontend URL

```bash
gcloud run services update ajfs-backend \
  --region us-central1 \
  --update-env-vars FRONTEND_URL=$FRONTEND_URL
```

## Test Deployment

```bash
# Test backend health
curl $BACKEND_URL/health

# Test backend API
curl -X POST $BACKEND_URL/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "Testing the deployment"
  }'

# Open frontend in browser
echo "Open in browser: $FRONTEND_URL"
```

## View Logs

```bash
# View recent logs
gcloud run logs read ajfs-backend --region us-central1 --limit 50
gcloud run logs logs read ajfs-frontend --region us-central1 --limit 50

# Stream logs in real-time
gcloud run logs read ajfs-backend --region us-central1 --follow
gcloud run logs read ajfs-frontend --region us-central1 --follow
```

## Update Deployment

When you make code changes and want to redeploy:

### Backend:
```bash
cd backend
gcloud run deploy ajfs-backend --source . --region us-central1
cd ..
```

### Frontend:
```bash
cd frontend
gcloud run deploy ajfs-frontend --source . --region us-central1
cd ..
```

## Delete Services (Cleanup)

```bash
# Delete backend
gcloud run services delete ajfs-backend --region us-central1

# Delete frontend
gcloud run services delete ajfs-frontend --region us-central1
```

## Useful Commands

```bash
# List all services
gcloud run services list --region us-central1

# Get service details
gcloud run services describe ajfs-backend --region us-central1

# Update environment variables
gcloud run services update ajfs-backend \
  --region us-central1 \
  --update-env-vars KEY=value,KEY2=value2

# Update memory
gcloud run services update ajfs-backend \
  --region us-central1 \
  --memory 512Mi

# Update CPU
gcloud run services update ajfs-backend \
  --region us-central1 \
  --cpu 2

# Update min/max instances
gcloud run services update ajfs-backend \
  --region us-central1 \
  --min-instances 1 \
  --max-instances 20

# View all revisions
gcloud run revisions list --region us-central1

# Traffic split (blue-green deployment)
gcloud run services update-traffic ajfs-backend \
  --region us-central1 \
  --to-revisions REVISION1=50,REVISION2=50
```

## Troubleshooting

```bash
# Check service status
gcloud run services describe ajfs-backend --region us-central1 --format=json

# Check recent builds
gcloud builds list --limit 10

# Check build logs
gcloud builds log BUILD_ID

# Check quotas
gcloud compute project-info describe --project=YOUR_PROJECT_ID

# Update Cloud Run quota
# Go to: https://console.cloud.google.com/iam-admin/quotas?service=run.googleapis.com
```

## Cost Estimates

With the current configuration:
- **Memory**: 512Mi (backend), 256Mi (frontend)
- **CPU**: 1 (both)
- **Min instances**: 0 (scales to zero when idle)
- **Max instances**: 10

**Estimated monthly cost** (very rough):
- If you have ~100 requests/day: ~$1-5/month
- If you have ~1000 requests/day: ~$10-15/month
- If you have ~10000 requests/day: ~$50-100/month

Use the [Cloud Run Pricing Calculator](https://cloud.google.com/run/pricing) for accurate estimates.

---

For more detailed information, see `GCP_CLOUD_RUN_DEPLOYMENT.md`
