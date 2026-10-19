.PHONY: test build dev

test:
	npm run typecheck
	npm run test:run
	npm run build

build:
	npm run build

dev:
	npm run dev
