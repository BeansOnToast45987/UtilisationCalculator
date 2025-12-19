# TECHNOTES

## 19-12-2025 - UC-5: Delete Utilisation Mutation Implementation

- Created DeleteUtilisation GraphQL mutation with schema definition and resolver
- Implemented deleteUtilisationRequest service with secure calculation deletion
- Added comprehensive authorization checks: user verification and ownership validation
- Built deleteUtilisationRequestResponse service for consistent response formatting
- Created TypeScript interfaces for DeleteUtilisationInput and DeleteUtilisationResponse
- Integrated Clerk authentication for secure access control
- Added three-tier security validation: user existence, calculation existence, and ownership verification
- Implemented proper database deletion with Prisma ORM
- Added detailed error handling for not found and unauthorized scenarios
- Updated GraphQL schema and service exports for DeleteUtilisation integration

## 19-12-2025 - UC-4: Get Utilisation Query Implementation

- Created GetUtilisation GraphQL query with schema definition and resolver
- Implemented getUtilisationRequest service to fetch user's utilisation calculations from database
- Added database query with user lookup and ordered results (most recent first)
- Built getUtilisationRequestResponse service for data transformation and ISO date formatting
- Created TypeScript interfaces for GetUtilisation and GetUtilisationResponse
- Integrated Clerk authentication for secure data access with user verification
- Added proper error handling for user not found scenarios
- Implemented array mapping for multiple calculation records with consistent response format
- Updated GraphQL schema and service exports for GetUtilisation integration
- Added support for fetching historical utilisation calculations sorted by creation date

## 18-12-2025 - UC-3: Calculate Utilisation Mutation Implementation

- Created CalculateUtilisation GraphQL mutation with schema definition and resolver
- Implemented utilisation calculation logic with precision rounding (billableHours / totalHours \* 100)
- Built comprehensive validation framework for calculation inputs (date range, hours, target utilisation)
- Added CalculateUtilisation service layer with database operations and business logic validation
- Created TypeScript interfaces for CalculateUtilisationInput and CalculateUtilisationResponse
- Implemented database model for storing utilisation calculations with user relations
- Added validation functions: date range validation, total hours validation (0.01-8760), billable hours validation, target utilisation validation (0-100%)
- Integrated user lookup and authentication with Clerk ID verification
- Added calculation persistence to database with proper date handling and result formatting
- Implemented error handling for edge cases (zero division, invalid numbers, user not found)

## 17-12-2025 - UC-2: Initialize User Mutation Implementation

- Created InitializeUser GraphQL mutation with full schema definition
- Implemented InitializeUser resolver with authentication and validation
- Built comprehensive validation framework for user input (clerkId, names, country)
- Added InitializeUser service layer with database operations and race condition handling
- Created TypeScript interfaces for InitializeUserInput and InitializeUserResponse
- Integrated GraphQL schema and resolvers into main application architecture
- Added Jest types to TypeScript configuration to resolve test compilation issues

## 17-12-2025 - UC-1: Backend Infrastructure Setup and Initialization

- Created Express server with Apollo GraphQL integration
- Configured Prisma database schema with User and UtilisationCalculation models for MongoDB
- Implemented Clerk authentication utilities with token verification
- Established modular validation framework for auth requests
- Set up shared type definitions for User and Country entities
- Configured TypeScript build pipeline with development server
- Added health check and root endpoints
- Implemented GraphQL schema merging architecture (placeholder structure)
