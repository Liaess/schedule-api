app/install:
	npm run install

app/build:
	npm run build

docker/up: docker/down
	docker compose up -d

docker/down:
	docker compose down

app/start: app/build docker/up
	npm run start

app/migration-run:
	npm run migration:run

app/dev: docker/up app/migration-run
	npm run start:dev
