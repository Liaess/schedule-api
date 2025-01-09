app/install:
	yarn

app/build:
	yarn build

docker/up: docker/down
	docker compose up -d

docker/down:
	docker compose down

app/start: app/build docker/up
	yarn start

app/dev: app/build docker/up
	yarn start:dev
