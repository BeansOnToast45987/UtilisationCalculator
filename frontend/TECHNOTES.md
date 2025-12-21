# TECHNOTES

## 21-12-2025 - UC-9: Frontend Atoms Implementation

- Added Material-UI dependencies
- Implemented atomic components with custom styling and TypeScript interfaces:
  - CustomButton - Multiple button variants with icons (primary, secondary, cancel, delete)
  - CustomDatePicker - Date selection with validation and custom theming
  - CustomTextField - Text input with error handling and consistent styling
  - CustomLoader - Circular progress indicator
  - CustomTypography - Text rendering with theme color integration
  - CustomDivider - Section dividers with flexible layout
  - CustomProgressBar - Linear progress indicators for utilisation display
  - CustomTooltip - Information tooltips with custom styling
  - CustomPagination - Page navigation controls
- Created comprehensive SCSS styling using CSS custom properties for theming
- Established atomic design system foundation for component composition

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
