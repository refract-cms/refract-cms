FROM node:10 as build-deps

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm ci
COPY . .
WORKDIR /usr/src/app
RUN npm run build

CMD npm run start:prod
