# ===== 1. Build React frontend =====
FROM node:20 AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend ./
RUN npm run build

# ===== 2. Build and run Node backend =====
FROM node:20
WORKDIR /app

# Copy backend files
COPY server/package*.json ./server/
WORKDIR /app/server
RUN npm install --omit=dev

# Copy server code and built frontend
COPY server ./ 
COPY --from=build-frontend /app/frontend/dist ./public

# Expose backend port
EXPOSE 4000

# Start the API server
CMD ["node", "server.js"]
