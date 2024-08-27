# api-rest-fastify

## Libraries backend

- **TypeScript**
- **Fastify**
- **tsx**
- **ESLint**
- **Knex**
- **zod**
- **dotenv**

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


## Migrations
 npm run knex -- migrate:make add-session-id-to-transactions
 npm run knex -- migrate:latest

# Cases
## functional requirements 

- [] The user must be able to create a new transaction;
- [] The user must be able to obtain a summary of his account;
- [] The user must be able to list all transactions that have already occurred;
- [] The user must be able to view a single transaction;

## business rules

- [] The transaction can be of the credit type that will add to the total amount, or debit that will subtract;
- [] It must be possible to identify the user between requests;
- [] The user can only view transactions that he created;