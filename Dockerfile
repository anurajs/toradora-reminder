FROM node:18-alpine3.18
WORKDIR /home/app
COPY package.json package-lock.json index.js  ./
ENV NODE_ENV=PRODUCTION
RUN npm ci
USER node
ENV NODE_ENV=PRODUCTION
CMD npm run start