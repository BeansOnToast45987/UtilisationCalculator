# Technical Documentation

## Code Overview

The Utilisation Calculator is a full-stack application which enables users to calculate utilisation rates and view historical performance data.

### Backend

The backend provides a GraphQL API built with **Node.js** and **TypeScript**, connected to a **MongoDB** database via **Prisma ORM**.

#### GraphQL API

##### Mutations

- **initializeUser**: Creates new user profiles or updates existing profiles following Clerk authentication validation.
- **calculateUtilisation**: Validates input, calculates the utilisation percentage (billable hours ÷ total hours), and persists the result to the database.
- **deleteUtilisation**: Deletes specific utilisation calculation records by ID for authenticated users.

##### Queries

- **getUtilisation**: Retrieves the full utilisation calculation history for the authenticated user.

All GraphQL operations follow the same execution flow. Each request is first authenticated with Clerk via a shared authentication utility. Inputs are then validated against predefined rules within the backend logic before being passed into the service layer, which contains the core business logic. The resolver then returns a structured and consistent response format. Each operation includes comprehensive error handling with user-friendly error messages.

#### MongoDB Database

##### User model

- **Identity**: Stores a Clerk ID for authentication integration, along with profile fields such as `firstName`, `lastName`, and `name`.
- **Localisation**: Stores a `country` field to support region-specific localisation and translations (defaults to `GB` if unspecified).
- **Relationships**: One-to-many relationship with the `UtilisationCalculation` model.

##### UtilisationCalculation model

- **Time tracking**: Stores `totalHours`, `billableHours`, `startDate`, and `endDate` to support period-based calculations.
- **Performance metrics**: Stores `targetUtilisation`, `calculatedUtilisation`, and a `meetsTarget` boolean for target comparison.
- **Relationships**: Many-to-one relationship with `User`, linked via the `userId` foreign key.
- **Audit**: Stores a `createdAt` timestamp to support historical tracking and reporting.

The Prisma schema uses MongoDB ObjectIDs for primary keys and defines a clear parent–child relationship, where each user can have multiple utilisation calculation records. Each calculation stores both raw time input data and computed performance metrics.

### Frontend

The frontend is a **React** application built with **TypeScript** and styled using **SCSS**.

#### Component Architecture

The UI follows an **Atomic Design** approach, encouraging reusable, composable components across the application.

##### Atoms

- **CustomButton**: Styled Material UI button with consistent theming, accessibility support, and reusable variants.
- **CustomTextField**: Enhanced input component with integrated validation, error handling, and localised formatting.
- **CustomDatePicker**: Localised date selection component with region-specific formatting and validation rules.
- **CustomTypography**: Standardised typography component supporting internationalisation and responsive UI patterns.
- **CustomLoader**: Animated loading indicator with configurable sizing and positioning for clear user feedback.

##### Molecules

- **Toolbar**: Page-level toolbar combining buttons and typography for consistent navigation and actions.
- **UtilisationForm**: Form-level component combining inputs, date pickers, and Formik validation for calculation entry.
- **UtilisationHistoryTable**: History table component combining pagination and filtering for displaying saved records.

##### Organisms

- **AppBar**: Application header combining navigation, authentication state, and user actions, integrated with Clerk.
- **UtilisationCalculator**: Complete utilisation calculation workflow, including form submission and GraphQL mutation handling.
- **UtilisationHistory**: Full historical data interface, combining display components with CRUD actions using Apollo Client.

All components follow consistent prop interfaces and accessibility standards. Error boundaries are implemented where appropriate. Unit tests are included using **Vitest** and **React Testing Library**.

#### Key Integrations

##### Apollo Client

- **GraphQL integration**: Apollo Client is configured to attach JWT authentication tokens to outgoing requests via Apollo Link middleware.
- **Query hooks**: The `useGetUtilisation` hook provides loading state handling, error reporting, and automatic refetching for utilisation history.
- **Mutation hooks**: `useInitializeUser`, `useCalculateUtilisation`, and `useDeleteUtilisation` manage form submission state, optimistic UI updates, and user feedback for write operations.

The frontend uses **Vite** for development and build workflows, providing fast hot module replacement and optimised production bundles. User inputs are validated client-side using **Formik** prior to submitting GraphQL operations.

## Running the Application Locally

### Prerequisites

- Node.js 18+ and npm
- MongoDB instance (local or cloud)
- Clerk authentication account

### Backend Setup

1. **Navigate to backend folder:**

   ```bash
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create `.env` file in backend folder:

   ```env
   DATABASE_URL="mongodb://localhost:27017/utilisationcalculator"
   CLERK_SECRET_KEY="your_clerk_secret_key"
   CORS_ORIGIN="http://localhost:5173"
   PORT=4000
   ```

4. **Set up database:**

   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Navigate to frontend folder:**

   ```bash
   cd frontend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create `.env` file in frontend folder:

   ```env
   VITE_CLERK_PUBLISHABLE_KEY="your_clerk_publishable_key"
   VITE_GRAPHQL_URL="http://localhost:4000/graphql"
   ```

4. **Start development server:**
   ```bash
   npm run dev
   ```

### Accessing the Application

- **Frontend**: http://localhost:5173
- **Backend GraphQL Playground**: http://localhost:4000/graphql

## Running Tests

### Backend Tests

1. **Navigate to backend folder:**

   ```bash
   cd backend
   ```

2. **Run all tests:**

   ```bash
   npm test
   ```

3. **Run tests with coverage:**
   ```bash
   npm run test:coverage
   ```

### Frontend Tests

1. **Navigate to frontend folder:**

   ```bash
   cd frontend
   ```

2. **Run all tests:**

   ```bash
   npm test
   ```

3. **Run tests with coverage:**

   ```bash
   npm run test:coverage
   ```

4. **Run tests in watch mode:**
   ```bash
   npm run test:watch
   ```

### Test Coverage

- Backend: 100% coverage across services and resolvers
- Frontend: 99.52% coverage for components and utilities
