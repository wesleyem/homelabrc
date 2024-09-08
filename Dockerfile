# syntax=docker/dockerfile:latest

# Stage 1: Build the Angular app
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Install pnpm globally and necessary build dependencies
RUN apk add --no-cache libc6-compat && npm install -g pnpm

# Cache pnpm store to speed up dependencies installation
COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm fetch
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm install --offline

# Copy the rest of the source code
COPY . .

# Build the Angular app
RUN pnpm run build

# Stage 2: Serve the app using Nginx
FROM nginx:alpine

# remove nginx landing page
RUN rm /usr/share/nginx/html/index.html \
  && mkdir config

# Copy the built Angular app from the build stage to the Nginx folder
COPY --from=build /app/dist/homelabrc /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port for the web app
ENV PORT=3333
EXPOSE ${PORT}

# Add a healthcheck to monitor the running app
HEALTHCHECK --interval=30s --timeout=10s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:${PORT}/ || exit 1

# Start Nginx to serve the app
CMD ["nginx", "-g", "daemon off;"]
