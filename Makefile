.PHONY: setup \
		run \
		lint \
		eslint \
		help


setup: ## Install dependencies
	echo "Installing dependencies..."
	pnpm install


run: ## Run the application
	echo "Run the application with the command: pnpm dev"
	pnpm dev

lint: ## Format code with Prettier
	npx prettier --write .


eslint: ## Run ESLint check
	pnpm lint


help: ## Show help for each make target
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) \
		| sort \
		| awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-18s\033[0m %s\n", $$1, $$2}'
