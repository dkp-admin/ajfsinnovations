# Stage 1: Build the React application
FROM node:18-alpine as builder

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies (including dev dependencies for build)
RUN npm ci

# Copy source code
COPY . ./

# Build the application
RUN npm run build

# Stage 2: Serve the React application with Nginx
FROM nginx:alpine

# Copy built assets from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 8080 for Cloud Run
EXPOSE 8080

# Cloud Run sets PORT env variable
ENV PORT 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
