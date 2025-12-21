# TECHNOTES

## 21-12-2025 - UC-8: Frontend GraphQL Client and Hooks Implementation

- Added Apollo Client and GraphQL dependencies
- Created GraphQL client with Clerk authentication integration
- Implemented custom hooks for all backend mutations and queries:
  - useInitializeUser - User creation mutation
  - useCalculateUtilisation - Utilisation calculation mutation  
  - useGetUtilisation - Fetch user utilisation data query
  - useDeleteUtilisation - Delete utilisation record mutation
- Created TypeScript interfaces matching backend GraphQL schema
- Set up Apollo Client with authentication middleware for Clerk token handling
- Added environment template for configuration variables

## 20-12-2025 - UC-7: Frontend Infrastructure Setup and Initialization

- Initialized React + TypeScript + Vite project using "npm create vite@latest"
- Selected React framework with TypeScript + React Compiler template
- Generated standard Vite project structure with default configuration
