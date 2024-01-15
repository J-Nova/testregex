FROM node:latest

ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /webapp

COPY . .
RUN npm install
RUN npm run build


EXPOSE 3000
EXPOSE 3500
EXPOSE 80
EXPOSE 443

CMD ["node", "./server/server.js"]