FROM gcr.io/distroless/nodejs18-debian11 as builder
WORKDIR /opt
COPY package.json .
RUN npm i
COPY src ./src
RUN npm run compile

FROM gcr.io/distroless/nodejs18-debian11
WORKDIR /opt
ENV NODE_ENV="production"
COPY package.json .
RUN npm i
COPY --from=builder /opt/opt /opt/opt
CMD ["npm", "start"]
