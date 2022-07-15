FROM node:16.15 As development
WORKDIR /usr/src/schedule
COPY ./package*.json ./
RUN npm ci
COPY . .
RUN npx prisma generate

FROM node:16.15 As build
WORKDIR /usr/src/schedule
COPY package*.json ./
COPY --from=development /usr/src/schedule/node_modules ./node_modules
COPY . .
RUN npm run build
ENV NODE_ENV production
RUN npm ci --only=production && npm cache clean --force

FROM node:16.15 As production
COPY --from=build /usr/src/schedule/node_modules ./node_modules
COPY --from=build /usr/src/schedule/dist ./dist
EXPOSE 3000
CMD [ "node", "dist/src/server.js"]