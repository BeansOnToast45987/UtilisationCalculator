# Project Evaluation

- **Production Environment:** https://utilisationcalculator.com

- **Figma Link:** [Click Here to See!](https://www.figma.com/design/kHI3gZeL9tn4n9C5s6KGsp/UtilisationCalculator?node-id=0-1&p=f&t=fGPwGsHbZ9nXALW3-0)

## Project Overview

### Project Introduction

#### Project Overview and Purpose

The Utilisation Calculator is a full-stack web application that I developed as a university assignment to support my workplace’s technical consulting teams in tracking billable utilisation performance. The application uses a GraphQL API backend built with Node.js and TypeScript, connected to a MongoDB database via Prisma ORM, with a React and TypeScript frontend styled using SCSS. It enables users to initialise profiles, calculate utilisation rates based on worked hours and target thresholds, and view historical performance data.

The purpose of my project is to address a gap in utilisation tracking within my workplace. Existing timesheet reports are generated quarterly, providing limited visibility during the reporting period and forcing consultants to rely on manual spreadsheet calculations. My project replaces spreadsheets with a dedicated web-based tool that supports mid-quarter utilisation calculations and projections, enabling more informed performance planning.

#### Project Roadmap

##### Figure 1 - Utilisation Calculator Project Roadmap

![alt text](<assets/Project Overview/Utilisation Calculator Project Roadmap.png>)

### Project Requirements

Project requirements define the criteria necessary for a project to be delivered successfully. For this project, I identified and documented requirements across functional, non-functional, and security categories to clearly define system behaviour, quality constraints, and protection mechanisms. This structured approach helped ensure the project scope was well understood and provided a clear foundation for planning, development, and prioritisation.

#### Functional Requirements

Functional requirements define the capabilities of the system, describing the specific functions and behaviours it must perform in response to user actions or system events.

| Req ID | Requirement                    | Description                                                                                                                                                       |
| ------ | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-01  | User Initialisation            | Users shall be able to initialise their profile with personal details and country detection.                                                                      |
| FR-02  | Utilisation Input Fields       | The system shall provide input fields for start date, end date, total hours, billable hours, and target utilisation percentage.                                   |
| FR-03  | Calculate Action               | The system shall provide a mechanism to trigger the utilisation calculation process.                                                                              |
| FR-04  | Results Display                | The system shall display the calculated utilisation percentage, target achievement status, and calculation timestamp.                                             |
| FR-05  | Historical Data View           | The system shall allow users to view previous utilisation calculations in a structured and readable format.                                                       |
| FR-06  | Delete Functionality           | The system shall allow users to delete individual utilisation records from their history.                                                                         |
| FR-07  | User Profiles                  | The system shall store user information including name, Clerk authentication ID, and country.                                                                     |
| FR-08  | Utilisation Records Management | The system shall persist utilisation calculation data, including dates, hours worked, target percentages, results, and timestamps to support historical tracking. |
| FR-09  | Utilisation Calculation        | The system shall calculate utilisation using the formula: `(Billable Hours / Total Hours) * 100`.                                                                 |
| FR-10  | Target Comparison              | The system shall determine whether the calculated utilisation meets or exceeds the specified target threshold.                                                    |

#### Non-Functional Requirements

Non-functional requirements define the quality attributes and constraints a system must satisfy in addition to its core functionality.

| Req ID | Requirement                        | Description                                                                                                                                                                                                                   |
| ------ | ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Responsive Design                  | The application shall function correctly across desktop, laptop, tablet, and mobile devices.                                                                                                                                  |
| NFR-02 | Performance                        | Calculations and database operations shall execute efficiently to maintain a smooth user experience.                                                                                                                          |
| NFR-03 | Data Integrity                     | The system shall ensure calculations are accurate and stored data remains consistent and reliable.                                                                                                                            |
| NFR-04 | Accessibility                      | The application shall support keyboard navigation and compatibility with screen readers.                                                                                                                                      |
| NFR-05 | Input and Business Rule Validation | The system shall validate date ranges, ensure numeric values are positive, enforce realistic target utilisation percentages, ensure end dates occur after start dates, and prevent billable hours from exceeding total hours. |
| NFR-06 | Database Error Handling            | The system shall gracefully handle database connection issues and operation failures.                                                                                                                                         |
| NFR-07 | Validation Error Handling          | The system shall provide clear and user-friendly feedback for invalid input data.                                                                                                                                             |
| NFR-08 | GraphQL Error Handling             | The system shall properly handle and format GraphQL query and mutation errors.                                                                                                                                                |
| NFR-09 | Authentication Error Feedback      | The system shall provide clear, non-sensitive feedback for authentication and authorisation failures.                                                                                                                         |
| NFR-10 | Input Sanitisation                 | The system shall sanitise all user-provided input to ensure system stability and data integrity.                                                                                                                              |

#### Security Requirements

Security requirements define the measures and controls that must be implemented to protect the system from unauthorised access, data breaches, and other security threats.

| Req ID | Requirement                      | Description                                                                                                                  |
| ------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| SR-01  | Authentication Integration       | The system shall integrate with the Clerk authentication service for secure user authentication.                             |
| SR-02  | Authorisation and Access Control | The system shall ensure users can only access and manage their own utilisation data through enforced authorisation controls. |
| SR-03  | Token Validation                 | The system shall validate authentication tokens for presence, format, and integrity before processing requests.              |
| SR-04  | Environment Security             | The system shall securely manage environment variables, including secret keys and API credentials.                           |
| SR-05  | CORS Configuration               | The system shall enforce Cross-Origin Resource Sharing (CORS) policies to restrict access from unauthorised domains.         |

#### MoSCoW (Must Have, Should Have, Could Have, Won't Have) Prioritisation

After defining and validating the system requirements outlined above, I have prioritised them using the MoSCoW prioritisation technique. I have chosen this approach because it clearly communicates development priorities and supports effective planning by distinguishing between essential and non-essential functionality for the application.

| Priority    | Explanation of MoSCoW Priority                                                                                                                              | Requirement IDs                                                                                                              | Justification                                                                                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Must Have   | Must have requirements are essential for the system to function and meet its core purpose. Without these requirements, the application would not be usable. | FR-01, FR-02, FR-03, FR-04, FR-07, FR-09, FR-10, SR-01, SR-02, SR-03, NFR-05, NFR-06, NFR-07, NFR-08                         | These requirements are necessary to deliver the core functionality of the utilisation calculator, enabling user management, calculation logic, authentication, and essential validation and error handling. |
| Should Have | Should have requirements improve reliability and usability but are not critical for basic system operation.                                                 | FR-05, FR-08, NFR-02, NFR-03, SR-04, SR-05                                                                                   | These requirements enhance system reliability, performance, and security by adding features such as historical data tracking, data persistence, performance optimisation, and additional security controls. |
| Could Have  | Could have requirements are optional features that enhance user experience but are not essential to core functionality.                                     | FR-06, NFR-01, NFR-04, NFR-09, NFR-10                                                                                        | These requirements improve overall usability and accessibility through quality-of-life enhancements such as record deletion, responsive design, accessibility support, and improved feedback messages.      |
| Won't Have  | Won’t have requirements are features that are out of scope for the current project.                                                                         | No Requirement IDs - Advanced reporting, bulk operations, third-party integrations, audit logging, data export functionality | These requirements are excluded from the current scope due to time and project constraints, but may be considered in future iterations.                                                                     |

### Project User Stories

To support a clear understanding of the defined project requirements, I have created a set of user stories that represent the planned system functionality. These user stories describe what the system should do and why, typically expressed in terms of a user’s role, need, and goal. They help guide development by clarifying the intended features and the value they deliver, while also reducing the risk of scope creep and supporting the creation of well-defined development tasks.

#### User Story 1: User Profile Initialisation

**As a** consultant  
**I want** to initialise my profile with my name and country details  
**So that** I can securely access the utilisation calculator with my data properly organised and authenticated.

#### User Story 2: Calculate Utilisation Performance

**As a** consultant  
**I want** to input my date range, total hours, billable hours, and target percentage, then calculate my utilisation  
**So that** I can see my actual utilisation percentage, whether I've met my target, and when the calculation was performed.

#### User Story 3: Track Historical Performance Trends

**As a** consultant  
**I want** to view all my previous utilisation calculations in a structured list  
**So that** I can analyse my performance trends over time and identify patterns in my billable utilisation.

#### User Story 4: Receive Clear Data Validation Feedback

**As a** consultant  
**I want** to receive immediate, clear error messages when I enter invalid data  
**So that** I can quickly correct my input and ensure my utilisation calculations are accurate.

#### User Story 5: Remove Inaccurate Records

**As a** consultant  
**I want** to delete individual utilisation records that contain errors  
**So that** my historical performance data remains clean and reflects my true utilisation performance.

### Project Stakeholders

Project stakeholders are individuals or organisations that are involved in a project or whose interests may be affected by its execution or completion. To ensure relevant perspectives were considered throughout development, I identified the key stakeholders involved in this project and clearly defined their roles and responsibilities. This helped to clarify ownership, support effective decision-making, and ensure the solution aligned with both technical goals and end-user needs.

| Role                  | Responsibility                                                      | Explanation                                                                                                             |
| --------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Project Manager       | Project planning, scope management, timeline coordination           | Since this is a solo project, I take on the role of project manager to oversee all aspects of development               |
| Software Engineer     | Full-stack development, testing, documentation, deployment          | Since this is a solo project, I take on the role of software engineer to handle all technical implementation            |
| Workplace Consultants | End-user feedback, requirements validation, user acceptance testing | Technical consultants who are the target users and provide real-world context for the utilisation tracking requirements |

### Project Risks

A project risk matrix is a visual assessment tool used to identify and prioritise risks based on their likelihood of occurrence and potential impact. To ensure project risks were actively considered throughout development, I created a risk matrix outlining potential risks, their likelihood, impact, and mitigation strategies. This approach enabled me to proactively manage risks and reduce the likelihood of significant issues arising during the development process.

| Risk ID | Risk Description                                                             | Risk Category         | Impact | Likelihood | Risk Level | Mitigation Strategy                                                                                                                           | Owner             |
| ------- | ---------------------------------------------------------------------------- | --------------------- | ------ | ---------- | ---------- | --------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- |
| R-01    | Third-party service dependency failure (Clerk authentication service outage) | External Dependencies | High   | Medium     | High       | Implement error handling in authentication flows, display user-friendly error messages when service is unavailable                            | Software Engineer |
| R-02    | Database connection failures or MongoDB Atlas service interruption           | Infrastructure        | High   | Medium     | High       | Handle database errors in GraphQL resolvers, provide meaningful error messages to users, test error handling using invalid connection strings | Software Engineer |
| R-03    | GraphQL API vulnerabilities or injection attacks through user input          | Security              | High   | Medium     | High       | Use existing validation functions for all user inputs, sanitise data before database operations, validate on both client and server           | Software Engineer |
| R-04    | Environment variable misconfiguration or exposure of sensitive credentials   | Security              | High   | Low        | Medium     | Keep environment variables out of version control, use environment templates, validate required env vars on app startup                       | Software Engineer |
| R-05    | Frontend-backend API compatibility issues during independent development     | Integration           | Medium | Medium     | Medium     | Keep TypeScript interfaces consistent between frontend and backend, test API calls during development                                         | Software Engineer |

## Project Management

### Project Management Tool

To organise and manage development tasks, I used GitHub Projects to create a Kanban board tailored to the needs of my project. As this was a solo project, the workflow was intentionally kept simple and focused on the stages most relevant to my development process.

#### Figure 2 - Utilisation Calculator Project Management Tool

![alt text](<assets/Project Management/Utilisation Calculator Project Management Tool.png>)

Figure 2 shows that the board consisted of the following columns:

- **To Do:** Tasks that had been created and were ready to be worked on. I followed the project roadmap to guide when tickets were created, meaning any task added to this column was already sufficiently defined and unblocked for development.

- **In Progress:** Tasks that were actively being developed, including both new features and bug fixes.

- **Done:** Tasks that had been completed and merged into the main branch, indicating that the associated functionality had been fully implemented and validated.

I did not include a separate **Review** column, as there were no external reviewers involved in this project. Instead, I reviewed my own changes during the pull request process before merging to ensure code quality, test coverage, and alignment with project requirements. Similarly, a dedicated **Ready** or **Backlog** column was not required, as tasks were only created or moved into the To Do column once they were ready to be worked on.

Using GitHub Projects alongside GitHub Issues provided a clear and centralised way to track progress throughout the development process. The Kanban board made it easy to see the current state of each task at a glance, helping me understand what was outstanding, what was actively being worked on, and what had already been completed. This visibility supported better task prioritisation and helped prevent context switching by allowing me to focus on a small number of active tasks at any given time. In addition, combining project boards with issue metadata such as labels and story points made it easier to assess remaining effort and plan development work efficiently, ensuring steady progress aligned with the project roadmap.

### Project Management Constraints

Typically, I work using Agile sprints in my professional role as part of a team of six to seven developers, testers, and business stakeholders, with regular sprint planning, showcases, and retrospectives. This approach is not practical for an individual academic project because, without a wider team to coordinate with or formal client-facing ceremonies to support, adopting sprint-based workflows would introduce unnecessary overhead without providing meaningful benefits.

I therefore chose a lightweight Kanban approach that prioritised flexibility and continuous progress. This allowed me to focus on delivering work incrementally while minimising work in progress and remaining responsive to unexpected issues. I do not believe that the absence of sprints negatively impacted my project management, however, if the project were to be expanded to include additional developers, testers, or business stakeholders, reintroducing a sprint-based Agile framework would be beneficial to support collaboration, planning, and review.

### Project Organisation

To manage development effectively and maintain a clear overview of progress, I established a structured approach to project organisation using GitHub’s built-in tooling. This approach focused on standardising how work was defined, prioritised, and tracked throughout the project lifecycle. By combining issue labels, story point estimation, and issue templates, I was able to organise tasks consistently, improve visibility across the backlog, and support more informed planning and decision-making during development.

#### GitHub Issue Labels

To support the organisation and management of this project, I made use of GitHub issue labels to structure and categorise work items. In my professional experience, I had not previously relied on labels, as pull request titles were typically descriptive enough to indicate the nature of changes (for example, feature or bug fixes), and each pull request was linked to a Jira ticket that already provided additional context such as whether the work related to frontend or backend changes, along with story point estimates. As a result, labels were not something I had previously considered necessary when working alongside more comprehensive tooling.

For this project, however, I introduced a set of custom GitHub labels to help prioritise tasks, indicate relative size, and categorise issues by type. The advantage of this approach was its flexibility, allowing me to tailor labels specifically to the needs of the project. These custom labels made it easier to filter and organise the backlog, quickly assess key information for each issue, and determine which tickets were best suited to be addressed next. Figure 3 shows the complete set of labels I created, designed to provide an at-a-glance overview of important information for each issue.

##### Figure 3 - Issues and Pull Request Labels

![alt text](<assets/Project Management/Issues and Pull Request Labels.png>)

#### GitHub Issue Story Points

To support consistent and realistic estimation throughout the project, I introduced custom story point labels within GitHub and assigned each issue a size based on the relative effort required to complete the work. These estimates considered factors such as task complexity, the level of uncertainty involved, and the potential impact of the change, rather than focusing on exact time estimates. I chose to use a Fibonacci-based scale for story points, as it provides a simple and repeatable method for comparing work items while naturally accounting for increasing uncertainty as task size grows.

To ensure estimates were applied consistently, I used the following table guide when assigning story points to each ticket. This allowed me to size tasks relative to one another based on my understanding of the system, the scope of the change, and my own technical knowledge at the time of estimation.

| Story Points | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| 0.5          | Extremely simple, fully understood work requiring virtually no effort                |
| 1            | Small, clearly defined task with no unknowns and minimal implementation effort       |
| 3            | Moderate complexity work that is mostly understood with minor uncertainty            |
| 5            | Larger or more involved task with multiple parts and clear uncertainty               |
| 8            | Highly complex work with significant unknowns or broad impact                        |
| 13           | Very large or high-risk work with substantial uncertainty and complexity             |
| 21           | Exceptionally large, end-to-end work with major uncertainty and sustained complexity |

#### GitHub Issue and Pull Request Templates

One of the initial stages of the project involved setting up issue and pull request templates to standardise the way work items were created and managed. These templates ensured that each issue and pull request followed a consistent structure by prompting predefined sections and key questions at the appropriate stages of development. To keep the templates relevant and focused, I created separate issue templates for feature requests and bug reports, as well as a dedicated pull request template to support consistent code review, validation, and traceability between changes and their associated issues.

##### Feature Template

Figure 4 shows the blank feature issue template before any details are entered. I designed this template to provide a consistent structure for documenting new features by including predefined sections such as Requirement ID, User Story, Description, Design Reference, Acceptance Criteria, Technical Notes, Tests, and Definition of Done. These sections reduce the effort required to create well-defined feature tickets by guiding the author to consider all relevant aspects of a feature upfront. The template helps ensure that each feature is clearly linked to project requirements, follows a consistent user story format, and includes clear acceptance criteria to support development and testing.

###### Figure 4 - Feature Issue Template

![alt text](<assets/Project Management/Feature Issue Template.png>)

##### Bug Template

Figure 5 shows the blank bug issue template before any details are entered. I created this template to capture all information necessary for efficient bug identification and resolution, including sections such as Bug ID, Description, Steps to Reproduce, Expected Behaviour, Actual Behaviour, Impact, Evidence, Tests, and Definition of Done. By prompting structured input, the template encourages clear reproduction steps and comparison of expected versus actual behaviour, making it easier to understand, prioritise, and resolve defects while reducing investigation time.

###### Figure 5 - Bug Issue Template

![alt text](<assets/Project Management/Bug Issue Template.png>)

##### Pull Request Template

Figure 6 shows the blank pull request template before any details are entered. I developed this template to maintain consistency when creating pull requests and ensure that all necessary information is captured before code review and merge. The template includes key sections such as Linked Issue, Summary, Design Reference, Screenshots, Acceptance Criteria, Testing, and Documentation. These predefined sections guide contributors to clearly describe their changes, link work back to relevant issues, and confirm that testing and documentation requirements are met.

###### Figure 6 - Pull Request Template

![alt text](<assets/Project Management/Pull Request Template.png>)

## Project Design

Figma Link: [Click Here to See!](https://www.figma.com/design/kHI3gZeL9tn4n9C5s6KGsp/UtilisationCalculator?node-id=0-1&p=f&t=fGPwGsHbZ9nXALW3-0)

### Design Approach

For the Utilisation Calculator interface, I adopted the Atomic Design methodology introduced by Brad Frost to structure the user interface in a clear and scalable way. Atomic Design breaks the interface into hierarchical layers, beginning with fundamental elements (atoms), combining them into functional groups (molecules), and assembling them into larger interface sections (organisms). I chose this approach because it establishes a consistent design system, encourages the creation of reusable and modular components, and supports long-term scalability as the application evolves. In addition, Atomic Design aligns closely with React’s component-based architecture, making it straightforward to translate design concepts into maintainable and well-structured frontend code.

### Atomic Design Structure

#### Atoms

##### CustomButton

The CustomButton design establishes the foundation for all interactive button elements throughout the Utilisation Calculator interface. This atomic component is designed to provide consistent styling, hover states, and click behaviours while supporting multiple visual variants to create clear interaction hierarchies (see Figure 7). The design addresses primary actions like calculate operations, secondary actions like form resets, and navigation actions throughout the application, ensuring a unified user experience across all button interactions.

###### Figure 7 - CustomButton Figma Design

![alt text](<assets/Project Design/atoms/CustomButtonOne Figma Design.png>)

![alt text](<assets/Project Design/atoms/CustomButtonTwo Figma Design.png>)

![alt text](<assets/Project Design/atoms/CustomButtonThree Figma Design.png>)

![alt text](<assets/Project Design/atoms/CustomButtonFour Figma Design.png>)

##### CustomDatePicker

The CustomDatePicker design provides users with an intuitive interface for selecting start and end dates for their utilisation calculations (see Figure 8). The design builds upon Material-UI's DatePicker foundation with custom styling to align with the application's design system, incorporating date validation, locale-specific formatting, and accessible keyboard navigation. The design ensures consistent date input across the application while preventing invalid date ranges that could compromise calculation accuracy.

###### Figure 8 - CustomDatePicker Figma Design

![alt text](<assets/Project Design/atoms/CustomDatePicker Figma Design.png>)

##### CustomDivider

The CustomDivider design provides visual separation between different sections of the interface, helping to organise content and improve readability (see Figure 9). This simple yet essential atomic element is designed to maintain consistent spacing and styling throughout the application, supporting both horizontal and vertical orientations as needed. The design plays a crucial role in establishing visual hierarchy and content organisation within forms, results displays, and historical data sections.

###### Figure 9 - CustomDivider Figma Design

![alt text](<assets/Project Design/atoms/CustomDivider Figma Design.png>)

##### CustomTypography

The CustomTypography design establishes consistent text styling and hierarchy throughout the Utilisation Calculator interface (see Figure 10). This foundational design element defines standardised font families, sizes, weights, and colours for headings, body text, labels, and captions. By centralising typography rules in the design system, this element ensures readable and accessible text presentation while maintaining visual consistency across all areas of the application, from form labels to calculation results.

###### Figure 10 - CustomTypography Figma Design

![alt text](<assets/Project Design/atoms/CustomTypography Figma Design.png>)

##### CustomPagination

The CustomPagination design enables users to navigate through large sets of historical utilisation data efficiently (see Figure 11). This design provides intuitive page navigation controls with clear indicators for current page position, total pages, and navigation options. The design incorporates accessibility features like keyboard navigation and screen reader compatibility, ensuring all users can effectively browse through their utilisation calculation history regardless of dataset size.

###### Figure 11 - CustomPagination Figma Design

![alt text](<assets/Project Design/atoms/CustomPagination Figma Design.png>)

##### CustomProgressBar

The CustomProgressBar design provides visual representation of utilisation percentages and target achievement status within calculation results (see Figure 12). This design dynamically displays progress levels with colour-coded indicators to quickly communicate whether targets have been met, exceeded, or fallen short. The design includes smooth animations and clear percentage labels, making it easy for users to understand their utilisation performance at a glance.

###### Figure 12 - CustomProgressBar Figma Design

![alt text](<assets/Project Design/atoms/CustomProgressBar Figma Design.png>)

##### CustomTextField

The CustomTextField design serves as the primary input element for collecting numerical data such as total hours, billable hours, and target utilisation percentages (see Figure 13). The design incorporates comprehensive validation, error handling, and accessibility features to ensure data integrity while providing clear feedback for invalid inputs. The design supports different input types, placeholder text, and helper text to guide users through the data entry process effectively.

###### Figure 13 - CustomTextField Figma Design

![alt text](<assets/Project Design/atoms/CustomTextField Figma Design.png>)

##### CustomTooltip

The CustomTooltip design provides contextual help and additional information throughout the application interface (see Figure 14). This design displays helpful hints, field descriptions, and calculation explanations when users hover over or focus on specific elements. The design enhances user experience by offering guidance without cluttering the interface, particularly useful for explaining utilisation calculation concepts and input requirements to new users.

###### Figure 14 - CustomTooltip Figma Design

![alt text](<assets/Project Design/atoms/CustomTooltip Figma Design.png>)

##### CustomLoader

The CustomLoader design provides visual feedback during asynchronous operations such as user authentication, data processing, and calculation execution (see Figure 15). This design displays an animated spinner with consistent styling and timing to indicate that the system is actively working. The design includes optional text labels to provide context about the current operation, helping users understand that their request is being processed and maintain confidence in the application's responsiveness.

###### Figure 15 - CustomLoader Figma Design

![alt text](<assets/Project Design/atoms/CustomLoader Figma Design.png>)

#### Molecules

##### CustomToolbar

The CustomToolbar design combines CustomTypography and CustomButton atoms to create a cohesive navigation header that provides users with clear application branding and navigation options (see Figure 16). This molecule integrates multiple atomic elements to establish consistent spacing, typography hierarchy, and interactive elements that guide users through the application's primary functions. The design serves as a foundational navigation element that appears across all application views, ensuring users always have access to core functionality.

###### Figure 16 - CustomToolbar Figma Design

![alt text](<assets/Project Design/molecules/CustomToolbar Figma Design.png>)

##### UtilisationCalculatorMoleculeStep1Header

The UtilisationCalculatorMoleculeStep1Header design combines CustomTypography atoms with CustomDivider elements to create a clear, informative section header for the utilisation input form (see Figure 17). This molecule establishes visual hierarchy by combining different typography weights and sizes with strategic spacing elements, helping users understand they are beginning the calculation input process. The design provides contextual information and visual separation that guides users through the multi-step utilisation calculation workflow.

###### Figure 17 - UtilisationCalculatorMoleculeStep1Header Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1Header Figma Design.png>)

##### UtilisationCalculatorMoleculeStep1StartDate

The UtilisationCalculatorMoleculeStep1StartDate design combines CustomTypography labels, CustomDatePicker input, and CustomTooltip guidance atoms to create a comprehensive date selection interface for calculation periods (see Figure 18). This molecule integrates validation feedback, accessibility features, and contextual help to ensure users can accurately select their calculation start date. The design combines multiple atomic elements to provide clear labeling, intuitive date selection, and helpful guidance for users unfamiliar with utilisation calculation requirements.

###### Figure 18 - UtilisationCalculatorMoleculeStep1StartDate Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1StartDate Figma Design.png>)

##### UtilisationCalculatorMoleculeStep1EndDate

The UtilisationCalculatorMoleculeStep1EndDate design combines CustomTypography labels, CustomDatePicker input, and CustomTooltip guidance atoms to create the complementary date selection interface for calculation period completion (see Figure 19). This molecule works in conjunction with the start date molecule to ensure proper date range validation and user guidance. The design integrates validation logic that prevents invalid date ranges while providing clear visual feedback and contextual help to guide users through accurate period selection.

###### Figure 19 - UtilisationCalculatorMoleculeStep1EndDate Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1EndDate Figma Design.png>)

##### UtilisationCalculatorMoleculeStep1TotalHours

The UtilisationCalculatorMoleculeStep1TotalHours design combines CustomTypography labels, CustomTextField input, and CustomTooltip guidance atoms to create a comprehensive numerical input interface for total working hours (see Figure 20). This molecule integrates input validation, error handling, and contextual explanations to ensure users understand and accurately enter their total available working hours. The design combines clear labeling, intuitive input controls, and helpful guidance to support users in providing accurate data for utilisation calculations.

###### Figure 20 - UtilisationCalculatorMoleculeStep1TotalHours Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1TotalHours Figma Design.png>)

##### UtilisationCalculatorMoleculeStep1BillableHours

The UtilisationCalculatorMoleculeStep1BillableHours design combines CustomTypography labels, CustomTextField input, and CustomTooltip guidance atoms to create a focused numerical input interface for billable working hours (see Figure 21). This molecule includes sophisticated validation logic that ensures billable hours cannot exceed total hours, while providing clear feedback and guidance to users. The design integrates contextual help that explains the relationship between billable and total hours, supporting accurate data entry crucial for meaningful utilisation calculations.

###### Figure 21 - UtilisationCalculatorMoleculeStep1BillableHours Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1BillableHours Figma Design.png>)

##### UtilisationCalculatorMoleculeStep1TargetUtilisation

The UtilisationCalculatorMoleculeStep1TargetUtilisation design combines CustomTypography labels, CustomTextField input, and CustomTooltip guidance atoms to create an interface for setting utilisation performance targets (see Figure 22). This molecule integrates percentage-based input validation with contextual explanations about typical utilisation targets across different industries and roles. The design provides guidance on realistic target setting while ensuring data integrity through comprehensive validation and user-friendly error messaging.

###### Figure 22 - UtilisationCalculatorMoleculeStep1TargetUtilisation Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1TargetUtilisation Figma Design.png>)

##### UtilisationCalculatorMoleculeStep1Buttons

The UtilisationCalculatorMoleculeStep1Buttons design combines multiple CustomButton atoms with strategic spacing and hierarchy to create a clear action interface for form submission and navigation (see Figure 23). This molecule integrates primary and secondary button styling with consistent spacing and alignment, providing users with clear options for progressing through the calculation workflow or clearing their input data. The design ensures proper visual hierarchy and accessibility while maintaining consistent button behavior across the application.

###### Figure 23 - UtilisationCalculatorMoleculeStep1Buttons Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1Buttons Figma Design.png>)

##### UtilisationCalculatorMoleculeStep4Header

The UtilisationCalculatorMoleculeStep4Header design combines CustomTypography atoms with CustomDivider elements to create an informative section header for the calculation results display (see Figure 24). This molecule establishes clear visual separation between the input and results phases of the user journey, using typography hierarchy and spacing to signal the transition to calculation outcomes. The design provides contextual information that helps users understand they are viewing their utilisation calculation results and performance analysis.

###### Figure 24 - UtilisationCalculatorMoleculeStep4Header Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep4Header Figma Design.png>)

##### UtilisationCalculatorMoleculeStep4LabelledProgressBar

The UtilisationCalculatorMoleculeStep4LabelledProgressBar design combines CustomTypography labels, CustomProgressBar visualization, and percentage indicators to create a comprehensive utilisation performance display (see Figure 25). This molecule integrates visual progress representation with textual context, showing both current utilisation percentage and target comparison in an immediately understandable format. The design uses color coding and clear labeling to help users quickly assess their performance relative to their stated targets.

###### Figure 25 - UtilisationCalculatorMoleculeStep4LabelledProgressBar Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep4LabelledProgressBar Figma Design.png>)

##### UtilisationCalculatorMoleculeStep4UtilisationSummaryCard

The UtilisationCalculatorMoleculeStep4UtilisationSummaryCard design combines CustomTypography elements, CustomDivider separators, and structured layout atoms to create a comprehensive results summary interface (see Figure 26). This molecule integrates multiple data points including calculated utilisation percentage, target comparison, and period details into a cohesive, scannable card format. The design uses visual hierarchy and strategic spacing to present complex calculation results in an accessible, professional format that users can easily understand and reference.

###### Figure 26 - UtilisationCalculatorMoleculeStep4UtilisationSummaryCard Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep4UtilisationSummaryCard Figma Design.png>)

##### UtilisationHistoryMoleculeStep1Header

The UtilisationHistoryMoleculeStep1Header design combines CustomTypography atoms with CustomDivider elements to create a clear section header for the utilisation history interface (see Figure 27). This molecule establishes visual hierarchy that helps users understand they are transitioning to historical data review, using typography weight and spacing to differentiate the history section from active calculation areas. The design provides contextual framing that prepares users to browse and analyze their previous utilisation calculations.

###### Figure 27- UtilisationHistoryMoleculeStep1Header Figma Design

![alt text](<assets/Project Design/molecules/UtilisationHistoryMoleculeStep1Header Figma Design.png>)

##### UtilisationHistoryMoleculeStep1HistoryCard

The UtilisationHistoryMoleculeStep1HistoryCard design combines CustomTypography elements, CustomProgressBar visualizations, and CustomButton actions to create a comprehensive historical record interface (see Figure 28). This molecule integrates multiple atomic components to display calculation date, utilisation percentage, target comparison, and available actions within a structured card format. The design enables users to quickly scan their calculation history while providing clear options for reviewing details or removing outdated records.

###### Figure 28 - UtilisationHistoryMoleculeStep1HistoryCard Figma Design

![alt text](<assets/Project Design/molecules/UtilisationHistoryMoleculeStep1HistoryCard Figma Design.png>)

#### Organisms

##### CustomAppBar

The CustomAppBar design combines the CustomToolbar molecule with application-wide navigation and branding elements to create a comprehensive header that spans the entire application interface (see Figure 29). This organism integrates multiple molecular components including navigation controls, user account indicators, and application branding to establish a consistent top-level interface that provides users with orientation and access to primary application functions. The design ensures users always understand their current location within the application while providing seamless navigation between calculation input, results review, and historical data sections.

###### Figure 29 - CustomAppBar Figma Design

![alt text](<assets/Project Design/organisms/CustomAppBar Figma Design.png>)

##### UtilisationCalculatorOrganism (Input)

The UtilisationCalculatorOrganism (Input) design combines multiple Step1 molecules including header, date selection, hours input, target setting, and action button groups to create a comprehensive utilisation calculation input interface (see Figure 30). This organism orchestrates the complete data collection workflow by integrating UtilisationCalculatorMoleculeStep1Header, date selection molecules, numerical input molecules, and button control molecules into a cohesive form experience. The design manages the complex relationships between input validation, user guidance, and workflow progression to ensure users can accurately and efficiently provide all necessary data for utilisation calculations.

###### Figure 30 - UtilisationCalculatorOrganism (Input) Figma Design

![alt text](<assets/Project Design/organisms/UtilisationCalculatorOrganism (Input) Figma Design.png>)

##### UtilisationCalculatorOrganism (Result)

The UtilisationCalculatorOrganism (Result) design combines Step4 molecules including results header, labeled progress bars, and utilisation summary cards to create a comprehensive calculation results display interface (see Figure 31). This organism integrates UtilisationCalculatorMoleculeStep4Header, progress visualization molecules, and summary card molecules to present complex calculation outcomes in an accessible, actionable format. The design orchestrates multiple data visualizations and textual summaries to help users immediately understand their utilisation performance, target achievement status, and actionable insights for improvement.

###### Figure 31 - UtilisationCalculatorOrganism (Result) Figma Design

![alt text](<assets/Project Design/organisms/UtilisationCalculatorOrganism (Result) Figma Design.png>)

##### UtilisationHistoryOrganism

The UtilisationHistoryOrganism design combines UtilisationHistoryMoleculeStep1Header, history card molecules, and pagination controls to create a comprehensive historical data browsing and management interface (see Figure 32). This organism integrates header molecules, individual history card molecules, and pagination molecules to enable users to efficiently browse, review, and manage their utilisation calculation history. The design orchestrates complex data presentation including chronological ordering, performance comparisons, and record management actions within a scalable interface that maintains usability regardless of historical data volume.

###### Figure 32 - UtilisationHistoryOrganism Figma Design

![alt text](<assets/Project Design/organisms/UtilisationHistoryOrganism Figma Design.png>)

### Final Interface Layouts

The final interface layouts demonstrate how atomic, molecular, and organism-level components are assembled into the complete Utilisation Calculator application screens across all supported devices. These layouts reflect my mobile-first responsive design approach, where core functionality is established on smaller screens and progressively enhanced as additional screen space becomes available. Layout adjustments are primarily driven by screen width, resulting in distinct interface behaviours across the supported devices:

- **Desktop (≥1024px):** Uses the full width of the screen with a side-by-side layout, allowing users to enter data and view utilisation history at the same time without the need for scrolling.

- **Laptop (768px–1023px):** Retains the two-column layout found on desktop, with adjusted spacing to suit smaller screens while keeping both the calculator and history visible together.

- **Tablet (500px–767px):** Maintains the same side-by-side layout as desktop and laptop, with tighter spacing to accommodate reduced horizontal width while keeping both sections visible at once.

- **Large Mobile (390px–499px):** Switches to a vertical layout where the calculator and utilisation history stack on top of each other, with touch-friendly spacing and scrolling enabled.

- **Small Mobile (<390px):** Uses the same vertical layout as large mobile devices, but with more compact spacing and condensed components to maximise usable screen space.

Across all breakpoints, I use the same components consistently, with layout and spacing adapting to fit the available space. Rather than changing how components work, the interface adjusts how content is arranged, ensuring the application remains clear, easy to use, and visually consistent across all devices.

#### Figure 33 - Utilisation Calculator (Input) Desktop Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Desktop Device Media Screen Final Figma Design.png>)

#### Figure 34 - Utilisation Calculator (Input) Laptop Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Laptop Device Media Screen Final Figma Design.png>)

#### Figure 35 - Utilisation Calculator (Input) Tablet Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Tablet Device Media Screen Final Figma Design.png>)

#### Figure 36 - Utilisation Calculator (Input) Large Phone Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Large Phone Device Media Screen Final Figma Design.png>)

#### Figure 37 - Utilisation Calculator (Input) Small Phone Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Small Phone Device Media Screen Final Figma Design.png>)

#### Figure 38 - Utilisation Calculator (Result) Desktop Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Desktop Device Media Screen Final Figma Design.png>)

#### Figure 39 - Utilisation Calculator (Result) Laptop Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Laptop Device Media Screen Final Figma Design.png>)

#### Figure 40 - Utilisation Calculator (Result) Tablet Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Tablet Device Media Screen Final Figma Design.png>)

#### Figure 41 - Utilisation Calculator (Result) Large Phone Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Large Phone Device Media Screen Final Figma Design.png>)

#### Figure 42 - Utilisation Calculator (Result) Small Phone Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Small Phone Device Media Screen Final Figma Design.png>)
