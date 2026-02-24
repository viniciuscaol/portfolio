FROM node:20-slim

WORKDIR /app

# Instala a dependência de compressão que adicionamos ao código
RUN npm install express compression prom-client

COPY . .

EXPOSE 80

CMD ["node", "server.js"]