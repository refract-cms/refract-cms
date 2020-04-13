FROM node:10 as build-deps

WORKDIR /usr/src/app

COPY ./package*.json ./
RUN npm install --verbose
COPY . .

CMD npm start 