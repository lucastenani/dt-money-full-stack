# api-rest-fastify

## Libraries backend

- **TypeScript**
- **Fastify**
- **tsx**
- **ESLint**
- **Knex**
- **zod**
- **dotenv**
- **vitest**

## Database
- **SQLITE3**

## Libraries frontend
- **TypeScript**
- **ESLint**
- **prettier**
- **tailwindcss**
- **shadcn/ui**
- **zod**
- **axios**
- **REACT-QUERY**
- **phosphor-icons**
- **react-hook-form**
- **date-fns**


## Migrations
 npm run knex -- migrate:make add-type-to-transactions
 npm run knex -- migrate:latest

# Cases
## functional requirements 

- [x] The user must be able to create a new transaction;
- [x] The user must be able to obtain a summary of his account;
- [x] The user must be able to list all transactions that have already occurred;
- [x] The user must be able to view a single transaction;
- [x] The user can update the status of a transaction to exclude it from the total balance calculation (isExcludedFromBalance);

## business rules

- [x] The transaction can be of the income type that will add to the total amount, or outcome that will subtract;
- [x] It must be possible to identify the user between requests - cookies
- [x] The user can only view transactions that he created;