# Examen backend

Basic setup of express with typescript including the following packages:

- Sequelize (ORM)
- Knex (migrations)
- Cors (middleware)
- Boom (error middleware)
- Swagger (documentation)

## Requirements

- NodeJS
- Yarn
- Docker
- Docker Compose

## Setup

1. Copy `.env.example` to `.env` and fill in all variables
2. Copy `.env.example` to `.env.testing` and fill in all variables for tests
3. Run `yarn`

## Development

1. Run `docker-compose up` to run the postgres database
2. Run `yarn dev` to run the express app

## Test

- Run `yarn dev` if you have made new updates to entities or controllers

1. Run `yarn test:unit` to run the tests

### Migrations/Seeding

All migration and seeding files are located in `src/knex`.
To generate migrations and seeds you need to install the Knex CLI by running `npm install -g knex`

Create migration: `knex migrate:make create_users_table`
Run migrations: `knex migrate:up`

Create seed: `knex seed:make users`
Run seeds: `knex seed:run`
