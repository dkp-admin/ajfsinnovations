# 🚀 AJFS Innovations - Getting Started Guide

Welcome! This guide will help you get your AJFS Innovations website from development to production on Google Cloud Run.

## 📦 What You Have

Your complete project structure with all necessary files:

```
ajfs-innovations/
├── 📖 Documentation
│   ├── README.md                    ← Start here!
│   ├── DEPLOYMENT_GUIDE.md          ← Detailed deployment steps
│   ├── DNS_SETUP_GUIDE.md           ← Hostinger DNS configuration
│   ├── DEPLOYMENT_CHECKLIST.md      ← Track your progress
│   └── PROJECT_STRUCTURE.md         ← Project organization
│
├── 💻 Frontend (React Application)
│   ├── public/
│   │   ├── index.html
│   │   └── images/                  ← Add your images here
│   ├── src/
│   │   ├── components/              ← Reusable UI components
│   │   ├── pages/                   ← Website pages
│   │   ├── App.js                   ← Main app component
│   │   └── index.js                 ← App entry point
│   ├── Dockerfile                   ← Container configuration
│   ├── nginx.conf                   ← Web server config
│   ├── cloudbuild.yaml              ← CI/CD configuration
│   ├── package.json                 ← Dependencies
│   └── .env.example                 ← Environment template
│
├── 🔧 Backend (Node.js API)
│   ├── server.js                    ← API server
│   ├── Dockerfile                   ← Container configuration
│   ├── cloudbuild.yaml              ← CI/CD configuration
│   ├── package.json                 ← Dependencies
│   └── .env.example                 ← Environment template
│
└── 🛠️ Setup Scripts
    ├── setup.sh                     ← Local development setup
    └── .gitignore                   ← Git ignore rules
```

## 🎯 Quick Start Options

Choose your path:

### Option 1: Local Development First (Recommended)
**Best for:** Testing everything works before deploying to cloud

1. **Setup locally** (5 minutes)
2. **Test website** (10 minutes)  
3. **Deploy to GCP** (30 minutes)
4. **Configure DNS** (5 minutes + wait for propagation)

[Jump to Local Setup](#-local-development-setup)

### Option 2: Direct Cloud Deployment
**Best for:** You're confident and want to deploy immediately

1. **Deploy backend** (15 minutes)
2. **Deploy frontend** (15 minutes)
3. **Configure DNS** (5 minutes + wait for propagation)

[Jump to Cloud Deployment](#-cloud-deployment)

---

## 🏠 Local Development Setup

### Prerequisites Check

Before starting, make sure you have:
- ✅ Node.js 18 or higher
- ✅ npm (comes with Node.js)
- ✅ A code editor (VS Code recommended)

**Check your versions:**
```bash
node --version  # Should be v18.x.x or higher
npm --version   # Should be 9.x.x or higher
```

### Step 1: Extract Files

Extract the project files to your desired location:
```bash
# Example: Extract to your Documents folder
cd ~/Documents
unzip ajfs-innovations.zip
cd ajfs-innovations
```

### Step 2: Run Setup Script

```bash
# Make the script executable (Mac/Linux)
chmod +x setup.sh

# Run the setup script
./setup.sh
```

**Windows users:** Run these commands instead:
```cmd
cd backend
npm install
cd ../frontend
npm install
```

### Step 3: Configure Email

Edit `backend/.env` with your Hostinger email credentials:

```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=info@ajfsindia.com          ← Your email
EMAIL_PASS=your_actual_password         ← Your password
CONTACT_RECEIVER_EMAIL=admin@ajfsindia.com  ← Where to receive inquiries
```

### Step 4: Add Images (Optional)

Place your images in `frontend/public/images/`:
- Service images: `placeholder_landing_zone.jpg`, etc.
- Team photos: `placeholder_male1.jpg`, `placeholder_female1.jpg`, etc.

For now, the site will work without images (they'll just show broken image icons).

### Step 5: Start Backend

Open a terminal and run:
```bash
cd backend
npm start
```

You should see:
```
✅ AJFS Backend server running on port 8080
📧 Email configured for: info@ajfsindia.com
```

**Keep this terminal open!**

### Step 6: Start Frontend

Open a **new terminal** and run:
```bash
cd frontend
npm start
```

Your browser should automatically open to `http://localhost:3000`

### Step 7: Test Everything

- ✅ Navigate through all pages (Home, Services, Team, Contact)
- ✅ Submit the contact form with test data
- ✅ Check your email for the test message
- ✅ Test on mobile (responsive design)

**If everything works locally, you're ready to deploy to the cloud! 🎉**

---

## ☁️ Cloud Deployment

### Prerequisites

You need:
1. **Google Cloud Account** with billing enabled
2. **Google Cloud SDK** installed ([Download here](https://cloud.google.com/sdk/docs/install))
3. **Docker Desktop** installed ([Download here](https://www.docker.com/products/docker-desktop))

### Quick Setup

```bash
# 1. Login to Google Cloud
gcloud auth login

# 2. Set your project (create one first at console.cloud.google.com)
gcloud config set project YOUR_PROJECT_ID

# 3. Enable required APIs
gcloud services enable cloudbuild.googleapis.com run.googleapis.com containerregistry.googleapis.com

# 4. Configure Docker
gcloud auth configure-docker
```

### Deploy Backend (15 minutes)

```bash
cd backend

# Build and deploy
gcloud run deploy ajfs-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars EMAIL_HOST=smtp.hostinger.com,EMAIL_PORT=465,EMAIL_SECURE=true,EMAIL_USER=info@ajfsindia.com,EMAIL_PASS=YOUR_PASSWORD,CONTACT_RECEIVER_EMAIL=admin@ajfsindia.com
```

**Important:** Save the URL that Cloud Run provides!
Example: `https://ajfs-backend-abc123-uc.a.run.app`

### Deploy Frontend (15 minutes)

```bash
cd ../frontend

# Build and deploy
gcloud run deploy ajfs-frontend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated \
  --set-env-vars REACT_APP_BACKEND_URL=https://ajfs-backend-abc123-uc.a.run.app
```

**Replace with your actual backend URL from the previous step!**

### Test Cloud Deployment

Visit the frontend URL provided by Cloud Run. Test:
- All pages load
- Contact form works
- You receive test emails

---

## 🌐 DNS Configuration

### Step 1: Map Domain in Cloud Run

```bash
gcloud run domain-mappings create \
  --service ajfs-frontend \
  --domain www.ajfsindia.com \
  --region us-central1
```

This will provide DNS records like:
```
CNAME: www → ghs.googlehosted.com.
A: @ → 216.239.32.21
A: @ → 216.239.34.21
A: @ → 216.239.36.21
A: @ → 216.239.38.21
```

### Step 2: Update Hostinger DNS

1. Login to Hostinger
2. Go to Domains → ajfsindia.com → DNS
3. **Backup your current DNS** (take screenshots!)
4. Delete old A records for your WordPress site
5. Add the new records from Step 1

**Detailed instructions:** See `DNS_SETUP_GUIDE.md`

### Step 3: Wait for DNS Propagation

DNS changes take 15 minutes to 48 hours. Check progress:
```bash
dig www.ajfsindia.com
```

Or use: https://dnschecker.org

---

## 🔄 Setting Up CI/CD (Optional but Recommended)

This enables automatic deployments when you push code changes.

### Step 1: Push Code to Git

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_REPO_URL
git push -u origin main
```

### Step 2: Connect to Cloud Build

1. Go to [Cloud Build Triggers](https://console.cloud.google.com/cloud-build/triggers)
2. Click "Connect Repository"
3. Follow the steps to connect your GitHub/GitLab/Bitbucket

### Step 3: Create Triggers

**Backend Trigger:**
- Name: `deploy-backend`
- Event: Push to branch `main`
- Config: `/backend/cloudbuild.yaml`
- Add substitution variables (email settings)

**Frontend Trigger:**
- Name: `deploy-frontend`  
- Event: Push to branch `main`
- Config: `/frontend/cloudbuild.yaml`
- Add substitution variable: `_BACKEND_URL`

**Detailed instructions:** See `DEPLOYMENT_GUIDE.md` Section 4

---

## 📋 Use the Checklist

Track your progress with the deployment checklist:

```bash
# Open the checklist
cat DEPLOYMENT_CHECKLIST.md
```

Print it out and check off items as you complete them!

---

## 🆘 Need Help?

### Common Issues

**Backend not sending emails:**
- Verify email credentials in `.env`
- Check SMTP settings with Hostinger
- Review Cloud Run logs: `gcloud run services logs read ajfs-backend`

**Frontend can't connect to backend:**
- Verify `REACT_APP_BACKEND_URL` is correct
- Check CORS settings in `backend/server.js`
- Ensure backend is deployed and healthy

**DNS not working:**
- Wait for DNS propagation (up to 48 hours)
- Verify DNS records in Hostinger match Google Cloud records
- Clear your DNS cache

### Documentation

- **README.md** - Project overview and features
- **DEPLOYMENT_GUIDE.md** - Comprehensive deployment instructions
- **DNS_SETUP_GUIDE.md** - Detailed Hostinger DNS setup
- **DEPLOYMENT_CHECKLIST.md** - Track your deployment progress

### Support Resources

- **Hostinger Support:** support@hostinger.com
- **GCP Documentation:** https://cloud.google.com/run/docs
- **Your Team:** info@ajfsindia.com

---

## 🎉 Success Checklist

You're done when:
- ✅ `https://www.ajfsindia.com` loads your new website
- ✅ All pages work (Home, Services, Team, Contact)
- ✅ Contact form sends emails
- ✅ SSL certificate is active (green padlock)
- ✅ Site works on mobile devices
- ✅ CI/CD automatically deploys when you push changes

---

## 🚀 What's Next?

After deployment:
1. **Add real images** to replace placeholders
2. **Update team member info** with actual employees
3. **Add Google Analytics** for visitor tracking
4. **Set up monitoring alerts** in Google Cloud
5. **Test thoroughly** before announcing the new site
6. **Keep old WordPress hosting** for 30 days as backup

---

## 💡 Pro Tips

1. **Test locally first** - Always test changes on your local machine before deploying
2. **Use Git branches** - Create feature branches for new work
3. **Monitor costs** - Check Google Cloud billing dashboard regularly
4. **Backup regularly** - Keep backups of your database and configuration
5. **Document changes** - Keep notes on customizations you make

---

## 🎯 Next Steps

Choose your path:

**If you want to test locally first:**
1. Run `./setup.sh`
2. Configure `backend/.env`
3. Run `npm start` in both frontend and backend
4. Test at http://localhost:3000

**If you want to deploy to cloud immediately:**
1. Read `DEPLOYMENT_GUIDE.md`
2. Follow cloud deployment steps
3. Use `DEPLOYMENT_CHECKLIST.md` to track progress

**If you want detailed step-by-step instructions:**
- Start with `README.md`
- Then read `DEPLOYMENT_GUIDE.md`
- Finally configure DNS with `DNS_SETUP_GUIDE.md`

---

**Good luck with your deployment! 🚀**

Built with ❤️ for AJFS Innovations Pvt Ltd
