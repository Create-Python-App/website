# ⚙️ Project Configuration

The application has been bootstrapped using Create Python App to provide a simple and modern Python project structure. It allows developers to quickly create applications without dealing with complicated manual tooling setup.

A well-configured project improves maintainability, consistency, and collaboration. The following tools and practices should be configured and used throughout the project.

## uv

uv is a fast Python package and project manager that handles dependency management, virtual environments, Python versions, and project setup.

It replaces traditional workflows that require multiple separate tools by providing one unified solution for managing Python projects.

uv can be used to:

- Create new projects
- Manage Python versions
- Create and manage virtual environments
- Install and update dependencies
- Run project commands

Initialize a new project:

```bash
uv init
````

Add a dependency:

```bash
uv add package-name
```

Run a command inside the project environment:

```bash
uv run command
```

Using uv ensures that all developers use consistent dependencies and project configuration.

## pyproject.toml

The `pyproject.toml` file is the central configuration file for modern Python projects.

It contains important project information including:

* Project metadata
* Python version requirements
* Dependencies
* Build configuration
* Tool configuration

Example:

```toml
[project]
name = "example-project"
version = "0.1.0"
requires-python = ">=3.12"

dependencies = [
    "package-name"
]
```

Keeping dependencies inside `pyproject.toml` makes the project easier to install, maintain, and reproduce across different environments.

When adding or removing packages, use uv commands to update the configuration instead of manually editing dependency files.

## Environment Variables

Environment variables store configuration values that should not be directly written inside the source code.

They are commonly used for:

* API keys
* Database credentials
* Secret tokens
* External service URLs
* Application settings

A common approach is creating a `.env` file:

```env
DATABASE_URL=your_database_url
API_KEY=your_secret_key
```

Sensitive information should never be committed to the repository.

Add secret files to `.gitignore`:

```gitignore
.env
```

For shared projects, provide an example environment file such as `.env.example`:

```env
DATABASE_URL=
API_KEY=
```

This allows other developers to understand which variables are required without exposing private information.

## Code Formatting and Quality Tools

Consistent formatting and code quality checks help keep the project readable, reliable, and maintainable.

Recommended tools include:

* Ruff
* Black
* isort
* mypy

These tools help automatically format code, detect common issues, and improve development consistency.

## Ruff

Ruff is a fast Python linter and formatter that helps detect code issues and enforce consistent coding standards.

It combines the functionality of multiple Python linting tools while providing fast feedback during development.

Check code:

```bash
ruff check .
```

Format code:

```bash
ruff format .
```

## Type Checking

Python is dynamically typed, meaning some errors may only appear while running the application.

Type checking tools such as mypy help detect potential issues before runtime.

Example:

```bash
mypy .
```

Adding type hints improves readability and makes larger changes and refactors safer.

Example:

```python
def greet(name: str) -> str:
    return f"Hello {name}"
```

## Git Hooks

Git hooks can automatically run checks before commits or pushes.

Tools such as `pre-commit` can be configured to run:

* Formatting checks
* Linting
* Type checking
* Tests

This helps prevent broken or low-quality code from being added to the project.

## Project Structure

A common Python project structure looks like this:

```text
project/
├── src/
│   └── application/
├── tests/
├── pyproject.toml
├── uv.lock
├── .env
├── .env.example
└── README.md
```

Keeping source code, tests, configuration, and dependencies organized makes projects easier to understand and maintain.

## Best Practices

* Use uv for dependency and environment management
* Keep dependencies inside `pyproject.toml`
* Never commit secrets or `.env` files
* Provide `.env.example` for required variables
* Use formatting and linting tools consistently
* Add type hints where possible
* Keep project configuration documented for new contributors