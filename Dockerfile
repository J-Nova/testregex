FROM node:latest

ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /webapp

COPY . .
RUN mkdir node_modules

RUN npm ci --no-audit --force && \
    npm run build



EXPOSE 3000
EXPOSE 3500

CMD ["node", "./server/server.js"]