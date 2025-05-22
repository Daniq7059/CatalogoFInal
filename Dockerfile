# Etapa 1: Construcción del frontend
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.ts ./
COPY . .

RUN npm install
RUN npm run build

# Etapa 2: Producción (backend + frontend compilado)
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app/dist ./dist
COPY --from=build /app/media ./media
COPY --from=build /app/server.mjs .
COPY --from=build /app/package*.json ./
COPY .env .env

RUN npm install --production

EXPOSE 5000

CMD ["node", "server.mjs"]