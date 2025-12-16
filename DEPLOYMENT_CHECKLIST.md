# GCP Cloud Run Deployment Checklist

Use this checklist to ensure everything is ready before deploying.

## Prerequisites ✓

- [ ] GCP account created with billing enabled
- [ ] GCP project created (e.g., `ajfs-innovations`)
- [ ] gcloud CLI installed (`gcloud --version`)
- [ ] gcloud configured (`gcloud auth login`)
- [ ] Project ID set (`gcloud config set project YOUR_PROJECT_ID`)
- [ ] Docker installed (for local testing)
- [ ] Git installed and repository initialized
- [ ] All code committed to main branch

## Code Preparation ✓

### Backend (backend/ directory)
- [ ] `package.json` updated with production dependencies
- [ ] Environment variables documented
- [ ] `server.js` listening on PORT environment variable (default 8080)
- [ ] Health check endpoint exists (`/health`)
- [ ] CORS configured correctly
- [ ] Error handling implemented
- [ ] Rate limiting configured
- [ ] Dockerfile present and optimized
- [ ] `.dockerignore` file exists (or use defaults)
- [ ] No hardcoded credentials in code
- [ ] No debug logging in production

### Frontend (frontend/ directory)
- [ ] `package.json` updated with all dependencies
- [ ] `npm run build` produces valid output
- [ ] Environment variables for REACT_APP_* are documented
- [ ] `nginx.conf` configured for Cloud Run (port 8080)
- [ ] React Router configured for SPA routing
- [ ] Dockerfile uses multi-stage build
- [ ] `.dockerignore` file exists
- [ ] No hardcoded API URLs (use environment variables)
- [ ] Build size is reasonable (<500MB)

## GCP Project Setup ✓

- [ ] APIs enabled:
  - [ ] Cloud Run API
  - [ ] Cloud Build API
  - [ ] Container Registry API
  - [ ] Artifact Registry API
- [ ] Service account created (optional but recommended)
- [ ] IAM roles assigned:
  - [ ] Cloud Run Admin
  - [ ] Service Account User
  - [ ] Cloud Build Editor
- [ ] Billing alert set up
- [ ] VPC network configured (if needed)

## Configuration Files ✓

### backend/cloudbuild.yaml
- [ ] Region set correctly (`_REGION`)
- [ ] Environment variables documented
- [ ] Email credentials configured
- [ ] Contact receiver email set
- [ ] Frontend URL placeholder
- [ ] Memory/CPU settings appropriate
- [ ] Timeout set correctly (60 seconds)
- [ ] Machine type for build set

### frontend/cloudbuild.yaml
- [ ] Region set correctly (`_REGION`)
- [ ] Backend URL placeholder
- [ ] Memory/CPU settings (256Mi/1 CPU)
- [ ] Timeout set correctly

### backend/Dockerfile
- [ ] Node.js version compatible
- [ ] Port 8080 exposed
- [ ] Non-root user configured
- [ ] Health check configured
- [ ] Production dependencies only

### frontend/Dockerfile
- [ ] Multi-stage build used
- [ ] Build stage installs all dependencies
- [ ] Nginx configured for port 8080
- [ ] Static asset caching configured
- [ ] React Router fallback configured

### frontend/nginx.conf
- [ ] Listening on port 8080
- [ ] Try files fallback for React Router
- [ ] Gzip compression enabled
- [ ] Security headers configured
- [ ] Cache headers for static assets
- [ ] Health check endpoint

## Environment Variables ✓

### Backend Variables
- [ ] `EMAIL_HOST` = smtp.hostinger.com
- [ ] `EMAIL_PORT` = 465
- [ ] `EMAIL_SECURE` = true
- [ ] `EMAIL_USER` = ajith4uuu@ajfsindia.com
- [ ] `EMAIL_PASS` = (secure - use Secret Manager)
- [ ] `CONTACT_RECEIVER_EMAIL` = dkp@ajfsindia.com
- [ ] `FRONTEND_URL` = https://your-frontend-url.run.app
- [ ] `NODE_ENV` = production
- [ ] `PORT` = 8080

### Frontend Variables
- [ ] `REACT_APP_BACKEND_URL` = https://ajfs-backend-xxxxx-uc.a.run.app

## Local Testing ✓

### Backend
```bash
cd backend
npm install
npm start
# Open http://localhost:8080
curl http://localhost:8080/health
```
- [ ] Server starts without errors
- [ ] Health endpoint responds
- [ ] No console errors

### Frontend
```bash
cd frontend
npm install
npm run build
# Check build output in build/ directory
npm start
# Open http://localhost:3000
```
- [ ] Build completes without errors
- [ ] No console warnings (minimize)
- [ ] App loads correctly
- [ ] Navigation works
- [ ] Backend API calls work

### Docker Build (Optional but Recommended)
```bash
# Backend
cd backend
docker build -t ajfs-backend .
docker run -p 8080:8080 ajfs-backend

# Frontend
cd frontend
docker build -t ajfs-frontend .
docker run -p 8080:8080 ajfs-frontend
```
- [ ] Docker build succeeds
- [ ] Container runs without errors
- [ ] Services accessible on configured ports

## Cloud Run Deployment ✓

### Before Deployment
- [ ] gcloud authenticated (`gcloud auth list`)
- [ ] Project set correctly (`gcloud config get-value project`)
- [ ] APIs enabled (run `gcloud services list --enabled`)
- [ ] Container Registry/Artifact Registry ready

### Deployment Steps
- [ ] Backend deployed first
- [ ] Backend URL obtained
- [ ] Frontend deployed with backend URL
- [ ] Frontend URL obtained
- [ ] Backend updated with frontend URL

### Post-Deployment Verification
- [ ] Backend service exists: `gcloud run services describe ajfs-backend --region us-central1`
- [ ] Frontend service exists: `gcloud run services describe ajfs-frontend --region us-central1`
- [ ] Backend responds to health check: `curl $BACKEND_URL/health`
- [ ] Frontend loads in browser: Open `$FRONTEND_URL`
- [ ] Contact form works: Test submit
- [ ] Email is received

## Monitoring & Logs ✓

- [ ] View logs: `gcloud run logs read ajfs-backend --region us-central1`
- [ ] Check for errors in logs
- [ ] Monitor CPU usage
- [ ] Monitor memory usage
- [ ] Check request rates

## Custom Domain Setup ✓ (Optional)

- [ ] Domain registered and available
- [ ] DNS records ready to be configured
- [ ] SSL certificate will be auto-provisioned by Cloud Run
- [ ] Cloud Armor policies configured (optional)

## Security Review ✓

- [ ] No hardcoded secrets in code
- [ ] Secrets stored in Cloud Secret Manager
- [ ] CORS configured to specific domains
- [ ] HTTPS enabled (automatic with Cloud Run)
- [ ] Rate limiting configured
- [ ] Input validation implemented
- [ ] SQL injection prevention (if applicable)
- [ ] XSS protection headers set
- [ ] CSRF protection (if forms involved)

## Cost Management ✓

- [ ] Instance scaling configured (min: 0, max: 10)
- [ ] Memory allocation appropriate
- [ ] CPU allocation appropriate
- [ ] Timeout settings reasonable
- [ ] Billing alerts set up in GCP Console
- [ ] Expected monthly cost estimated
- [ ] Cost optimization plan in place

## Backup & Recovery ✓

- [ ] Code backed up in Git
- [ ] Cloud Build configurations backed up
- [ ] Environment configuration documented
- [ ] Rollback procedure documented
- [ ] Data backup strategy (if applicable)

## Documentation ✓

- [ ] Deployment guide written (GCP_CLOUD_RUN_DEPLOYMENT.md)
- [ ] Quick reference created (QUICK_DEPLOY_MANUAL.md)
- [ ] Team trained on deployment process
- [ ] On-call runbook prepared
- [ ] Known issues documented

## Final Checks ✓

- [ ] All tests pass locally
- [ ] No console errors/warnings in production
- [ ] Performance acceptable
- [ ] Load times under 3 seconds
- [ ] Mobile responsive design verified
- [ ] All forms functional
- [ ] Email notifications working
- [ ] Analytics/monitoring in place

## Post-Deployment ✓

- [ ] Monitor services for 24 hours
- [ ] Check logs daily for errors
- [ ] Verify email delivery
- [ ] Test user workflows
- [ ] Monitor costs
- [ ] Get feedback from stakeholders
- [ ] Plan next release cycle

---

## Deployment Command Reference

```bash
# Set up
export PROJECT_ID="your-gcp-project-id"
gcloud config set project $PROJECT_ID
gcloud services enable run.googleapis.com cloudbuild.googleapis.com

# Deploy Backend
cd backend
gcloud run deploy ajfs-backend --source . \
  --region us-central1 \
  --set-env-vars EMAIL_HOST=smtp.hostinger.com,...
cd ..

# Get Backend URL
BACKEND_URL=$(gcloud run services describe ajfs-backend --region us-central1 --format='value(status.url)')

# Deploy Frontend
cd frontend
gcloud run deploy ajfs-frontend --source . \
  --region us-central1 \
  --set-env-vars REACT_APP_BACKEND_URL=$BACKEND_URL
cd ..

# Get Frontend URL
FRONTEND_URL=$(gcloud run services describe ajfs-frontend --region us-central1 --format='value(status.url)')

# Update Backend with Frontend URL
gcloud run services update ajfs-backend --region us-central1 \
  --update-env-vars FRONTEND_URL=$FRONTEND_URL
```

---

**Completion Date**: _______________

**Deployed By**: _______________

**Approval**: _______________

---

For questions or issues, refer to:
- Full deployment guide: `GCP_CLOUD_RUN_DEPLOYMENT.md`
- Quick reference: `QUICK_DEPLOY_MANUAL.md`
- GCP Documentation: https://cloud.google.com/run/docs
