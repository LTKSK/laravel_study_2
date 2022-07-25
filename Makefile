MAKEFILE_DIR:=$(dir $(abspath $(lastword $(MAKEFILE_LIST))))

# laravelというディレクトリをbackendに作成する
init_laravel:
	docker run --rm -it -v ${MAKEFILE_DIR}:/var/www/html laravel_initializer

build_initializer:
	docker build -t laravel_initializer ./scripts/init

.PHONY: build_initializer init_laravel

