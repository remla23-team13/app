# Dockerfile

FROM node:alpine 

WORKDIR /app

COPY . .

ARG token

ENV NODE_AUTH_TOKEN=${token}

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]