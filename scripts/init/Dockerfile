FROM php:8.1.8-fpm

ENV WORKDIR=/var/www/html
WORKDIR $WORKDIR

ENV COMPOSER_ALLOW_SUPERUSER=1

COPY --from=composer:2.3.9 /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
  apt-get -y install git

RUN composer config -g process-timeout 3600 && \
  composer config -g repos.packagist composer https://packagist.org

CMD ["composer", "create-project", "laravel/laravel", "backend"]