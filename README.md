# Create Awesome Python App - Official Website

[![PyPI](https://img.shields.io/pypi/v/create-awesome-python-app?style=flat-square&color=3776ab)](https://pypi.org/project/create-awesome-python-app/)
[![Templates](https://img.shields.io/badge/templates-cpa--templates-blue?style=flat-square)](https://github.com/Create-Python-App/cpa-templates)
[![GitHub org](https://img.shields.io/badge/GitHub-Create--Python--App-black?style=flat-square&logo=github)](https://github.com/Create-Python-App)

This is the official website for [Create Awesome Python App](https://pypi.org/project/create-awesome-python-app/), a tool that helps you quickly set up Python projects with best practices and modern tooling (uv-first).

## Project Links

- [Official website](https://create-awesome-python-app.vercel.app)
- [CLI package on PyPI](https://pypi.org/project/create-awesome-python-app/)
- [Main Create-Python-App repository](https://github.com/Create-Python-App/create-python-app)
- [Templates and extensions catalog](https://github.com/Create-Python-App/cpa-templates)
- [Create-Python-App GitHub organization](https://github.com/Create-Python-App)

> [!TIP]
> Scaffold new apps with [`create-awesome-python-app`](https://pypi.org/project/create-awesome-python-app/) — do not clone template snapshot repos for production work. Prefer:
>
> ```bash
> uvx create-awesome-python-app my-api --template fastapi-starter
> ```

## Features

- ⚡️ **Instant HMR (Hot Module Replacement)** - Leveraging Next.js for fast refreshes and updates during development.
- ⚛ **React Integration** - Utilizes [React](https://reactjs.org/) for building the user interface.
- 🦾 **TypeScript Support** - Ensures type safety with [TypeScript](https://www.typescriptlang.org/).

## Extra Documentation

Discover more about the project structure, available scripts, and much more in the [docs](./docs) folder!

## Pre-packed Development Tools

- [TypeScript](https://www.typescriptlang.org/) - For type-safe code.
- [eslint](https://eslint.org/) - A linter tool for identifying and reporting on patterns in JavaScript and JSX.
- [prettier](https://prettier.io/) - An opinionated code formatter for clean and consistent code style.
- [husky](https://www.npmjs.com/package/husky) - Simplifies the use of Git hooks in your project.
- [lint-staged](https://www.npmjs.com/package/lint-staged) - Allows running linters on git staged files to catch errors before they're committed.

## Quick Start

```sh
fnm use
pnpm install
pnpm run dev
```

## Development Workflow

For most development work, you'll primarily use `pnpm run dev`. However, you have additional scripts at your disposal for various tasks:

| pnpm run <script>  | Description                                                                                         |
| ------------------ | --------------------------------------------------------------------------------------------------- |
| `npm run dev`      | Starts the local development server for building and previewing your application.                   |
| `npm run format`   | Formats the codebase using [Prettier](https://prettier.io/) to ensure consistent code styling.      |
| `npm run lint`     | Runs linting on the codebase to identify and report on patterns with [eslint](https://eslint.org/). |
| `npm run lint:fix` | Automatically fixes linting errors in the codebase where possible.                                  |

## Production

Scripts for preparing and viewing the production version:

| pnpm run <script> | Description                                                                                  |
| ----------------- | -------------------------------------------------------------------------------------------- |
| `npm run start`   | Serves your application using the production setup, ensuring it's ready for deployment.      |
| `npm run build`   | Compiles the application into the `dist/` directory, preparing it for production deployment. |

## Contributing

Bug reports, feature requests, and pull requests are welcome on the [Create-Python-App/website](https://github.com/Create-Python-App/website) repository!

## 👥 Contributors

<a href="https://github.com/Create-Python-App/website/contributors">
  <img src="https://contrib.rocks/image?repo=Create-Python-App/website" alt="Contributors to Create-Python-App/website"/>
</a>

Made with [contributors-img](https://contrib.rocks).
