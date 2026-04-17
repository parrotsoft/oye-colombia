# ============ STAGE 1: Setup ============

FROM node:20-alpine AS builder

LABEL org.opencontainers.image.title="Oye Colombia"

ARG BUILD_CONFIGURATION=production
ARG APP_NAME=oye-colombia

RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN npm ci --silent

COPY . .

RUN npx ng build --configuration "${BUILD_CONFIGURATION}"

RUN ls -1 dist/${APP_NAME}/browser || (echo "Ruta dist/${APP_NAME}/browser no encontrada" && exit 1)

# ============ STAGE 2: Runtime Nginx ============
FROM nginx:stable-alpine AS runner

ARG APP_NAME=oye-colombia

RUN apk add --no-cache curl

COPY --from=builder /app/dist/${APP_NAME}/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -fsS http://localhost:80/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
