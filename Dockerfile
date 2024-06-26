FROM node:21.7.3-alpine3.18 as builder
WORKDIR /opt
COPY package.json .
RUN npm i
COPY tsconfig.json .
COPY src ./src
RUN npm run compile

FROM node:21.7.3-alpine3.18
WORKDIR /opt
ENV NODE_ENV="production"
COPY package.json .
RUN npm i
COPY --from=builder /opt/opt /opt/opt
CMD ["npm", "start"]
