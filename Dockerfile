FROM node:16.15
WORKDIR /usr/src/schedule
COPY ./package*.json ./
COPY ./prisma ./prisma
RUN npm install
COPY . .
CMD [ "npm", "run", "dev" ]