FROM node:18

WORKDIR /reactwithdocker

COPY package* .

RUN npm install

COPY . .

EXPOSE 5173

CMD [ "npm","run","dev"]