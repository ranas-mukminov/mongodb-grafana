# Builder stage - build the Grafana plugin
FROM node:16-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the plugin
RUN npm run build

# Runtime stage - run the MongoDB proxy server
FROM node:16-alpine

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist/server ./server
COPY --from=builder /app/package*.json ./

# Install only production dependencies
RUN npm install --production

WORKDIR /app/server

# Expose proxy server port
EXPOSE 3333

# Start the proxy server
CMD ["node", "mongodb-proxy.js"]
