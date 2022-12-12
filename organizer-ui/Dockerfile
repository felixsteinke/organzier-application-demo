#FROM node:16.14-alpine as builder
#
#WORKDIR /app
#COPY ./ .
#
#RUN npm install
#RUN npm run build --prod

FROM nginx:1.23.2-alpine as runner

## add nginx resources
COPY .nginx/nginx.conf /etc/nginx/nginx.conf
COPY dist/organizer-ui /usr/share/nginx/html
#COPY --from=builder /app/dist/dlm-web-maintenance /usr/share/nginx/html

EXPOSE 80
