FROM nginx:1.19.6-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY dist/mymoney-web/* /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 4200