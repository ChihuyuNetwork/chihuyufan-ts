FROM 18.16.0-alpine as builder
WORKDIR /opt
COPY package.json .
RUN npm i
COPY tsconfig.json .
COPY src ./src
RUN npm run compile

FROM node:18.16.18-bullseye-slim
WORKDIR /opt
ENV NODE_ENV="production"
COPY package.json .
RUN npm i
COPY --from=builder /opt/opt /opt/opt
CMD ["npm", "start"]
