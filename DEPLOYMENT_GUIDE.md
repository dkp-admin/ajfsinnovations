# AJFS Innovations Website - Deployment Guide

## Prerequisites

Before you begin, ensure you have:

1. **Google Cloud Platform Account**
   - Active GCP project
   - Billing enabled
   - Project ID ready

2. **Local Development Tools**
   - [Google Cloud SDK](https://cloud.google.com/sdk/docs/install) installed
   - [Docker Desktop](https://www.docker.com/products/docker-desktop) installed
   - Node.js 18+ and npm installed
   - Git installed

3. **Email Configuration**
   - Hostinger email credentials
   - SMTP settings ready

## Step 1: Initial GCP Setup

### 1.1 Enable Required APIs

```bash
# Set your project ID
export PROJECT_ID="your-gcp-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```

### 1.2 Authenticate Docker with GCR

```bash
gcloud auth configure-docker
```

## Step 2: Backend Deployment

### 2.1 Configure Environment Variables

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your actual values:
   ```env
   EMAIL_HOST=smtp.hostinger.com
   EMAIL_PORT=465
   EMAIL_SECURE=true
   EMAIL_USER=info@ajfsindia.com
   EMAIL_PASS=your_actual_password
   CONTACT_RECEIVER_EMAIL=admin@ajfsindia.com
   FRONTEND_URL=https://www.ajfsindia.com
   ```

### 2.2 Manual Backend Deployment (First Time)

```bash
# Build Docker image
docker build -t gcr.io/$PROJECT_ID/ajfs-backend:latest .

# Push to Container Registry
docker push gcr.io/$PROJECT_ID/ajfs-backend:latest

# Deploy to Cloud Run
gcloud run deploy ajfs-backend \
  --image gcr.io/$PROJECT_ID/ajfs-backend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars EMAIL_HOST="smtp.hostinger.com",EMAIL_PORT="465",EMAIL_SECURE="true",EMAIL_USER="info@ajfsindia.com",EMAIL_PASS="YOUR_PASSWORD",CONTACT_RECEIVER_EMAIL="admin@ajfsindia.com",FRONTEND_URL="https://www.ajfsindia.com" \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --project $PROJECT_ID
```

**IMPORTANT:** Save the backend URL that Cloud Run provides (e.g., `https://ajfs-backend-xxxxx-uc.a.run.app`)

## Step 3: Frontend Deployment

### 3.1 Update Backend URL

1. Navigate to frontend directory:
   ```bash
   cd ../frontend
   ```

2. Create `.env` file:
   ```bash
   cp .env.example .env
   ```

3. Edit `.env` with your backend URL:
   ```env
   REACT_APP_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app
   ```

### 3.2 Manual Frontend Deployment

```bash
# Build Docker image
docker build -t gcr.io/$PROJECT_ID/ajfs-frontend:latest .

# Push to Container Registry
docker push gcr.io/$PROJECT_ID/ajfs-frontend:latest

# Deploy to Cloud Run
gcloud run deploy ajfs-frontend \
  --image gcr.io/$PROJECT_ID/ajfs-frontend:latest \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars REACT_APP_BACKEND_URL="https://ajfs-backend-xxxxx-uc.a.run.app" \
  --memory 256Mi \
  --cpu 1 \
  --project $PROJECT_ID
```

**IMPORTANT:** Save the frontend URL (e.g., `https://ajfs-frontend-xxxxx-uc.a.run.app`)

## Step 4: Set Up CI/CD with Cloud Build

### 4.1 Connect Source Repository

1. Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
2. Click "Connect Repository"
3. Select your source (GitHub, Bitbucket, etc.)
4. Authenticate and select your repository
5. Complete the connection

### 4.2 Create Backend Trigger

1. Click "Create Trigger"
2. Configure:
   - **Name:** `deploy-backend`
   - **Event:** Push to branch
   - **Source:** Select your repository
   - **Branch:** `^main$` (or your main branch name)
   - **Configuration:** Cloud Build configuration file
   - **Location:** `/backend/cloudbuild.yaml`

3. Add Substitution Variables:
   - `_EMAIL_HOST`: `smtp.hostinger.com`
   - `_EMAIL_PORT`: `465`
   - `_EMAIL_SECURE`: `true`
   - `_EMAIL_USER`: `info@ajfsindia.com`
   - `_EMAIL_PASS`: `your_password` (⚠️ Use Secret Manager for production)
   - `_CONTACT_RECEIVER_EMAIL`: `admin@ajfsindia.com`
   - `_FRONTEND_URL`: `https://www.ajfsindia.com`

4. Click "Create"

### 4.3 Create Frontend Trigger

1. Click "Create Trigger"
2. Configure:
   - **Name:** `deploy-frontend`
   - **Event:** Push to branch
   - **Source:** Select your repository
   - **Branch:** `^main$`
   - **Configuration:** Cloud Build configuration file
   - **Location:** `/frontend/cloudbuild.yaml`

3. Add Substitution Variables:
   - `_BACKEND_URL`: `https://ajfs-backend-xxxxx-uc.a.run.app`

4. Click "Create"

## Step 5: Domain Mapping

### 5.1 Map Custom Domain to Cloud Run

```bash
# Map www.ajfsindia.com to frontend
gcloud run domain-mappings create \
  --service ajfs-frontend \
  --domain www.ajfsindia.com \
  --region us-central1 \
  --project $PROJECT_ID

# Optionally map root domain
gcloud run domain-mappings create \
  --service ajfs-frontend \
  --domain ajfsindia.com \
  --region us-central1 \
  --project $PROJECT_ID
```

### 5.2 Get DNS Records

After running the command, Cloud Run will provide DNS records. They will look similar to:

```
Record type    Name    Value
-----------    ----    -----
CNAME          www     ghs.googlehosted.com.
A              @       216.239.32.21
A              @       216.239.34.21
A              @       216.239.36.21
A              @       216.239.38.21
```

## Step 6: Update DNS on Hostinger

1. Log in to your Hostinger account
2. Go to Domains → ajfsindia.com → DNS
3. **Delete** old A records pointing to WordPress
4. Add new records:
   
   **For www subdomain:**
   - Type: `CNAME`
   - Name: `www`
   - Target: `ghs.googlehosted.com.`
   - TTL: `3600`

   **For root domain:**
   - Type: `A`
   - Name: `@` (or leave empty)
   - Value: `216.239.32.21`
   - TTL: `3600`
   
   Repeat for all 4 A record IPs provided by GCP

5. Save changes

### DNS Propagation

DNS changes can take 15 minutes to 48 hours to propagate. Check status:

```bash
# Check www subdomain
dig www.ajfsindia.com

# Check root domain
dig ajfsindia.com
```

## Step 7: Testing

### 7.1 Test Backend

```bash
# Health check
curl https://ajfs-backend-xxxxx-uc.a.run.app/health

# Test contact form
curl -X POST https://ajfs-backend-xxxxx-uc.a.run.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test Message",
    "message": "This is a test message"
  }'
```

### 7.2 Test Frontend

1. Open browser to Cloud Run URL
2. Navigate through all pages
3. Test contact form submission
4. Check email delivery

### 7.3 Test Custom Domain

After DNS propagation:
1. Visit `https://www.ajfsindia.com`
2. Verify SSL certificate is active
3. Test all functionality

## Step 8: Security Best Practices

### 8.1 Use Secret Manager for Sensitive Data

```bash
# Enable Secret Manager API
gcloud services enable secretmanager.googleapis.com

# Create secrets
echo -n "your_email_password" | \
  gcloud secrets create email-password --data-file=-

echo -n "info@ajfsindia.com" | \
  gcloud secrets create email-user --data-file=-

# Grant Cloud Run access to secrets
gcloud secrets add-iam-policy-binding email-password \
  --member="serviceAccount:PROJECT_NUMBER-compute@developer.gserviceaccount.com" \
  --role="roles/secretmanager.secretAccessor"
```

### 8.2 Update Cloud Run to Use Secrets

```bash
gcloud run services update ajfs-backend \
  --update-secrets=EMAIL_PASS=email-password:latest \
  --update-secrets=EMAIL_USER=email-user:latest \
  --region us-central1
```

### 8.3 Enable Cloud Armor (Optional)

For DDoS protection and rate limiting at the load balancer level.

## Step 9: Monitoring and Logging

### 9.1 View Logs

```bash
# Backend logs
gcloud run services logs read ajfs-backend \
  --region us-central1 \
  --limit 50

# Frontend logs
gcloud run services logs read ajfs-frontend \
  --region us-central1 \
  --limit 50
```

### 9.2 Set Up Alerts

1. Go to [Cloud Monitoring](https://console.cloud.google.com/monitoring)
2. Create alert policies for:
   - High error rates
   - High latency
   - Service downtime

## Troubleshooting

### Backend Not Sending Emails

1. Check environment variables:
   ```bash
   gcloud run services describe ajfs-backend \
     --region us-central1 \
     --format='value(spec.template.spec.containers[0].env)'
   ```

2. Verify SMTP credentials with Hostinger
3. Check Cloud Run logs for errors

### Frontend Can't Connect to Backend

1. Verify CORS settings in backend
2. Check if backend URL is correct in frontend
3. Verify backend is deployed and healthy

### DNS Not Resolving

1. Wait for DNS propagation (up to 48 hours)
2. Clear DNS cache:
   ```bash
   # On Mac/Linux
   sudo dscacheutil -flushcache
   
   # On Windows
   ipconfig /flushdns
   ```

3. Use alternative DNS checker: https://dnschecker.org

### SSL Certificate Issues

Cloud Run automatically provisions SSL certificates. If issues occur:
1. Verify DNS records are correct
2. Wait for certificate provisioning (can take 15-60 minutes)
3. Check Cloud Run domain mapping status

## Maintenance

### Update Backend

```bash
cd backend
# Make your changes
git add .
git commit -m "Update backend"
git push origin main
# Cloud Build will automatically deploy
```

### Update Frontend

```bash
cd frontend
# Make your changes
git add .
git commit -m "Update frontend"
git push origin main
# Cloud Build will automatically deploy
```

### Manual Rollback

```bash
# List revisions
gcloud run revisions list \
  --service ajfs-backend \
  --region us-central1

# Rollback to previous revision
gcloud run services update-traffic ajfs-backend \
  --to-revisions REVISION_NAME=100 \
  --region us-central1
```

## Cost Optimization

1. **Set minimum instances to 0** (already configured)
2. **Use appropriate memory/CPU** (already optimized)
3. **Monitor usage** in Cloud Console
4. **Set up budget alerts**

## Support

For issues or questions:
- Email: info@ajfsindia.com
- GCP Support: https://cloud.google.com/support
- Cloud Run Documentation: https://cloud.google.com/run/docs
