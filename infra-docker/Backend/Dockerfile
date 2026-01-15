# =========================
# Build backend (NestJS)
# =========================
FROM node:20-alpine AS backend-builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# =========================
# Runtime backend
# =========================
FROM node:20-alpine AS backend-runner

WORKDIR /app

COPY --from=backend-builder /app/package*.json ./
COPY --from=backend-builder /app/node_modules ./node_modules
COPY --from=backend-builder /app/dist ./dist

EXPOSE 3001
CMD ["node", "dist/main.js"]
