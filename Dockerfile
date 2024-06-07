FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN yarn install

COPY . .
RUN yarn run build

CMD [ "node", "dist/main.js" ]