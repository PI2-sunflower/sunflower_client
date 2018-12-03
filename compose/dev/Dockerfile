FROM node:8-alpine

RUN mkdir -p /frontapp
WORKDIR /frontapp

COPY package.json /frontapp/package.json
COPY yarn.lock /frontapp/yarn.lock

RUN yarn global add @vue/cli@3.2.1
RUN yarn install

COPY . /frontapp
