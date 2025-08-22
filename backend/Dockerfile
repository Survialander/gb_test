FROM node:22-alpine AS build
WORKDIR /workdir/app
COPY package.json .
COPY start.sh .
RUN chmod +x ./start.sh
RUN npm i

FROM build
EXPOSE 3000
WORKDIR /workdir/app
COPY . .
CMD [ "sh", "./start.sh"]
