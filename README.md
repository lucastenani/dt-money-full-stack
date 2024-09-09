# API REST Fastify

## Project Description

The `api-rest-fastify` project is a full-stack application featuring a REST API built with Node.js and Fastify, alongside a frontend for consuming the API. This application allows users to view bank transfers, create transactions, see an overview of their account, view details of specific transactions, and apply filters. The project utilizes a variety of tools and libraries, including Fastify, Knex, TypeScript, React, Tailwind, React Query, and others to facilitate development.

## Testing

End-to-end (E2E) tests have been implemented for both the frontend and backend applications:

- **Backend**: E2E tests ensure that the REST API behaves as expected under various scenarios.
- **Frontend**: E2E tests validate the user interface and interactions with the backend API.

## Getting Started

To run the application locally, follow these steps:

### Prerequisites

- **Docker**: Ensure you have Docker installed on your machine. You can download Docker from [Docker's official website](https://www.docker.com/products/docker-desktop).

### Steps
1. In the root directory of the application build and start the application using Docker Compose:
```bash
docker-compose up --build
```
2. Once the application is up and running, open your browser and navigate to [localhost](http://localhost:4173/) to see the application in action.compose up --build


## Backend Libraries

- **TypeScript**: For type-safe JavaScript development.
- **Fastify**: Web framework for building efficient and fast APIs.
- **tsx**: For handling TypeScript in Node.js environments.
- **ESLint**: For linting and maintaining code quality.
- **Knex**: SQL query builder for database interactions.
- **zod**: For schema validation.
- **dotenv**: For managing environment variables.
- **vitest**: For running unit and integration tests.
- **supertest**: For HTTP assertions and testing.
- **tsup**: For bundling and building TypeScript projects.

## Database

- **SQLite3**: Lightweight SQL database for local development and testing.

## Frontend Libraries

- **TypeScript**: For type-safe JavaScript development.
- **ESLint**: For linting and maintaining code quality.
- **Prettier**: For code formatting.
- **TailwindCSS**: Utility-first CSS framework for styling.
- **shadcn/ui**: Component library for building user interfaces.
- **zod**: For schema validation.
- **axios**: For making HTTP requests.
- **React Query**: For data fetching, caching, and synchronization.
- **phosphor-icons**: For customizable icons.
- **react-hook-form**: For handling form state and validation.
- **date-fns**: For date manipulation and formatting.
- **Playwright**: For end-to-end testing of the frontend.

## Folder Structure

### Backend

- **db/**: Contains physical database files and migrations.
- **src/**: Contains application source code.
  - **@types/**: TypeScript type definitions.
  - **env/**: TypeScript type definitions for environment variables.
  - **middlewares/**: Middleware functions for request processing.
  - **routes/**: API route handlers.
  - **app.ts**: Main application setup.
  - **database.ts**: Database connection and configuration.
  - **server.ts**: Entry point for the Fastify server.
- **test/**: End-to-end tests for the backend.

### Frontend

- **src/**: Contains application source code.
  - **api/**: Contains API calls and mocks.
  - **assets/**: Images and other static resources.
  - **components/**: Reusable React components.
  - **lib/**: Utilities including axios, react-query, and others.
  - **pages/**: Application pages.
  - **app.tsx**: Main application component.
  - **env.ts**: TypeScript type definitions for environment variables.
  - **globals.css**: Global styles.
  - **main.tsx**: Entry point for the React application.
  - **routes.tsx**: Application routing configuration.
- **test/**: End-to-end tests for the frontend.

## Functional Requirements

- [x] Users must be able to create new transactions.
- [x] Users must be able to obtain a summary of their account.
- [x] Users must be able to list all transactions that have occurred.
- [x] Users must be able to view details of a single transaction.
- [x] Users can update the status of a transaction to exclude it from the total balance calculation.

## Business Rules

- [x] Transactions can be of type "income" (which adds to the total amount) or "outcome" (which subtracts from the total).
- [x] User identification must be maintained between requests using cookies.
- [x] Users can only view transactions they created.
