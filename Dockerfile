FROM node:18

ENV TZ=Europe/Amsterdam
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

WORKDIR /webapp

COPY /webapp /
EXPOSE 3000

CMD ["node", "/build/index.js"]
