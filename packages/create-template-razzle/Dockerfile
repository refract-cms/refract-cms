FROM node:15

COPY package*.json ./

RUN npm ci

COPY ./ ./
RUN npm run build

RUN npm prune --production

CMD ["npm", "run", "start:prod"]