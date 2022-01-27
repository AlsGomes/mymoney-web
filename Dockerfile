FROM node:16.13.1
ENV NODE_ENV=production

COPY dist dist
COPY server.js server.js
COPY package.json package.json

EXPOSE 4200

RUN npm install --production

CMD [ "node", "server.js" ]