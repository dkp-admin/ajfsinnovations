# AJFS Innovations Pvt Ltd - Website

A modern, cloud-native website built with React and Node.js, deployed on Google Cloud Run.

## 🌟 Features

- **Modern React Frontend** - Built with React 18 and React Router
- **Node.js Backend** - Express server for contact form handling
- **Cloud-Native** - Containerized and deployed on Google Cloud Run
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Email Integration** - Contact form with Nodemailer integration
- **CI/CD Pipeline** - Automated deployments with Cloud Build
- **Custom Domain** - Configured for www.ajfsindia.com

## 📁 Project Structure

```
ajfs-innovations/
├── frontend/                 # React application
│   ├── public/
│   │   ├── images/          # Website images
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── App.js
│   │   └── index.js
│   ├── Dockerfile           # Frontend container config
│   ├── cloudbuild.yaml      # Frontend CI/CD config
│   └── package.json
├── backend/                  # Node.js API
│   ├── server.js            # Main server file
│   ├── Dockerfile           # Backend container config
│   ├── cloudbuild.yaml      # Backend CI/CD config
│   └── package.json
├── DEPLOYMENT_GUIDE.md      # Detailed deployment instructions
├── DNS_SETUP_GUIDE.md       # DNS configuration guide
└── setup.sh                 # Local development setup script
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Docker Desktop (for containerization)
- Google Cloud SDK (for deployment)
- Git

### Local Development Setup

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd ajfs-innovations
   ```

2. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

3. **Configure environment variables:**
   
   Edit `backend/.env`:
   ```env
   EMAIL_HOST=smtp.hostinger.com
   EMAIL_PORT=465
   EMAIL_SECURE=true
   EMAIL_USER=your_email@ajfsindia.com
   EMAIL_PASS=your_password
   CONTACT_RECEIVER_EMAIL=admin@ajfsindia.com
   ```

4. **Start the backend:**
   ```bash
   cd backend
   npm start
   ```

5. **Start the frontend (in a new terminal):**
   ```bash
   cd frontend
   npm start
   ```

6. **Open browser:**
   ```
   http://localhost:3000
   ```

## 🎨 Pages

- **Home** - Hero section, company overview, key services
- **Services** - Comprehensive list of all services offered
- **Team** - Meet the 20 team members
- **Contact** - Contact form with email integration

## 📧 Email Configuration

The contact form uses Nodemailer with Hostinger SMTP. Configure your email settings in `backend/.env`:

- **Host:** smtp.hostinger.com
- **Port:** 465
- **Secure:** true
- **Auth:** Your Hostinger email credentials

## 🌐 Deployment to Google Cloud Run

### Prerequisites

1. Google Cloud Platform account with billing enabled
2. gcloud CLI installed and configured
3. Docker installed

### Deployment Steps

**For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)**

Quick deployment:

```bash
# Set your project ID
export PROJECT_ID="your-gcp-project-id"

# Deploy backend
cd backend
gcloud run deploy ajfs-backend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated

# Deploy frontend
cd ../frontend
gcloud run deploy ajfs-frontend \
  --source . \
  --region us-central1 \
  --allow-unauthenticated
```

### DNS Configuration

**For detailed DNS setup instructions, see [DNS_SETUP_GUIDE.md](DNS_SETUP_GUIDE.md)**

After deployment, configure your domain:

1. Map custom domain in Cloud Run
2. Get DNS records from GCP
3. Update DNS records in Hostinger
4. Wait for DNS propagation (15 mins - 48 hours)

## 🔄 CI/CD

The project includes Cloud Build configurations for automated deployments:

- **Backend:** `backend/cloudbuild.yaml`
- **Frontend:** `frontend/cloudbuild.yaml`

Push to main branch triggers automatic deployment.

## 🛠️ Development

### Adding New Pages

1. Create component in `frontend/src/pages/`
2. Create corresponding CSS file
3. Add route in `frontend/src/App.js`
4. Add navigation link in `frontend/src/components/Header.js`

### Updating Services

Edit the `services` array in `frontend/src/pages/Services.js`

### Updating Team Members

Edit the `teamMembers` array in `frontend/src/pages/Team.js`

### Adding Images

Place images in `frontend/public/images/` directory and reference them as:
```javascript
<img src="/images/your-image.jpg" alt="Description" />
```

## 📦 Tech Stack

### Frontend
- React 18
- React Router v6
- CSS3 with modern features
- Responsive design

### Backend
- Node.js 18+
- Express.js
- Nodemailer
- Helmet (security)
- Express Rate Limit

### Infrastructure
- Google Cloud Run
- Google Container Registry
- Cloud Build
- Docker

## 🔒 Security

- Helmet middleware for security headers
- Rate limiting on contact form (5 requests per 15 minutes)
- CORS configuration
- Input validation and sanitization
- Environment variables for sensitive data
- Non-root user in Docker containers

## 🧪 Testing

```bash
# Backend health check
curl http://localhost:8080/health

# Test contact form
curl -X POST http://localhost:8080/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","subject":"Test","message":"Test message"}'
```

## 📊 Monitoring

View logs in Google Cloud:

```bash
# Backend logs
gcloud run services logs read ajfs-backend --region us-central1

# Frontend logs
gcloud run services logs read ajfs-frontend --region us-central1
```

## 🐛 Troubleshooting

### Backend not sending emails
- Check SMTP credentials in `.env`
- Verify email settings with Hostinger
- Check Cloud Run logs

### Frontend can't connect to backend
- Verify `REACT_APP_BACKEND_URL` in frontend `.env`
- Check CORS settings in backend
- Ensure backend is deployed and healthy

### DNS not resolving
- Wait for DNS propagation (up to 48 hours)
- Clear DNS cache
- Verify DNS records in Hostinger

## 📝 Environment Variables

### Backend
```env
EMAIL_HOST=smtp.hostinger.com
EMAIL_PORT=465
EMAIL_SECURE=true
EMAIL_USER=your_email@ajfsindia.com
EMAIL_PASS=your_password
CONTACT_RECEIVER_EMAIL=admin@ajfsindia.com
FRONTEND_URL=https://www.ajfsindia.com
PORT=8080
NODE_ENV=production
```

### Frontend
```env
REACT_APP_BACKEND_URL=https://ajfs-backend-xxxxx-uc.a.run.app
```

## 📄 License

Copyright © 2024 AJFS Innovations Pvt Ltd. All rights reserved.

## 🤝 Support

For issues or questions:
- Email: info@ajfsindia.com
- Documentation: See DEPLOYMENT_GUIDE.md and DNS_SETUP_GUIDE.md

## 🎯 Roadmap

- [ ] Add blog section
- [ ] Implement case studies
- [ ] Add client testimonials
- [ ] Integrate analytics
- [ ] Add chatbot
- [ ] Multi-language support

---

Built with ❤️ by AJFS Innovations Team
