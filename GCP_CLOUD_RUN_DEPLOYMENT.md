# GCP Cloud Run Deployment Guide

This guide provides step-by-step instructions to deploy the AJFS Innovations website (frontend + backend) to Google Cloud Run.

## Prerequisites

Before you begin, ensure you have:

1. **GCP Account**: A Google Cloud Platform account with billing enabled
2. **GCP Project**: A project created in GCP (e.g., `ajfs-innovations`)
3. **gcloud CLI**: Install and configure the Google Cloud SDK
   - Download: https://cloud.google.com/sdk/docs/install
   - Initialize: Run `gcloud init` and authenticate

4. **Docker**: Docker installed locally (for local testing)
5. **Git**: Git installed and repository set up
6. **Permissions**: Access to enable APIs and manage Cloud Run services

## Step 1: Set Up GCP Project

### 1.1 Enable Required APIs

```bash
# Set your project ID
export PROJECT_ID="your-gcp-project-id"
gcloud config set project $PROJECT_ID

# Enable required APIs
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
gcloud services enable artifact-registry.googleapis.com
gcloud services enable secretmanager.googleapis.com
```

### 1.2 Configure Docker Authentication

```bash
# Configure Docker to use gcloud for authentication
gcloud auth configure-docker gcr.io
gcloud auth configure-docker us-central1-docker.pkg.dev
```

## Step 2: Set Up Cloud Secrets (Recommended for Production)

For production, use Google Cloud Secret Manager instead of environment variables for sensitive data.

```bash
# Create secrets for sensitive data
echo -n "smtp.hostinger.com" | gcloud secrets create email-host --data-file=-
echo -n "465" | gcloud secrets create email-port --data-file=-
echo -n "true" | gcloud secrets create email-secure --data-file=-
echo -n "ajith4uuu@ajfsindia.com" | gcloud secrets create email-user --data-file=-
echo -n "YOUR_EMAIL_PASSWORD" | gcloud secrets create email-pass --data-file=-
echo -n "dkp@ajfsindia.com" | gcloud secrets create contact-receiver-email --data-file=-
echo -n "https://www.ajfsindia.com" | gcloud secrets create frontend-url --data-file=-
```

## Step 3: Deploy Backend to Cloud Run

### 3.1 Update Backend cloudbuild.yaml

Update `backend/cloudbuild.yaml` with your environment variables:

```yaml
# Replace the substitutions section with your actual values
substitutions:
  _EMAIL_HOST: 'smtp.hostinger.com'
  _EMAIL_PORT: '465'
  _EMAIL_SECURE: 'true'
  _EMAIL_USER: 'ajith4uuu@ajfsindia.com'
  _EMAIL_PASS: 'YOUR_EMAIL_PASSWORD'  # Use Secret Manager reference instead
  _CONTACT_RECEIVER_EMAIL: 'dkp@ajfsindia.com'
  _FRONTEND_URL: 'https://your-frontend-url.run.app'  # Update after frontend deployment
```

### 3.2 Deploy Backend Using Cloud Build

```bash
# Option A: Deploy using gcloud CLI directly
cd backend

gcloud run deploy ajfs-backend \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars EMAIL_HOST=smtp.hostinger.com \
  --set-env-vars EMAIL_PORT=465 \
  --set-env-vars EMAIL_SECURE=true \
  --set-env-vars EMAIL_USER=ajith4uuu@ajfsindia.com \
  --set-env-vars EMAIL_PASS=YOUR_EMAIL_PASSWORD \
  --set-env-vars CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com \
  --set-env-vars FRONTEND_URL=https://your-frontend-url.run.app \
  --set-env-vars NODE_ENV=production \
  --memory 512Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 60

cd ..
```

### 3.3 Alternative: Deploy Using Cloud Build Trigger (Automatic)

1. Go to [Cloud Build Console](https://console.cloud.google.com/cloud-build)
2. Click **Create Trigger**
3. Configure:
   - **Name**: `ajfs-backend-deploy`
   - **Repository**: Connect your GitHub/GitLab repository
   - **Branch**: `main` (or your branch)
   - **Build Configuration**: `Cloud Build configuration file (yaml or json)`
   - **Cloud Build configuration file location**: `backend/cloudbuild.yaml`

4. Click **Create** and enable push triggers

## Step 4: Deploy Frontend to Cloud Run

### 4.1 Update Frontend cloudbuild.yaml

After backend deployment, update the backend URL in `frontend/cloudbuild.yaml`:

```yaml
substitutions:
  _BACKEND_URL: 'https://ajfs-backend-xxxxx-uc.a.run.app'  # Use actual backend URL from Step 3
```

### 4.2 Deploy Frontend Using Cloud Build

```bash
# Option A: Deploy using gcloud CLI directly
cd frontend

gcloud run deploy ajfs-frontend \
  --source . \
  --region us-central1 \
  --platform managed \
  --allow-unauthenticated \
  --set-env-vars REACT_APP_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app \
  --memory 256Mi \
  --cpu 1 \
  --min-instances 0 \
  --max-instances 10 \
  --timeout 60

cd ..
```

### 4.3 Alternative: Deploy Using Cloud Build Trigger (Automatic)

1. Go to [Cloud Build Console](https://console.cloud.google.com/cloud-build)
2. Click **Create Trigger**
3. Configure:
   - **Name**: `ajfs-frontend-deploy`
   - **Repository**: Connect your GitHub/GitLab repository
   - **Branch**: `main` (or your branch)
   - **Build Configuration**: `Cloud Build configuration file (yaml or json)`
   - **Cloud Build configuration file location**: `frontend/cloudbuild.yaml`

4. Click **Create** and enable push triggers

## Step 5: Update DNS and CORS

### 5.1 Get Your Cloud Run URLs

```bash
# Get backend URL
gcloud run services describe ajfs-backend --region us-central1 --format='value(status.url)'

# Get frontend URL
gcloud run services describe ajfs-frontend --region us-central1 --format='value(status.url)'
```

### 5.2 Update Backend CORS Configuration

Once you have the frontend URL, update the backend environment variable:

```bash
# Update frontend URL in backend
gcloud run services update ajfs-backend \
  --region us-central1 \
  --update-env-vars FRONTEND_URL=https://your-frontend-url.run.app
```

### 5.3 Update Frontend Configuration

Update the frontend environment variable if changed:

```bash
gcloud run services update ajfs-frontend \
  --region us-central1 \
  --update-env-vars REACT_APP_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app
```

### 5.4 Configure Custom Domain (Optional)

To use your custom domain (ajfsindia.com):

1. Go to [Cloud Run Console](https://console.cloud.google.com/run)
2. Select your service (frontend)
3. Click **Manage Custom Domains**
4. Follow the steps to connect your domain
5. Update DNS records as instructed

For backend API, you can:
- Use a subdomain like `api.ajfsindia.com`
- Or use Cloud Load Balancer to route traffic

## Step 6: Monitor Deployments

```bash
# View deployment logs
gcloud run services describe ajfs-backend --region us-central1
gcloud run services describe ajfs-frontend --region us-central1

# View Cloud Build logs
gcloud builds list --limit 10

# Stream logs in real-time
gcloud run logs read ajfs-backend --region us-central1 --limit 50 --follow
gcloud run logs read ajfs-frontend --region us-central1 --limit 50 --follow
```

## Step 7: Testing Your Deployment

### Test Backend API

```bash
# Get backend URL
BACKEND_URL=$(gcloud run services describe ajfs-backend --region us-central1 --format='value(status.url)')

# Test health endpoint
curl $BACKEND_URL/health

# Test contact form endpoint
curl -X POST $BACKEND_URL/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "subject": "Test",
    "message": "This is a test"
  }'
```

### Test Frontend

```bash
# Get frontend URL
FRONTEND_URL=$(gcloud run services describe ajfs-frontend --region us-central1 --format='value(status.url)')

# Open in browser
echo "Frontend URL: $FRONTEND_URL"
```

## Step 8: Configure Automatic Deployments

Set up automatic deployments when you push to your repository:

### 8.1 Create Cloud Build Triggers for Both Services

**For Backend:**
```bash
gcloud builds triggers create github \
  --name=ajfs-backend-deploy \
  --repo-name=your-repo-name \
  --repo-owner=your-github-username \
  --branch-pattern=^main$ \
  --build-config=backend/cloudbuild.yaml \
  --substitutions="_EMAIL_HOST=smtp.hostinger.com,_EMAIL_PORT=465,_EMAIL_SECURE=true,_EMAIL_USER=ajith4uuu@ajfsindia.com,_CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com"
```

**For Frontend:**
```bash
gcloud builds triggers create github \
  --name=ajfs-frontend-deploy \
  --repo-name=your-repo-name \
  --repo-owner=your-github-username \
  --branch-pattern=^main$ \
  --build-config=frontend/cloudbuild.yaml \
  --substitutions="_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app"
```

## Step 9: Production Best Practices

### 9.1 Use Cloud Armor (DDoS Protection)

```bash
gcloud compute security-policies create ajfs-policy \
  --description "AJFS Security Policy"

gcloud compute backend-services create ajfs-backend-service \
  --security-policy ajfs-policy
```

### 9.2 Set Up Load Balancer

Create a Cloud Load Balancer to distribute traffic between frontend and backend, and to enable HTTPS with custom domains.

### 9.3 Enable Cloud CDN

```bash
gcloud compute backend-services create ajfs-frontend-backend \
  --global \
  --load-balancing-scheme=EXTERNAL \
  --protocol=HTTPS \
  --enable-cdn
```

### 9.4 Monitor Performance

- Use [Cloud Monitoring](https://console.cloud.google.com/monitoring)
- Set up alerting policies
- Monitor Cloud Run metrics (CPU, memory, request rates)

## Step 10: Cost Optimization

### 10.1 Adjust Instance Settings

In `cloudbuild.yaml` files, you can adjust:

```yaml
--memory: 256Mi    # Backend: 512Mi, Frontend: 256Mi
--cpu: 1          # Or 0.5 for lighter loads
--min-instances: 0  # Scale to zero when idle
--max-instances: 10 # Adjust based on traffic
--timeout: 60      # Request timeout
```

### 10.2 Monitor Costs

```bash
# View Cloud Run pricing calculator
# https://cloud.google.com/run/pricing

# Check your actual usage
gcloud billing accounts list
gcloud billing accounts get-iam-policy <BILLING_ACCOUNT_ID>
```

## Troubleshooting

### Backend Deployment Issues

1. **Email Not Sending**
   - Verify SMTP credentials
   - Check email logs: `gcloud run logs read ajfs-backend --region us-central1`
   - Ensure CORS is configured correctly

2. **502 Bad Gateway**
   - Check if service is healthy: `gcloud run logs read ajfs-backend`
   - Increase timeout: `--timeout 120`
   - Increase memory: `--memory 512Mi`

### Frontend Deployment Issues

1. **404 on Refresh (Routing Issues)**
   - Nginx configuration should handle this (already configured in `nginx.conf`)
   - Check logs: `gcloud run logs read ajfs-frontend`

2. **Backend API Not Reachable**
   - Verify `REACT_APP_BACKEND_URL` environment variable
   - Check CORS headers in backend

3. **Build Failures**
   - Clear build cache: `docker system prune -a`
   - Check `package.json` scripts
   - Review build logs in Cloud Build console

### General Issues

1. **Check Service Status**
   ```bash
   gcloud run services describe ajfs-backend --region us-central1
   ```

2. **View Recent Deployments**
   ```bash
   gcloud run services describe ajfs-backend --region us-central1 --format=json
   ```

3. **Rollback to Previous Version**
   ```bash
   gcloud run services update-traffic ajfs-backend --to-revisions REVISION_ID=100
   ```

## Security Considerations

1. **Environment Variables**: Use Cloud Secret Manager instead of plain text
2. **CORS**: Keep CORS restricted to your domain only
3. **Rate Limiting**: Already implemented in backend (`express-rate-limit`)
4. **HTTPS**: Cloud Run automatically provides HTTPS
5. **Health Checks**: Endpoints already configured

## Next Steps

1. Update backend URL in frontend after deployment
2. Set up custom domain with Cloud Armor
3. Configure monitoring and alerting
4. Set up automatic backups for any persistent data
5. Create deployment pipeline in CI/CD

## Useful Links

- [Cloud Run Documentation](https://cloud.google.com/run/docs)
- [Cloud Build Documentation](https://cloud.google.com/build/docs)
- [Cloud Run Pricing](https://cloud.google.com/run/pricing)
- [Troubleshooting Guide](https://cloud.google.com/run/docs/troubleshooting)
- [Security Best Practices](https://cloud.google.com/run/docs/securing/securing-services)

---

**Last Updated**: December 2025
