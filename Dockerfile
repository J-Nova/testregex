FROM node:19-alpine

ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /webapp

COPY /webapp .
RUN npm install
RUN npm run build

RUN sudo iptables -t filter -A INPUT -p tcp --dport 443 -j ACCEPT
RUN sudo iptables -t filter -A INPUT -p tcp --dport 80 -j ACCEPT

EXPOSE 1500
EXPOSE 3000

CMD ["node", "./server/server.js"]