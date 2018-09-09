FROM node:8.9-alpine
ENV NODE_ENV production
RUN mkdir /app
WORKDIR /app
COPY "package.json" .
COPY "package-lock.json" .
RUN npm install --production --silent
COPY . .
EXPOSE 3000
CMD node index.js