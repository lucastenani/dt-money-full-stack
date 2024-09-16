# Base image
FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3333

RUN npm run knex migrate:latest 
RUN npm run build
CMD ["node", "dist/server.js"]
