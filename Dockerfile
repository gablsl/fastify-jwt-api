FROM node:latest

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

RUN prisma generate

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start" ]