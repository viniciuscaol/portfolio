FROM nginx
COPY . /usr/share/nginx/html
RUN npm install express
EXPOSE 80