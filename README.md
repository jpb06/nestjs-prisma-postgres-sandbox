# nestjs-prisma-postgres-sandbox

[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://github.dev/jpb06/nestjs-prisma-postgres-sandbox)
![Github workflow](https://img.shields.io/github/actions/workflow/status/jpb06/nestjs-prisma-postgres-sandbox/checks.yml?branch=master&logo=github-actions&label=last%20workflow)
![Github workflow](https://img.shields.io/github/actions/workflow/status/jpb06/nestjs-prisma-postgres-sandbox/checks.yml?branch=master&logo=fly&label=Fly%20Deploy)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nestjs-prisma-postgres-sandbox&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=jpb06_nestjs-prisma-postgres-sandbox)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nestjs-prisma-postgres-sandbox&metric=security_rating)](https://sonarcloud.io/dashboard?id=jpb06_nestjs-prisma-postgres-sandbox)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nestjs-prisma-postgres-sandbox&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=jpb06_nestjs-prisma-postgres-sandbox)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nestjs-prisma-postgres-sandbox&metric=code_smells)](https://sonarcloud.io/dashboard?id=jpb06_nestjs-prisma-postgres-sandbox)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nestjs-prisma-postgres-sandbox&metric=duplicated_lines_density)](https://sonarcloud.io/dashboard?id=jpb06_nestjs-prisma-postgres-sandbox)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=jpb06_nestjs-prisma-postgres-sandbox&metric=coverage)](https://sonarcloud.io/dashboard?id=jpb06_nestjs-prisma-postgres-sandbox)
![Coverage](./badges/coverage-jest%20coverage.svg)
![Last deployment](https://img.shields.io/github/deployments/jpb06/nestjs-prisma-postgres-sandbox/nestjs-prisma-postgres?label=last%20deployment&logo=heroku)
![Last commit](https://img.shields.io/github/last-commit/jpb06/nestjs-prisma-postgres-sandbox?logo=git)

Toying with nest and prisma.

<!-- readme-package-icons start -->

<p align="left"><a href="https://docs.github.com/en/actions" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/GithubActions-Dark.svg" /></a>&nbsp;<a href="https://www.typescriptlang.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeScript.svg" /></a>&nbsp;<a href="https://nodejs.org/en/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NodeJS-Dark.svg" /></a>&nbsp;<a href="https://yarnpkg.com/api/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Yarn-Dark.svg" /></a>&nbsp;<a href="https://fly.io/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/FlyIo-Dark.svg" /></a>&nbsp;<a href="https://docs.docker.com" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Docker.svg" /></a>&nbsp;<a href="https://www.postgresql.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/PostgreSQL-Dark.svg" /></a>&nbsp;<a href="https://github.com/conventional-changelog" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/CommitLint.Dark.svg" /></a>&nbsp;<a href="https://eslint.org/docs/latest/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Eslint-Dark.svg" /></a>&nbsp;<a href="https://jestjs.io/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Jest.svg" /></a>&nbsp;<a href="https://jwt.io" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Jwt-Dark.svg" /></a>&nbsp;<a href="https://docs.nestjs.com" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/NestJS-Dark.svg" /></a>&nbsp;<a href="https://www.passportjs.org/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Passport-Dark.svg" /></a>&nbsp;<a href="https://prettier.io/docs/en/index.html" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Prettier-Dark.svg" /></a>&nbsp;<a href="https://www.prisma.io/docs/" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Prisma.svg" /></a>&nbsp;<a href="https://rxjs.dev/guide/overview" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Rxjs-Dark.svg" /></a>&nbsp;<a href="https://swagger.io" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Swagger-Dark.svg" /></a>&nbsp;<a href="https://swc.rs/docs/getting-started" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/Swc-Dark.svg" /></a>&nbsp;<a href="https://github.com/typestack" target="_blank"><img height="50" src="https://raw.githubusercontent.com/jpb06/jpb06/master/icons/TypeStack-Dark.svg" /></a></p>

<!-- readme-package-icons end -->

You can find the [deployed app here](https://nestjs-prisma-postgres-sandbox.fly.dev).

## ⚡ What is this repo about?

This is a sandbox to evaluate nestjs and dig how fun it is to implement typical requirements for a backend, with an enphasis on testing, given how dearly missed this requirement can be in 'real world' examples found here and there.

## ⚡ Usage

### 🔶 run locally

#### 👇 Since our prisma schemas are split within modules, we will have to merge them all in one file prisma can understand. Let's do just that

```bash
yarn prisma-merge
```

#### 👇 Now, we need to tell prisma to generate in node_modules the code actually allowing us to interact with the database

```bash
yarn prisma-gen
```

#### 👇 You will need docker and docker-compose to get the postgres database up and running. You can use this command to launch the database container

```bash
yarn docker
```

#### 👇 Then, let's inject some data in our dev database using

```bash
yarn prisma-seed
```

#### 👇 We can now launch the backend in dev

```bash
yarn dev
```

#### 😵 You can do the merge, gen & seed steps all at once using the following command

```bash
yarn dev-db
```

### 🔶 test all the things

👇 We can run all the tests and get a coverage report using the following:

```bash
yarn test-dev
```

## ⚡ Guidelines

### 🔶 Schema splitting

We do not want a huge prisma schema. We want to isolate each model (table or set of tables) in its own file.

### 🔶 Well documented routes

Let's have a swagger documenting properly exposed routes, that is mainly for each route:

- a description.
- the list of possible responses.
- a definition of the inputs and outputs.

### 🔶 Full testing coverage

We want to test everything to learn how to properly test, and to face every single difficulty that comes with testing. We will at very least do end to end using superagent, controllers testing, service testing.

### 🔶 No testing against the database

All tests should run without any interaction with a database.

## ⚡ Database Schema

![Diagram](./docs/schema.png)

## ⚡ Subjects

### 🔶 Authentication

Let's use passport to setup jwt based authentication.

#### 🚀 Routes

Two routes were defined to demonstrate the use case:

| Route              | Description                   | Documentation                                                                                  |
| ------------------ | ----------------------------- | ---------------------------------------------------------------------------------------------- |
| POST /users/login  | The login route               | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/crud-users/UsersController_login)      |
| GET /users/profile | Logged user profile retrieval | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/crud-users/UsersController_getProfile) |

#### :books: Mock data

We have two users in database to play with the routes:

- alice@cool.org / alice
- bob@cool.org / bob

#### 🧪 Tests

- ✅ e2e
- ✅ controllers
- ✅ services
- ✅ local passport strategy

### 🔶 CRUD

Let's create CRUD routes to manage a list of books.
We want to make sure to give a proper feedback when foreign keys violations do occur (when we try to delete an entry whose key is referenced in another table or when we try to update an entry with a foreign key that does not exist). Let's use filters for that!

#### 🚀 Routes

| Route                   | Description                             | Documentation                                                                                          |
| ----------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| GET /books              | Retrieves all books                     | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-books/BooksController_getBooks)         |
| GET /authors            | Retrieves all authors                   | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-authors/AuthorsController_getAuthors)   |
| GET /authors/{id}/books | Retrieves the book written by an author | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-books/AuthorsController_getAuthorBooks) |
| POST /books             | Creates a book                          | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-books/BooksController_createBook)       |
| POST /authors           | Creates an author                       | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-authors/AuthorsController_createAuthor) |
| PUT /books/{id}         | Updates a book                          | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-books/BooksController_updateBook)       |
| PUT /authors/{id}       | Updates an author                       | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-authors/AuthorsController_updateAuthor) |
| DELETE /books/{id}      | Deletes a book                          | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-books/BooksController_deleteBook)       |
| DELETE /authors/{id}    | Deletes an author                       | [Link](https://nestjs-prisma-postgres-sandbox.fly.dev/#/#/crud-authors/AuthorsController_deleteAuthor) |

#### 🧪 Tests

- ✅ e2e
- ✅ controllers (turns out these are pretty much useless since we mock the service)
- ✅ services
- ✅ validation pipe
- ✅ filters
