FROM node:19-alpine

ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /webapp

COPY . .
RUN npm install --force
RUN npm run build


EXPOSE 3000
EXPOSE 3500
EXPOSE 80
EXPOSE 443

CMD ["node", "./server.js"]