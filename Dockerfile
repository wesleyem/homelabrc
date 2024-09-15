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
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store pnpm install

# Copy the rest of the source code
COPY . .

# Build the Angular app
RUN pnpm run build

# Stage 2: Set up Node.js server
FROM node:18-alpine AS runtime

# Set the working directory
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist /app/dist

# Expose the port for the web app
ENV PORT=3333
EXPOSE ${PORT}

# Start the Node.js server
CMD ["node", "/app/dist/homelabrc/server/server.mjs"]
