FROM mhart/alpine-node:base

# create app directory

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ADD . .

CMD ["node", "run.js"]