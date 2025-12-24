# TECHNOTES

## 24-12-2025 - UC-11: Frontend Organism Implementation

- Added Formik and Yup dependencies for form management and validation
- Implemented organism-level components combining molecules into complete functional units:
  - CustomAppBar - Top-level navigation with fixed positioning and toolbar spacer
  - UtilisationCalculatorOrganism - Complete calculator form with Formik integration, validation, and step management
  - UtilisationCalculatorResultOrganism - Results display organism for calculation outcomes
  - UtilisationHistoryOrganism - Full history management with pagination, card layout, and CRUD operations
- Created comprehensive form validation schema using Yup with internationalization support:
  - Date validation with range constraints (max 365 days)
  - Numeric validation with business rule enforcement (billable ≤ total hours)
  - Cross-field validation and error handling
- Established multi-step state management pattern for calculator and history workflows:
  - Calculator: Form → Loading → Error/Results
  - History: Loading → Error/No Data/Results with delete operations
- Integrated organisms with existing molecular and atomic components

## 22-12-2025 - UC-10: Frontend Molecules Implementation

- Added Clerk authentication and react-i18next dependencies
- Implemented molecular components composing atoms into functional UI units:
  - CustomToolbar - Navigation toolbar with app title and Clerk UserButton
  - UtilisationCalculatorMoleculeStep1Header - Calculator title with info tooltip
  - UtilisationCalculatorMoleculeStep1BillableHours/TotalHours/TargetUtilisation - Form input molecules
  - UtilisationCalculatorMoleculeStep1StartDate/EndDate - Date picker molecules
  - UtilisationCalculatorMoleculeStep1Buttons - Calculate and Clear action buttons
  - UtilisationCalculatorMoleculeStep2Loader - Loading state with progress indicator
  - UtilisationCalculatorMoleculeStep3Error - Error handling with close button
  - UtilisationCalculatorMoleculeStep4Header/LabeledProgressBar/UtilisationSummaryCard - Results display
  - UtilisationHistoryMoleculeStep1Header/HistoryCardLeft/HistoryCardRight/Pagination - History management
  - UtilisationHistoryMoleculeStep2Loader/Step3Error/Step4NoData - History state management
- Created date formatting utilities with internationalization support
- Established 4-step wizard pattern for calculator and history workflows
- Integrated TypeScript interfaces and CSS custom properties for consistent theming

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
