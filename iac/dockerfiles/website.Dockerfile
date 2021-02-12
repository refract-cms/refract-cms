FROM node:15 AS builder

WORKDIR /app
COPY package.json ./
COPY lerna.json ./
COPY yarn.lock ./
COPY ./website/package.json ./website/
RUN yarn install --pure-lockfile
COPY ./website/ ./website/

WORKDIR /app/website/
RUN yarn build

FROM nginx:1.12-alpine

COPY --from=builder /app/website/build /etc/nginx/html
COPY --from=builder /app/website/nginx.conf /etc/nginx/nginx.conf

EXPOSE 80