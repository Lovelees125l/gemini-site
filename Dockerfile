# Використовуємо офіційний образ Nginx
FROM nginx:alpine

# Копіюємо твій index.html у папку, з якої Nginx роздає контент
COPY index.html /usr/share/nginx/html/index.html

# Відкриваємо 80 порт
EXPOSE 80