# AJFS Innovations - Deployment Checklist

Use this checklist to ensure a smooth deployment to Google Cloud Run.

## Pre-Deployment Checklist

### Local Setup
- [ ] Node.js 18+ installed
- [ ] npm installed and working
- [ ] Docker Desktop installed and running
- [ ] Google Cloud SDK installed
- [ ] Git installed and configured
- [ ] Code repository created (GitHub/GitLab/Bitbucket)

### Google Cloud Platform
- [ ] GCP account created
- [ ] Billing enabled on GCP project
- [ ] Project ID noted down: `_________________`
- [ ] gcloud CLI authenticated: `gcloud auth login`
- [ ] Project set: `gcloud config set project PROJECT_ID`

### Email Configuration
- [ ] Hostinger email account created (e.g., info@ajfsindia.com)
- [ ] SMTP credentials obtained
- [ ] SMTP host confirmed: `smtp.hostinger.com`
- [ ] SMTP port confirmed: `465`
- [ ] Test email sent successfully from Hostinger

### Domain Information
- [ ] Domain purchased: `ajfsindia.com`
- [ ] Domain hosted at Hostinger
- [ ] DNS management access verified
- [ ] Current DNS records backed up (screenshots taken)

## Backend Deployment

### Configuration
- [ ] Backend `.env` file created from `.env.example`
- [ ] Email credentials added to `.env`
- [ ] Contact receiver email configured
- [ ] Environment variables verified

### Enable GCP APIs
```bash
gcloud services enable cloudbuild.googleapis.com
gcloud services enable run.googleapis.com
gcloud services enable containerregistry.googleapis.com
```
- [ ] Cloud Build API enabled
- [ ] Cloud Run API enabled
- [ ] Container Registry API enabled

### Docker Authentication
```bash
gcloud auth configure-docker
```
- [ ] Docker authenticated with GCR

### Build and Deploy Backend
```bash
cd backend
docker build -t gcr.io/PROJECT_ID/ajfs-backend:latest .
docker push gcr.io/PROJECT_ID/ajfs-backend:latest
gcloud run deploy ajfs-backend --image gcr.io/PROJECT_ID/ajfs-backend:latest ...
```
- [ ] Backend Docker image built successfully
- [ ] Backend image pushed to Container Registry
- [ ] Backend deployed to Cloud Run
- [ ] Backend URL noted: `_________________________________`
- [ ] Backend health check passed: `/health` endpoint works
- [ ] Backend contact form test successful

## Frontend Deployment

### Configuration
- [ ] Frontend `.env` file created from `.env.example`
- [ ] Backend URL added to frontend `.env`
- [ ] `REACT_APP_BACKEND_URL` environment variable set

### Build and Deploy Frontend
```bash
cd frontend
docker build -t gcr.io/PROJECT_ID/ajfs-frontend:latest .
docker push gcr.io/PROJECT_ID/ajfs-frontend:latest
gcloud run deploy ajfs-frontend --image gcr.io/PROJECT_ID/ajfs-frontend:latest ...
```
- [ ] Frontend Docker image built successfully
- [ ] Frontend image pushed to Container Registry
- [ ] Frontend deployed to Cloud Run
- [ ] Frontend URL noted: `_________________________________`
- [ ] Frontend loads in browser
- [ ] All pages accessible (Home, Services, Team, Contact)
- [ ] Contact form submits successfully
- [ ] Email received from contact form

## CI/CD Setup

### Repository Setup
- [ ] Code pushed to Git repository
- [ ] Repository connected to Cloud Build

### Backend Trigger
- [ ] Backend trigger created in Cloud Build
- [ ] Trigger name: `deploy-backend`
- [ ] Branch: `main`
- [ ] Config file: `/backend/cloudbuild.yaml`
- [ ] Substitution variables added:
  - [ ] `_EMAIL_HOST`
  - [ ] `_EMAIL_PORT`
  - [ ] `_EMAIL_SECURE`
  - [ ] `_EMAIL_USER`
  - [ ] `_EMAIL_PASS`
  - [ ] `_CONTACT_RECEIVER_EMAIL`
  - [ ] `_FRONTEND_URL`

### Frontend Trigger
- [ ] Frontend trigger created in Cloud Build
- [ ] Trigger name: `deploy-frontend`
- [ ] Branch: `main`
- [ ] Config file: `/frontend/cloudbuild.yaml`
- [ ] Substitution variables added:
  - [ ] `_BACKEND_URL`

### Test CI/CD
- [ ] Made test commit to main branch
- [ ] Backend trigger executed successfully
- [ ] Frontend trigger executed successfully
- [ ] Automatic deployment verified

## Domain Configuration

### Cloud Run Domain Mapping
```bash
gcloud run domain-mappings create --service ajfs-frontend --domain www.ajfsindia.com ...
gcloud run domain-mappings create --service ajfs-frontend --domain ajfsindia.com ...
```
- [ ] Domain mapping created for `www.ajfsindia.com`
- [ ] Domain mapping created for `ajfsindia.com` (optional)
- [ ] DNS records retrieved from GCP
- [ ] DNS records noted:
  ```
  CNAME: www → ghs.googlehosted.com.
  A: @ → 216.239.32.21
  A: @ → 216.239.34.21
  A: @ → 216.239.36.21
  A: @ → 216.239.38.21
  ```

### Hostinger DNS Configuration
- [ ] Logged into Hostinger control panel
- [ ] Navigated to DNS management for ajfsindia.com
- [ ] Backed up current DNS records (screenshots)
- [ ] Deleted old WordPress A records
- [ ] Deleted old www CNAME record (if exists)
- [ ] Added new CNAME record for `www`
- [ ] Added 4 new A records for root domain `@`
- [ ] Verified MX records still present (for email)
- [ ] Verified TXT records still present
- [ ] Saved DNS changes
- [ ] DNS change timestamp noted: `_________________`

## Post-Deployment Verification

### DNS Propagation (wait 15 mins - 48 hours)
- [ ] DNS propagation checked: `dig www.ajfsindia.com`
- [ ] DNS propagation checked: `dig ajfsindia.com`
- [ ] Online DNS checker used: https://dnschecker.org
- [ ] DNS resolving to Google Cloud IPs

### Website Testing
- [ ] `https://www.ajfsindia.com` loads successfully
- [ ] `https://ajfsindia.com` loads successfully (if mapped)
- [ ] SSL certificate is active (green padlock in browser)
- [ ] All pages load correctly:
  - [ ] Home page
  - [ ] Services page
  - [ ] Team page
  - [ ] Contact page
- [ ] Navigation works correctly
- [ ] Contact form submits successfully
- [ ] Email received from contact form
- [ ] Mobile responsiveness verified
- [ ] No console errors in browser

### Email Functionality
- [ ] Hostinger email still works
- [ ] Can send emails from info@ajfsindia.com
- [ ] Can receive emails at info@ajfsindia.com
- [ ] Contact form emails being received
- [ ] Email formatting looks correct

### Performance Testing
- [ ] Website loads quickly (< 3 seconds)
- [ ] Images load properly
- [ ] No broken links
- [ ] Backend API responds quickly

## Security & Monitoring

### Security
- [ ] Environment variables not exposed in code
- [ ] `.env` files added to `.gitignore`
- [ ] Rate limiting working on contact form
- [ ] CORS configured correctly
- [ ] Security headers present (Helmet)

### Monitoring Setup
- [ ] Cloud Monitoring dashboard reviewed
- [ ] Error logs checked (no errors)
- [ ] Alert policies created:
  - [ ] High error rate alert
  - [ ] High latency alert
  - [ ] Service downtime alert

### Cost Optimization
- [ ] Minimum instances set to 0 (for cost saving)
- [ ] Memory/CPU appropriately sized
- [ ] Budget alerts configured in GCP

## Documentation

- [ ] README.md reviewed and updated
- [ ] DEPLOYMENT_GUIDE.md reviewed
- [ ] DNS_SETUP_GUIDE.md reviewed
- [ ] Team briefed on new website
- [ ] Credentials securely stored
- [ ] Backup of all configuration files created

## Old WordPress Site

- [ ] Old WordPress site backed up completely
- [ ] Database exported from WordPress
- [ ] WordPress files downloaded
- [ ] Backup stored securely
- [ ] Decision made on when to cancel old hosting
- [ ] Plan to keep hosting for 30 days minimum

## Final Checks

- [ ] All stakeholders notified of new website
- [ ] Google Analytics added (if applicable)
- [ ] Google Search Console verified
- [ ] Social media links updated
- [ ] Email signatures updated with new website
- [ ] Business cards updated (if needed)

## Rollback Plan (if needed)

If something goes wrong:
- [ ] Rollback procedure documented
- [ ] Old DNS records backed up
- [ ] Know how to revert DNS to old WordPress site
- [ ] Contact information for support ready:
  - Hostinger support
  - GCP support
  - Development team

## Sign-Off

**Deployment completed by:** _____________________

**Date:** _____________________

**Backend URL:** _____________________

**Frontend URL:** _____________________

**Custom Domain:** www.ajfsindia.com

**Status:** ✅ Deployed Successfully

---

## Notes & Issues

Use this space to note any issues encountered or special configurations made:

___________________________________________________________

___________________________________________________________

___________________________________________________________

___________________________________________________________

___________________________________________________________
