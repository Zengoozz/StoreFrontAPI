# Storefront Backend Project

## Getting Started

This repo contains a basic Node and Express app to get you started in constructing an API. To get started, clone this repo and run `npm i` in your terminal at the project root.

## Required Technologies
Your application must make use of the following libraries:
- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for migrations
- jsonwebtoken from npm for working with JWTs
- jasmine from npm for testing

## Steps to setup and connect database

### Default database port:
**5432**

### Initializing database schema:

**Should run following lines in terminal**

#### Database creation:
- db-migrate db:create *database_name_dev*
- db-migrate db:create *database_name_test*

#### Database tables creation:
- db-migrate-up

### .env file in root directory:
**Should have all the following variables defined**

- DB_HOST=*host to run on*  **example:** 'localhost'
- DB_NAME=*database_name_dev*
- DB_NAME_TEST=*database_name_test*
- DB_USER=*database_username*
- DB_PASSWORD=*database_user_password*
- ENV=*default environment to run on* **example:** 'dev'
- BCRYPT_PASSWORD=*secret key to hash passwords*
- SALT_ROUNDS=*number of iterations for hashing*
- PEPPER=*added word for extra secure hashing*
- JWT=*JWT secret key*

### Scripts to run and test:

- **npm run watch**: to build and run project with changes live no need to restart building.
- **npm run test**: to run test cases applied by jasmine and supertest.