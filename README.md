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

1. Node.js version (^14.17.0, or >=16.0.0)
2. npm 7 or greater
3. Docker (You can download it from [Docker](https://www.docker.com/get-started)):

- Run the command to start the Docker

  ```sh
  npm run docker
  ```

  > **Note:** The npm script will complete while Docker sets up the container in the background. Ensure that Docker has finished and your container is running before proceeding.

- Create .env and .env.example file and add this follwing keys. The value of the data are secret codes and you can access it from this excel [File](https://docs.google.com/spreadsheets/d/1QHtxVvBboDRcMuR0ZIql-xSZxiwj9oNqRItVR0fx0hA/edit#gid=0):

  ```sh
  DATABASE_URL=
  SESSION_SECRET=
  SENDGRID_API_KEY=
  PUBLIC_URL=
  ```

  > **Note** - .env and .env.example files are same, only `SENDGRID_API_KEY="demo_key"` will be replaced in .env.example

- Run this command to install all the packages

  ```sh
  npm install
  ```

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

If you'd prefer not to use Docker, you can also use Fly's Wireguard VPN to connect to a development database (or even your production database). You can find the instructions to set up Wireguard [here](https://fly.io/docs/reference/private-networking/#install-your-wireguard-app), and the instructions for creating a development database [here](https://fly.io/docs/reference/postgres/).

### Relevant code:

This is a pretty simple note-taking app, but it's a good example of how you can build a full stack app with Prisma and Remix. The main functionality is creating users, logging in and out, and creating and deleting notes.

- creating users, and logging in and out [./app/models/user.server.ts](./app/models/user.server.ts)
- user sessions, and verifying them [./app/session.server.ts](./app/session.server.ts)
- creating, and deleting notes [./app/models/note.server.ts](./app/models/note.server.ts)

## Creating A Branch from Github

For Creating a new branch, you have to go to the `Issues` section in Github and select the `Create a branch` from `development` section

> **NOTE** - Always check that the branch source should be `dev`. You can check that from `Change branch source`.

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
You can learn the main concepts of prisma from its official documentation [Prisma](https://www.prisma.io/docs/concepts)

- You can check all the models from `schema.prisma` file
- If you are changing the database schema in `schema.prisma` file, you have to push the database to reflect those changes by running this command
  ```sh
  npx prisma db push
  ```
  and after that you have to setup it again which will create new migration by using following command:
  ```sh
  npm run setup
  ```
  You can also reset the database yourself to undo manual changes or db push experiments by running the command:
  ```sh
  npx prisma migrate reset
  ```

## Testing

### Cypress

We use Cypress for our End-to-End tests in this project.
You can learn the Cypress from offical documentation [Cypress](https://docs.cypress.io/)

You'll find those in the `cypress` directory. As you make changes, add to an existing file or create a new file in the `cypress/e2e` directory to test your changes.

We use [`@testing-library/cypress`](https://testing-library.com/cypress) for selecting elements on the page semantically.

To run these tests in development, run

```sh
npm run test:e2e:dev
```

which will start the dev server for the app as well as the Cypress client. Make sure the database is running in docker as described above.

Also you can run this test locally by using the command

```sh
npx cypress open
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

### Vitest

For lower level tests of utilities and individual components, we use `vitest`. We have DOM-specific assertion helpers via [`@testing-library/jest-dom`](https://testing-library.com/jest-dom).

### Type Checking

This project uses TypeScript. It's recommended to get TypeScript set up for your editor to get a really great in-editor experience with type checking and auto-complete. To run type checking across the whole project, run `npm run typecheck`.

### Linting

This project uses ESLint for linting. That is configured in `.eslintrc.js`.

### Formatting

We use [Prettier](https://prettier.io/) for auto-formatting in this project. It's recommended to install an editor plugin (like the [VSCode Prettier plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)) to get auto-formatting on save. There's also a `npm run format` script you can run to format all files in the project.
