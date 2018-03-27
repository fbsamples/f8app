FROM node:8.4-alpine

ADD . .
RUN ["npm", "install"]
RUN ["npm", "run", "build"]

ENTRYPOINT [ "node", "lib/index.js" ]
