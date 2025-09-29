.PHONY: up
up:
	docker-compose up -d

.PHONY: up
up-build:
	docker-compose up -d --build

.PHONY: down
down:
	docker-compose down