FROM node:19-alpine
WORKDIR /app
EXPOSE 3000

COPY package.json package.json
RUN yarn install
COPY . .

CMD ["yarn", "start"]
