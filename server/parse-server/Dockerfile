FROM node:8.11-alpine

RUN npm config set unsafe-perm true
RUN ["npm", "install", "-g", "parse-server"]

ADD . .
RUN [ "npm", "install" ]
RUN [ "npm", "run", "build" ]

ENTRYPOINT [ "parse-server", "config.json" ]
