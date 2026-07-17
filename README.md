# Create Awesome Node App - Official Website

[![npm](https://img.shields.io/npm/v/create-awesome-node-app?style=flat-square&color=cb3837)](https://www.npmjs.com/package/create-awesome-node-app)
[![npm downloads](https://img.shields.io/npm/dm/create-awesome-node-app?style=flat-square&color=cb3837)](https://www.npmjs.com/package/create-awesome-node-app)
[![Templates](https://img.shields.io/badge/templates-cna--templates-blue?style=flat-square)](https://github.com/Create-Node-App/cna-templates)
[![GitHub org](https://img.shields.io/badge/GitHub-Create--Node--App-black?style=flat-square&logo=github)](https://github.com/Create-Node-App)

This is the official website for [Create Awesome Node App](https://www.npmjs.com/package/create-awesome-node-app), a tool that helps you quickly set up Node.js projects with best practices and modern tooling.

## Project Links

- [Official website](https://create-awesome-node-app.vercel.app)
- [CLI package on npm](https://www.npmjs.com/package/create-awesome-node-app)
- [Main Create-Node-App repository](https://github.com/Create-Node-App/create-node-app)
- [Templates and extensions catalog](https://github.com/Create-Node-App/cna-templates)
- [Create-Node-App GitHub organization](https://github.com/Create-Node-App)

> [!TIP]
> This project was initialized with [create-awesome-node-app](https://www.npmjs.com/package/create-awesome-node-app). **DO NOT USE THIS TEMPLATE DIRECTLY!** Instead, create your own project using the command and following the interactive menu options. For more information, refer to the documentation!

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

Bug reports, feature requests, and pull requests are welcome on the [Create-Node-App/website](https://github.com/Create-Node-App/website) repository!

## 👥 Contributors

<a href="https://github.com/Create-Node-App/website/contributors">
  <img src="https://contrib.rocks/image?repo=Create-Node-App/website"/>
</a>

Made with [contributors-img](https://contrib.rocks).