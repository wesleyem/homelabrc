# syntax=docker/dockerfile:latest

# Stage 1: Build the Angular app
FROM node:22-alpine AS base

# Set the working directory
WORKDIR /app

# Install pnpm globally and necessary build dependencies
RUN apk add --no-cache libc6-compat && npm install -g pnpm

COPY pnpm-lock.yaml ./
RUN pnpm fetch

FROM base AS build

COPY . /app

RUN pnpm install -r --offline
RUN pnpm run build

FROM nginx:latest

RUN rm /usr/share/nginx/html/*

# Set the working directory
WORKDIR /app

# Copy the built files from the build stage
COPY --from=build /app/dist/homelabrc /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 3333

CMD ["nginx", "-g", "daemon off;"]
