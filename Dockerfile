FROM node:lts-alpine AS build-stage

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

RUN yarn build

FROM nginx:latest AS production-stage

RUN mkdir /app

# Copy files to nginx html folder
COPY --from=build-stage /app/build /app

COPY nginx/default.conf /etc/nginx/nginx.conf
COPY nginx/ssl/ssl_bundle.crt /etc/nginx/ssl/ssl_bundle.crt
COPY nginx/ssl/private.key /etc/nginx/ssl/private.key
