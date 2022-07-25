FROM mysql/mysql-server:8.0.21

ENV TZ=Asia/Tokyo \
  MYSQL_DATABASE=laravel \
  MYSQL_USER=laravel \
  MYSQL_PASSWORD=laravel \
  MYSQL_ROOT_PASSWORD=secret

# 権限で転けることがあるのでちゃんと設定しておく
# MEMO: BuildKitを使うと、COPYに--chmodオプションが生えている
COPY ./docker/mysql/my.cnf /etc/my.cnf
RUN chmod 644 /etc/my.cnf
