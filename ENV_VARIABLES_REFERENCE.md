# Environment Variables Reference Guide

Complete reference for all environment variables used in the AJFS Innovations website deployment.

## Backend Environment Variables

### Email Configuration
```
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=ajith4uuu@ajfsindia.com
EMAIL_PASS=YOUR_EMAIL_PASSWORD
```

**Description**:
- `EMAIL_HOST`: SMTP server hostname
- `EMAIL_PORT`: SMTP server port (usually 465 for SSL, 587 for TLS)
- `EMAIL_SECURE`: Use SSL/TLS (true for port 465, false for port 587)
- `EMAIL_USER`: Email account username/address for sending emails
- `EMAIL_PASS`: Email account password (⚠️ **USE CLOUD SECRET MANAGER IN PRODUCTION**)

### Application Configuration
```
CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com
FRONTEND_URL=https://your-frontend-url.run.app
NODE_ENV=production
PORT=8080
```

**Description**:
- `CONTACT_RECEIVER_EMAIL`: Email address that receives contact form submissions
- `FRONTEND_URL`: Frontend URL for CORS configuration (allows frontend to make API requests)
- `NODE_ENV`: Environment mode (`development` or `production`)
- `PORT`: Port the application listens on (Cloud Run requires 8080)

## Frontend Environment Variables

### API Configuration
```
REACT_APP_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app
```

**Description**:
- `REACT_APP_BACKEND_URL`: URL of the backend API service (must be accessible from browser)

**Note**: Variables starting with `REACT_APP_` are built into the React app at build time.

## Setting Environment Variables

### Method 1: Using gcloud CLI (Recommended)

#### Single Deployment
```bash
gcloud run deploy SERVICE_NAME \
  --region us-central1 \
  --set-env-vars KEY1=value1,KEY2=value2,KEY3=value3
```

#### Update Existing Service
```bash
gcloud run services update SERVICE_NAME \
  --region us-central1 \
  --update-env-vars KEY1=value1,KEY2=value2
```

#### Example: Deploy Backend with All Variables
```bash
gcloud run deploy ajfs-backend \
  --source . \
  --region us-central1 \
  --set-env-vars \
    EMAIL_HOST=smtp.hostinger.com,\
    EMAIL_PORT=465,\
    EMAIL_SECURE=true,\
    EMAIL_USER=ajith4uuu@ajfsindia.com,\
    EMAIL_PASS=YOUR_PASSWORD,\
    CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com,\
    FRONTEND_URL=https://your-frontend-url.run.app,\
    NODE_ENV=production
```

#### Example: Deploy Frontend with Backend URL
```bash
gcloud run deploy ajfs-frontend \
  --source . \
  --region us-central1 \
  --set-env-vars REACT_APP_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app
```

### Method 2: Using .env.local (Local Development)

Create `backend/.env.local` or `frontend/.env.local`:

**backend/.env.local**
```
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=ajith4uuu@ajfsindia.com
EMAIL_PASS=your_password
CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=8080
```

**frontend/.env.local**
```
REACT_APP_BACKEND_URL=http://localhost:8080
```

Then run with dotenv:
```bash
npm start  # Will automatically load .env.local
```

### Method 3: Using Cloud Build Substitutions

In `cloudbuild.yaml`:

```yaml
substitutions:
  _EMAIL_HOST: 'smtp.hostinger.com'
  _EMAIL_PORT: '465'
  _EMAIL_SECURE: 'true'
  _EMAIL_USER: 'ajith4uuu@ajfsindia.com'
  _EMAIL_PASS: 'YOUR_PASSWORD'
  _CONTACT_RECEIVER_EMAIL: 'dkp@ajfsindia.com'
  _FRONTEND_URL: 'https://your-frontend-url.run.app'

steps:
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'ajfs-backend'
      - '--set-env-vars'
      - 'EMAIL_HOST=${_EMAIL_HOST},EMAIL_USER=${_EMAIL_USER},...'
```

Then set substitutions in Cloud Build trigger settings or via CLI:
```bash
gcloud builds submit \
  --substitutions="_EMAIL_HOST=smtp.hostinger.com,_EMAIL_USER=ajith4uuu@ajfsindia.com"
```

### Method 4: Using Cloud Secret Manager (Production)

For sensitive data like passwords:

#### Create Secrets
```bash
# Create secrets
echo -n "your_password" | gcloud secrets create email-password --data-file=-
echo -n "your_email@example.com" | gcloud secrets create email-user --data-file=-
```

#### Reference in Cloud Build
```yaml
steps:
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk'
    entrypoint: gcloud
    args:
      - 'run'
      - 'deploy'
      - 'ajfs-backend'
      - '--set-env-vars'
      - 'EMAIL_PASS=secret:email-password@latest,EMAIL_USER=secret:email-user@latest'
```

#### Grant Service Account Access
```bash
# Get the Cloud Build service account
PROJECT_ID=$(gcloud config get-value project)
BUILD_SA="${PROJECT_ID}@cloudbuild.gserviceaccount.com"

# Grant access to secret
gcloud secrets add-iam-policy-binding email-password \
  --member=serviceAccount:${BUILD_SA} \
  --role=roles/secretmanager.secretAccessor
```

### Method 5: Using .env File in Docker

Update Dockerfile to load environment variables:

```dockerfile
# In backend/Dockerfile
ARG EMAIL_HOST
ARG EMAIL_USER
# ... etc

ENV EMAIL_HOST=${EMAIL_HOST} \
    EMAIL_USER=${EMAIL_USER} \
    # ... etc
```

Build with args:
```bash
docker build \
  --build-arg EMAIL_HOST=smtp.hostinger.com \
  --build-arg EMAIL_USER=ajith4uuu@ajfsindia.com \
  -t ajfs-backend .
```

## Viewing Current Environment Variables

```bash
# View all environment variables for a service
gcloud run services describe ajfs-backend --region us-central1 --format=json | jq '.spec.template.spec.containers[0].env'

# View specific variable
gcloud run services describe ajfs-backend --region us-central1 --format=json | jq '.spec.template.spec.containers[0].env[] | select(.name=="EMAIL_HOST")'

# View in readable format
gcloud run services describe ajfs-backend --region us-central1 | grep -A 20 "Environment Variables"
```

## Updating Variables After Deployment

```bash
# Update single variable
gcloud run services update ajfs-backend \
  --region us-central1 \
  --update-env-vars EMAIL_USER=newemail@example.com

# Update multiple variables
gcloud run services update ajfs-backend \
  --region us-central1 \
  --update-env-vars \
    EMAIL_USER=newemail@example.com,\
    EMAIL_PASS=newpassword,\
    CONTACT_RECEIVER_EMAIL=newemail@company.com

# Remove variable
gcloud run services update ajfs-backend \
  --region us-central1 \
  --remove-env-vars OLD_VARIABLE_NAME
```

## Environment Variable Types & Constraints

### Backend Variables

| Variable | Type | Required | Max Length | Notes |
|----------|------|----------|------------|-------|
| EMAIL_HOST | string | Yes | 255 | SMTP hostname |
| EMAIL_PORT | number | Yes | 65535 | Port number |
| EMAIL_SECURE | boolean | Yes | - | true/false |
| EMAIL_USER | string | Yes | 255 | Email address |
| EMAIL_PASS | string | Yes | 255 | Password (⚠️ sensitive) |
| CONTACT_RECEIVER_EMAIL | string | Yes | 255 | Recipient email |
| FRONTEND_URL | string | Yes | 2048 | CORS origin |
| NODE_ENV | string | Yes | 20 | development/production |
| PORT | number | No | 65535 | Default: 8080 |

### Frontend Variables

| Variable | Type | Required | Max Length | Notes |
|----------|------|----------|------------|-------|
| REACT_APP_BACKEND_URL | string | Yes | 2048 | Backend API URL |

## Validation & Best Practices

### ✅ Do's
- Store sensitive data in Cloud Secret Manager
- Use long, complex passwords for email accounts
- Verify all URLs end without trailing slashes
- Use environment variables for all configuration
- Document all variables used
- Rotate passwords periodically
- Use different passwords for different environments

### ❌ Don'ts
- Don't commit `.env` files to Git
- Don't expose secrets in logs
- Don't hardcode values in code
- Don't use simple/weak passwords
- Don't share credentials via unsecured channels
- Don't reuse same password across services
- Don't store API keys as environment variables (use Secret Manager)

## Troubleshooting Environment Variables

### Issue: "undefined" in frontend
**Cause**: REACT_APP_ variables not set at build time  
**Solution**:
```bash
# Frontend must be rebuilt with new variables
gcloud run deploy ajfs-frontend --source . \
  --set-env-vars REACT_APP_BACKEND_URL=https://...
```

### Issue: "Email not sending"
**Cause**: Incorrect SMTP credentials  
**Solution**:
```bash
# Verify credentials
gcloud run logs read ajfs-backend | grep -i email
# Check if error message indicates auth failure
```

### Issue: "CORS error"
**Cause**: FRONTEND_URL mismatch  
**Solution**:
```bash
# Get actual frontend URL
FRONTEND_URL=$(gcloud run services describe ajfs-frontend --region us-central1 --format='value(status.url)')

# Update backend
gcloud run services update ajfs-backend \
  --region us-central1 \
  --update-env-vars FRONTEND_URL=$FRONTEND_URL
```

## Quick Reference Commands

```bash
# Set backend email variables
gcloud run services update ajfs-backend --region us-central1 \
  --update-env-vars \
    EMAIL_HOST=smtp.hostinger.com,\
    EMAIL_PORT=465,\
    EMAIL_SECURE=true,\
    EMAIL_USER=ajith4uuu@ajfsindia.com,\
    EMAIL_PASS=YOUR_PASSWORD,\
    CONTACT_RECEIVER_EMAIL=dkp@ajfsindia.com

# Set backend URLs
gcloud run services update ajfs-backend --region us-central1 \
  --update-env-vars FRONTEND_URL=https://your-frontend-url.run.app

# Set frontend API URL
gcloud run services update ajfs-frontend --region us-central1 \
  --update-env-vars REACT_APP_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app

# View all backend variables
gcloud run services describe ajfs-backend --region us-central1 --format='value(spec.template.spec.containers[0].env[*])'

# View all frontend variables
gcloud run services describe ajfs-frontend --region us-central1 --format='value(spec.template.spec.containers[0].env[*])'
```

---

## Related Documentation

- **Deployment Guide**: GCP_CLOUD_RUN_DEPLOYMENT.md
- **Quick Deploy**: QUICK_DEPLOY_MANUAL.md
- **Pre-Deployment Checklist**: DEPLOYMENT_CHECKLIST.md
- **Deployment Summary**: DEPLOYMENT_SUMMARY.md

---

**Last Updated**: December 2025
