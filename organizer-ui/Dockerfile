FROM node:19.2-alpine3.16 as builder

WORKDIR /app
COPY ./ .

RUN npm install
RUN npm run build --prod

FROM nginx:1.23.2-alpine as runner

## add nginx resources
COPY .nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/organizer-ui /usr/share/nginx/html

EXPOSE 80
