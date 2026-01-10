# Technical Documentation

## Code Overview

The Utilisation Calculator is a full-stack TypeScript application:

- **Backend**: Node.js GraphQL API with Prisma ORM and MongoDB
- **Frontend**: React application with Material-UI components
- **Authentication**: Clerk service integration
- **Testing**: Jest unit tests for backend and Vitest for frontend

### Project Structure

```
├── backend/           # GraphQL API server
│   ├── src/graphql/   # Schema definitions and resolvers
│   ├── src/services/  # Business logic layer
├── frontend/          # React application
│   ├── src/components/ # UI components (Atomic Design)
```

The backend exposes GraphQL operations for user initialization, utilisation calculations, data retrieval, and record deletion. The frontend uses React with Formik for form handling and Apollo Client for GraphQL integration.

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
