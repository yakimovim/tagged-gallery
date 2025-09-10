# Please, build the application before running 'docker build'
FROM node:24.7.0-alpine3.21

COPY dist /app/dist

WORKDIR /app

ENTRYPOINT ["node", "./dist/server/index.js"]