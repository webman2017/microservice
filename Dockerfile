FROM node:18-alpine as builder

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

FROM node:18-alpine as production

# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}

WORKDIR /app

COPY package*.json .

RUN npm ci

COPY --from=builder /app/dist ./dist

EXPOSE 9090

ENV PORT 9090

ENV TZ Asia/Bangkok

CMD ["node", "dist/index.js"]