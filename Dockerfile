FROM node:latest

WORKDIR /webapp
EXPOSE 3000
EXPOSE 3500

COPY ./package.json .
RUN npm install --no-audit --force 

COPY . .
RUN npm run build

ENTRYPOINT [ "entrypoint.sh" ]


