app/install:
	npm run install

app/build:
	npm run build

docker/up: docker/down
	docker compose up -d

docker/down:
	docker compose down

app/migration-run:
	npm run migration:run

app/start: docker/up app/migration-run
	npm run start

app/dev: docker/up app/migration-run
	npm run start:dev
