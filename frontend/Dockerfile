FROM node:22-alpine as build
WORKDIR /app
COPY package.json .
RUN npm i

FROM build
WORKDIR /app
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]
