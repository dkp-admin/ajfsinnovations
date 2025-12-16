#!/bin/bash

# AJFS Innovations - GCP Cloud Run Deployment Script
# This script automates the deployment of frontend and backend to Google Cloud Run

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_header() {
    echo -e "\n${BLUE}==================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}==================================${NC}\n"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Function to prompt user for input
prompt_user() {
    local prompt_text="$1"
    local default_value="$2"
    local user_input
    
    if [ -z "$default_value" ]; then
        read -p "${YELLOW}${prompt_text}${NC}: " user_input
    else
        read -p "${YELLOW}${prompt_text}${NC} [${default_value}]: " user_input
        user_input=${user_input:-$default_value}
    fi
    
    echo "$user_input"
}

# ============================================
# Validation
# ============================================

print_header "AJFS Innovations - Cloud Run Deployment"

# Check for required tools
echo "Checking prerequisites..."

if ! command_exists gcloud; then
    print_error "gcloud CLI not found. Please install it first:"
    echo "https://cloud.google.com/sdk/docs/install"
    exit 1
fi
print_success "gcloud CLI found"

if ! command_exists docker; then
    print_error "Docker not found. Please install it first:"
    echo "https://docs.docker.com/get-docker/"
    exit 1
fi
print_success "Docker found"

# ============================================
# Configuration
# ============================================

print_header "Configuration"

# Get or validate project ID
PROJECT_ID=$(gcloud config get-value project 2>/dev/null)

if [ -z "$PROJECT_ID" ]; then
    print_warning "No GCP project configured"
    PROJECT_ID=$(prompt_user "Enter your GCP Project ID" "")
    gcloud config set project "$PROJECT_ID"
else
    print_success "GCP Project: $PROJECT_ID"
fi

# Region selection
REGION=$(prompt_user "Enter GCP Region" "us-central1")

# Backend configuration
print_header "Backend Configuration"

BACKEND_SERVICE_NAME=$(prompt_user "Backend service name" "ajfs-backend")
EMAIL_HOST=$(prompt_user "Email host (SMTP)" "smtp.hostinger.com")
EMAIL_PORT=$(prompt_user "Email port" "465")
EMAIL_SECURE=$(prompt_user "Email secure (true/false)" "true")
EMAIL_USER=$(prompt_user "Email username/address" "ajith4uuu@ajfsindia.com")
read -s -p "${YELLOW}Email password${NC}: " EMAIL_PASS
echo
CONTACT_RECEIVER_EMAIL=$(prompt_user "Contact receiver email" "dkp@ajfsindia.com")

# Frontend configuration
print_header "Frontend Configuration"

FRONTEND_SERVICE_NAME=$(prompt_user "Frontend service name" "ajfs-frontend")

# Deployment type
print_header "Deployment Options"
echo "1) Deploy both frontend and backend"
echo "2) Deploy only backend"
echo "3) Deploy only frontend"

DEPLOY_OPTION=$(prompt_user "Select deployment option" "1")

# ============================================
# Enable Required APIs
# ============================================

print_header "Enabling Required APIs"

apis=(
    "cloudbuild.googleapis.com"
    "run.googleapis.com"
    "containerregistry.googleapis.com"
    "artifact-registry.googleapis.com"
)

for api in "${apis[@]}"; do
    echo "Enabling $api..."
    gcloud services enable "$api" --project="$PROJECT_ID" 2>/dev/null || true
done

print_success "APIs enabled"

# ============================================
# Configure Docker Authentication
# ============================================

print_header "Configuring Docker"

gcloud auth configure-docker gcr.io --quiet
gcloud auth configure-docker "${REGION}"-docker.pkg.dev --quiet 2>/dev/null || true

print_success "Docker authentication configured"

# ============================================
# Deploy Backend
# ============================================

if [[ "$DEPLOY_OPTION" == "1" || "$DEPLOY_OPTION" == "2" ]]; then
    print_header "Deploying Backend"
    
    cd backend
    
    # Use gcloud run deploy with direct configuration
    echo "Building and deploying backend service..."
    
    gcloud run deploy "$BACKEND_SERVICE_NAME" \
        --source . \
        --region "$REGION" \
        --platform managed \
        --allow-unauthenticated \
        --set-env-vars \
            EMAIL_HOST="$EMAIL_HOST",\
            EMAIL_PORT="$EMAIL_PORT",\
            EMAIL_SECURE="$EMAIL_SECURE",\
            EMAIL_USER="$EMAIL_USER",\
            EMAIL_PASS="$EMAIL_PASS",\
            CONTACT_RECEIVER_EMAIL="$CONTACT_RECEIVER_EMAIL",\
            FRONTEND_URL="https://www.ajfsindia.com",\
            NODE_ENV=production \
        --memory 512Mi \
        --cpu 1 \
        --min-instances 0 \
        --max-instances 10 \
        --timeout 60 \
        --project="$PROJECT_ID" \
        --quiet
    
    # Get backend URL
    BACKEND_URL=$(gcloud run services describe "$BACKEND_SERVICE_NAME" \
        --region "$REGION" \
        --format='value(status.url)' \
        --project="$PROJECT_ID")
    
    print_success "Backend deployed: $BACKEND_URL"
    
    cd ..
else
    print_warning "Backend deployment skipped"
fi

# ============================================
# Deploy Frontend
# ============================================

if [[ "$DEPLOY_OPTION" == "1" || "$DEPLOY_OPTION" == "3" ]]; then
    print_header "Deploying Frontend"
    
    cd frontend
    
    # Use gcloud run deploy with direct configuration
    echo "Building and deploying frontend service..."
    
    BACKEND_URL="${BACKEND_URL:-$(gcloud run services describe "$BACKEND_SERVICE_NAME" --region "$REGION" --format='value(status.url)' --project="$PROJECT_ID" 2>/dev/null || echo '')}"
    
    if [ -z "$BACKEND_URL" ]; then
        BACKEND_URL=$(prompt_user "Backend URL" "https://ajfs-backend-xxxxx-uc.a.run.app")
    fi
    
    gcloud run deploy "$FRONTEND_SERVICE_NAME" \
        --source . \
        --region "$REGION" \
        --platform managed \
        --allow-unauthenticated \
        --set-env-vars REACT_APP_BACKEND_URL="$BACKEND_URL" \
        --memory 256Mi \
        --cpu 1 \
        --min-instances 0 \
        --max-instances 10 \
        --timeout 60 \
        --project="$PROJECT_ID" \
        --quiet
    
    # Get frontend URL
    FRONTEND_URL=$(gcloud run services describe "$FRONTEND_SERVICE_NAME" \
        --region "$REGION" \
        --format='value(status.url)' \
        --project="$PROJECT_ID")
    
    print_success "Frontend deployed: $FRONTEND_URL"
    
    cd ..
else
    print_warning "Frontend deployment skipped"
fi

# ============================================
# Update Backend with Frontend URL
# ============================================

if [[ "$DEPLOY_OPTION" == "1" ]]; then
    print_header "Updating Backend Configuration"
    
    echo "Updating backend with frontend URL..."
    
    gcloud run services update "$BACKEND_SERVICE_NAME" \
        --region "$REGION" \
        --update-env-vars FRONTEND_URL="$FRONTEND_URL" \
        --project="$PROJECT_ID" \
        --quiet
    
    print_success "Backend configuration updated"
fi

# ============================================
# Summary
# ============================================

print_header "Deployment Summary"

if [[ "$DEPLOY_OPTION" == "1" || "$DEPLOY_OPTION" == "2" ]]; then
    echo -e "Backend Service: ${GREEN}$BACKEND_SERVICE_NAME${NC}"
    echo -e "Backend URL: ${GREEN}$BACKEND_URL${NC}"
fi

if [[ "$DEPLOY_OPTION" == "1" || "$DEPLOY_OPTION" == "3" ]]; then
    echo -e "Frontend Service: ${GREEN}$FRONTEND_SERVICE_NAME${NC}"
    echo -e "Frontend URL: ${GREEN}$FRONTEND_URL${NC}"
fi

echo -e "Region: ${GREEN}$REGION${NC}"
echo -e "Project: ${GREEN}$PROJECT_ID${NC}"

# ============================================
# Testing
# ============================================

print_header "Next Steps"

echo "1. Verify your deployment:"

if [[ "$DEPLOY_OPTION" == "1" || "$DEPLOY_OPTION" == "2" ]]; then
    echo "   Backend health check:"
    echo "   curl ${BACKEND_URL}/health"
fi

if [[ "$DEPLOY_OPTION" == "1" || "$DEPLOY_OPTION" == "3" ]]; then
    echo "   Open frontend in browser:"
    echo "   ${FRONTEND_URL}"
fi

echo ""
echo "2. View logs:"

if [[ "$DEPLOY_OPTION" == "1" || "$DEPLOY_OPTION" == "2" ]]; then
    echo "   gcloud run logs read $BACKEND_SERVICE_NAME --region $REGION --limit 50 --follow"
fi

if [[ "$DEPLOY_OPTION" == "1" || "$DEPLOY_OPTION" == "3" ]]; then
    echo "   gcloud run logs read $FRONTEND_SERVICE_NAME --region $REGION --limit 50 --follow"
fi

echo ""
echo "3. For custom domain setup, see GCP_CLOUD_RUN_DEPLOYMENT.md"

print_success "Deployment complete!"
