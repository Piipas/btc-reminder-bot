FROM node:latest

RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# install pnpm globally
RUN npm install -g pnpm

COPY . /usr/src/bot

# install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile

# migrate updates to database
# RUN pnpm run deploy

# build the app files
RUN pnpm run build

CMD node --env-file=.env dist/index.js