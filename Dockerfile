FROM node:19.8-buster-slim

ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /webapp

COPY /webapp /
EXPOSE 3000
RUN npm install node

CMD ["node", "/build/index.js"]
