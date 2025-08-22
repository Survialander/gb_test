FROM node:22-alpine AS build
WORKDIR /app
COPY package.json .
RUN npm i

FROM build
WORKDIR /app
COPY . .
EXPOSE 5173
CMD [ "npm", "run", "dev" ]
