# Remix Blues Stack

![The Remix Blues Stack](https://repository-images.githubusercontent.com/461012689/37d5bd8b-fa9c-4ab0-893c-f0a199d5012d)

Learn more about [Remix Stacks](https://remix.run/stacks).

## What's in the stack

- [Multi-region Fly app deployment](https://fly.io/docs/reference/scaling/) with [Docker](https://www.docker.com/)
- [Multi-region Fly PostgreSQL Cluster](https://fly.io/docs/getting-started/multi-region-databases/)
- Healthcheck endpoint for [Fly backups region fallbacks](https://fly.io/docs/reference/configuration/#services-http_checks)
- [GitHub Actions](https://github.com/features/actions) for deploy on merge to production and staging environments
- Email/Password Authentication with [cookie-based sessions](https://remix.run/docs/en/v1/api/remix#createcookiesessionstorage)
- Database ORM with [Prisma](https://prisma.io)
- Styling with [Tailwind](https://tailwindcss.com/)
- End-to-end testing with [Cypress](https://cypress.io)
- Local third party request mocking with [MSW](https://mswjs.io)
- Unit testing with [Vitest](https://vitest.dev) and [Testing Library](https://testing-library.com)
- Code formatting with [Prettier](https://prettier.io)
- Linting with [ESLint](https://eslint.org)
- Static Types with [TypeScript](https://typescriptlang.org)

## Quickstart

Click this button to create a [Gitpod](https://gitpod.io) workspace with the project set up, Postgres started, and Fly pre-installed

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/from-referrer/)

## Development

It is important for you to have these things installed:

1. [Node.js](https://nodejs.org/en/)
2. [Docker](https://www.docker.com/get-started)

- You have to clone the code by using this URL https://github.com/copods/kela-quiz.git
- Run this command to install all the packages

  ```sh
  npm install
  ```

- Run the command to start the Docker

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

- Create .env file from .env.example file and add data from this excel [File](https://docs.google.com/spreadsheets/d/1QHtxVvBboDRcMuR0ZIql-xSZxiwj9oNqRItVR0fx0hA/edit#gid=0):

- To understand the content of the above file, you can read `SECRET.md` file

- Initial setup:

  ```sh
  npm run setup
  ```

- Run the first build:

  ```sh
  npm run build
  ```

- Start dev server:

  ```sh
  npm run dev
  ```

This starts your app in development mode, rebuilding assets on file changes.

## Creating A Branch from Github

For Creating a new branch, you can to go to the `Issues` section in Github and select the `Create a branch` from `development` section of that particular Issue.

> **NOTE** - You can check the branch source from `Change branch source`.

## Naming Conventions

- Components: PascalCase;
- Components Folder: kebab-case;
- Route File / Folder Names: kebab-case;
- Slug File Names: camelCase;
- Class Name: camelCase
- ID Atrributes: kebab-case

## Git Commit Syntax

- For committing the code use following syntax-

```sh
git commit -m '<type>() :<description>'
```

The commit `<type>` can include the following:

- feat – a new feature is introduced with the changes
- fix – a bug fix has occurred
- chore – changes that do not relate to a fix or feature and don't modify src or test files (for example updating dependencies)
- refactor – refactored code that neither fixes a bug nor adds a feature
- docs – updates to documentation such as a the README or other markdown files
- style – changes that do not affect the meaning of the code, likely related to code formatting such as white-space, missing semi-colons, and so on.
- test – including new or correcting previous tests
- perf – performance improvements
- ci – continuous integration related
- build – changes that affect the build system or external dependencies
- revert – reverts a previous commit

## GitHub Actions

We use GitHub Actions for continuous integration and deployment. Anything that gets into the `main` branch will be deployed to production after running tests/build/etc. Anything in the `dev` branch will be deployed to staging.

## Prisma Database

We are using Prisma which is an open source database toolkit in our project.
You can learn the main concepts of [Prisma](https://www.prisma.io/docs/concepts) from its official documentation.

- You can check all the models/schema from `schema.prisma` file
- If you are changing the database schema in `schema.prisma` file, you have to push the database to reflect those changes by running this command

  ```sh
  npm run db:push
  ```

  You can also reset the database yourself to undo manual changes or db push experiments by running the command:

  ```sh
  npm run prisma:reset
  ```

## Testing

We are using Cypress for our End-to-End tests in this project.
You can learn the [Cypress](https://docs.cypress.io/) from offical documentation.

You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run

```sh
npm run test:e2e:dev
```

which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

Also you can run cypress for testing of components on browser by running following command

```sh
npm run cypress
```

We have a utility for testing authenticated features without having to go through the login flow:

```ts
cy.login()
// you are now logged in as a new user
```

We also have a utility to auto-delete the user at the end of your test. Just make sure to add this in each test file:

```ts
afterEach(() => {
  cy.cleanupUser()
})
```

That way, we can keep your local db clean and keep your tests isolated from one another.

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
