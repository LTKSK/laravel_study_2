FROM mysql:8.0.21

# 権限で転けることがあるのでちゃんと設定しておく
# MEMO: BuildKitを使うと、COPYに--chmodオプションが生えている
COPY ./my.cnf /etc/my.cnf
RUN chmod 644 /etc/my.cnf
