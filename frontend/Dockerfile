# Stage 1: Build
FROM node:18-alpine AS build

WORKDIR /src

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

COPY --from=build /src/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
