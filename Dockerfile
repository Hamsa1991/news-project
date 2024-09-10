# Use the official PHP image
FROM php:8.1-fpm

# Set the working directory
WORKDIR /var/www

# Install necessary PHP extensions
RUN docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Install system dependencies
RUN apt-get update && apt-get install -y libpng-dev libjpeg-dev libfreetype6-dev libzip-dev && \
    docker-php-ext-configure gd --with-freetype --with-jpeg && \
    docker-php-ext-install gd zip

# Copy the Laravel project files
COPY . .

# Install Laravel dependencies
RUN composer install

# Expose port 9000
EXPOSE 9000

CMD ["php-fpm"]
