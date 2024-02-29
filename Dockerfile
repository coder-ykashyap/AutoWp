FROM ghcr.io/puppeteer/puppeteer:latest # pulls the latest

ENV PUPPETEER_SKIP_DOWNLOAD=true \ 
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /usr/src/app

COPY package*.json ./ 
RUN npm ci

COPY . .

CMD ["node" ,"index.js"]