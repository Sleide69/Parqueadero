FROM nginx:stable-alpine

# Elimina archivos por defecto de nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia tu build de Vue
COPY dist/ /usr/share/nginx/html

# Copia tu configuración personalizada de nginx
COPY nginx.conf /etc/nginx/nginx.conf
