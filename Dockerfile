FROM node:latest

WORKDIR /webapp
EXPOSE 3000
EXPOSE 3500

COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm install

COPY . ./
RUN npm run build

ENTRYPOINT ./entrypoint.sh


