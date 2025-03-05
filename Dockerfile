FROM node:20.18-alpine AS base

WORKDIR /app
COPY package.json yarn.lock ./
RUN apk add --no-cache git \
    && yarn --frozen-lockfile \
    && yarn cache clean

FROM node:20.18-alpine AS build

WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .
RUN apk add --no-cache curl git nodejs npm \
    && yarn build \
    && cd .next/standalone \
    && yarn cache clean \
    && npm cache clean --force

FROM node:20.18-alpine AS production

WORKDIR /app

COPY --from=build /app/public ./public
COPY --from=build /app/next.config.ts ./

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static

EXPOSE 3000

CMD ["node", "server.js"]
