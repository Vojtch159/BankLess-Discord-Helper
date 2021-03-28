# Create a lightweight node image
FROM node:lts-alpine

# Create the directory for bot
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Copy package.json & install dependencies
COPY package.json /usr/src/bot
RUN npm install

# Copy all files to bot directory
COPY . /usr/src/bot

# Building from Typescript to Javascript
RUN npm run build

# Start bot
CMD ["node", "./out/main.js"]