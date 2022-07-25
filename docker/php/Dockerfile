# MEMO: contextはrotディレクトリにある想定で記載
FROM php:8.1-fpm
ENV WORKDIR=/var/www/html
WORKDIR $WORKDIR

ENV COMPOSER_ALLOW_SUPERUSER=1 \
  COMPOSER_HOME=/composer

ARG UID=1000
ARG GID=1000

COPY --from=composer:2.3.9 /usr/bin/composer /usr/bin/composer

RUN apt-get update && \
  apt-get -y install git libicu-dev libonig-dev libzip-dev unzip locales libmemcached-dev && \
  apt-get clean && \
  rm -rf /var/lib/apt/lists/* && \
  mkdir /var/run/php-fpm && \
  mkdir -p /tmp/cache/views && \
  chmod 777 -R /tmp/cache && \
  docker-php-ext-install intl pdo pdo_mysql zip bcmath && \
  composer config -g process-timeout 3600 && \
  composer config -g repos.packagist composer https://packagist.org

RUN pecl install memcached \
  && docker-php-ext-enable memcached

COPY ./docker/php/php.ini /usr/local/etc/php/
# confを上書き。余計なlog出さないように、access.logを変更している
COPY ./docker/php/docker.conf /usr/local/etc/php-fpm.d
COPY ./backend/composer.json ${WORKDIR}/
COPY ./backend/composer.lock ${WORKDIR}/

COPY ./backend ${WORKDIR}/

RUN composer install --no-progress
# php-fpmのuserが書き込むディレクトリに権限つけておく
RUN chmod -R a+w storage/ bootstrap/cache

# 引数で渡したgroupidとuseridをwww-dataに適用
RUN groupmod -o -g $GID www-data \
  && usermod -o -u $UID -g www-data www-data
