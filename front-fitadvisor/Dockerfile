FROM node AS builder

WORKDIR /app
COPY ./ /app

RUN npm install
RUN npm run build

FROM nginx:1.15
COPY --from=builder /app/build/ /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf