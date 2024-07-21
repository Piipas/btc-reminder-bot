FROM node:latest

# create workspace
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# install pnpm globally
RUN npm install -g pnpm

# copy app files to workspace
COPY . /usr/src/bot

# install dependencies with frozen lockfile
RUN pnpm install --frozen-lockfile

# migrate updates to database
RUN pnpm run migrate

# build time env variables
ARG DATABASR_URL
ARG DIRECT_URL

# build the app files
RUN pnpm run build

# final command
CMD ["node" "dist/index.js"]