FROM node:22.8
WORKDIR /
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
CMD ["yarn", "start"]
