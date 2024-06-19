# Atenção, este Dockerfile foi feito para ser usado em containers com ALPINE, outras versões de linux podem ser incompativeis
# Use a versão do NGINX especificada ou use uma versão padrão
ARG NGINX_VERSION=${NGINX_VERSION}
FROM nginx

# Copia o arquivo de configuração nginx.conf personalizado para o contêiner
COPY nginx/nginx.conf /etc/nginx/

# Atualiza e instala os pacotes necessários
# certbot certbot-nginx são os responsáveis pela geração de HTTPS
RUN apt update && apt upgrade && \
    apt install openssl -y && \
    apt install certbot -y

# Remove a configuração padrão do NGINX
RUN rm -rf /etc/nginx/conf.d/default.conf

# add user www-data
RUN adduser -D -H -u 1000 -s /bin/bash www-data -G www-data

# Cria diretórios para o conteúdo do site e dá suas respectivas permissões
RUN mkdir -p /var/www && \
    chown -R www-data:www-data /var/www && \
    chmod 755 -R /var/www

# Cria diretórios para as configurações do NGINX
RUN mkdir -p /etc/nginx/sites-available /etc/nginx/conf.d && \
    chown -R www-data:www-data /etc/nginx/sites-available /etc/nginx/conf.d

# Define o diretório de trabalho para o NGINX
WORKDIR /etc/nginx

# Inicia o NGINX quando o contêiner é executado
CMD ["nginx", "-g", "daemon off;"]