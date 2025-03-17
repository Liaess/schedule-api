app/install:
	npm run install

app/build:
	npm run build

docker/up: docker/down
	docker compose up -d

docker/down:
	docker compose down

app/start: docker/up
	npm run start

app/dev: docker/up
	npm run start:dev
