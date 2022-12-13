FROM node:19-alpine as builder

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:1.23.2-alpine as runner

## add nginx resources
COPY .nginx/nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist/organizer-ui /usr/share/nginx/html

EXPOSE 80

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/dynamic-env.template.js > /usr/share/nginx/html/assets/dynamic-env.js && exec nginx -g 'daemon off;'"]
