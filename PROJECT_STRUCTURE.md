# AJFS Innovations Website - Complete Project Structure

## Overview
This project consists of two main applications:
1. Frontend (React) - deployed to Cloud Run
2. Backend (Node.js/Express) - deployed to Cloud Run

## Directory Structure
```
ajfs-innovations/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.js
│   │   │   ├── Header.css
│   │   │   ├── Footer.js
│   │   │   ├── Footer.css
│   │   │   ├── ServiceCard.js
│   │   │   ├── ServiceCard.css
│   │   │   ├── TeamMemberCard.js
│   │   │   └── TeamMemberCard.css
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Services.js
│   │   │   ├── Services.css
│   │   │   ├── Team.js
│   │   │   ├── Team.css
│   │   │   ├── Contact.js
│   │   │   └── Contact.css
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── cloudbuild.yaml
│   ├── package.json
│   └── .env.example
├── backend/
│   ├── server.js
│   ├── Dockerfile
│   ├── .dockerignore
│   ├── cloudbuild.yaml
│   ├── package.json
│   ├── .env
│   └── .env.example
└── docs/
    ├── DEPLOYMENT.md
    └── DNS_SETUP.md
```

## Deployment Order
1. Set up backend first
2. Deploy backend to Cloud Run
3. Update frontend with backend URL
4. Deploy frontend to Cloud Run
5. Configure DNS settings
