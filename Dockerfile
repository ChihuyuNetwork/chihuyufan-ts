FROM node:18.12.1-bullseye as builder
WORKDIR /opt
COPY package.json .
RUN npm i
COPY tsconfig.json .
COPY src ./src
RUN npm run compile

FROM node:18.12.1-bullseye-slim
WORKDIR /opt
ENV NODE_ENV="production"
COPY package.json .
RUN npm i
COPY --from=builder /opt/opt /opt/opt
CMD ["npm", "start"]
