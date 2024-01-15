FROM node:latest

WORKDIR /webapp
EXPOSE 3000
EXPOSE 3500
CMD ["node", "./server/server.js"]

COPY ./package.json .
RUN npm install --no-audit --force 

COPY . .
RUN npm run build



