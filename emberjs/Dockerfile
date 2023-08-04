FROM node:14

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm install -g ember-cli

COPY . ./

EXPOSE 4200

ENTRYPOINT ["ember", "serve", "--proxy", "http://portfolio-manager-backend-identifier-1"]