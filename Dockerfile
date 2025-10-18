#STAGE: 1

FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++ bash

WORKDIR /app

COPY package.json package-lock.json* yarn.lock* pnpm-lock.yaml* ./

RUN npm ci --silent

COPY . .

RUN npm run build --prod

# STAGE: 2
FROM nginx:stable-alpine as runner

RUN rm -fr /usr/share/nginx/html/*

COPY --from=builder /app/dist/oye-colombia/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \ 
    CMD wget -q --spider http://localhost:80 || exit 1

CMD ["nginx", "-g", "daemon off;"]