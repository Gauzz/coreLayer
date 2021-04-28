FROM node:lts-alpine3.10
WORKDIR /cfu-core
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../cfu-core
COPY . /cfu-core
EXPOSE 8001
RUN npm install pm2 -g
ENV PM2_PUBLIC_KEY wmp19bpm94r3htq
ENV PM2_SECRET_KEY 4436hllu2z8nuad

CMD ["pm2-runtime", "index.js", "--name", "cfu-core", "--output", "/var/log/cfu-core/cfu-core-output.log", "--error", "/var/log/cfu-core/cfu-core-error.log"]
