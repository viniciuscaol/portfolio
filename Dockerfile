FROM node:lts-slim
WORKDIR /app
RUN npm install express
COPY . .
EXPOSE 80
CMD npm run start