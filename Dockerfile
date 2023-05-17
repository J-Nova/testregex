FROM node:19-alpine

ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /webapp

COPY /webapp .
RUN npm install
RUN npm run build

EXPOSE 1500
EXPOSE 3000

CMD ["node", "./server/server.js"]