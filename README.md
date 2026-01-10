# Project Overview

**Production Environment:** https://utilisationcalculator.com

**Figma Link:** [Click Here to See!](https://www.figma.com/design/kHI3gZeL9tn4n9C5s6KGsp/UtilisationCalculator?node-id=0-1&p=f&t=fGPwGsHbZ9nXALW3-0)

## Project Introduction

### Project Overview and Purpose

The Utilisation Calculator is a full-stack web application that I developed as a university assignment to support my workplace’s technical consulting teams in tracking billable utilisation performance. The application uses a GraphQL API backend built with Node.js and TypeScript, connected to a MongoDB database via Prisma ORM, with a React and TypeScript frontend styled using SCSS. It enables users to initialise profiles, calculate utilisation rates based on worked hours and target thresholds, and view historical performance data.

The purpose of my project is to address a gap in utilisation tracking within my workplace. Existing timesheet reports are generated quarterly, providing limited visibility during the reporting period and forcing consultants to rely on manual spreadsheet calculations. My project replaces spreadsheets with a dedicated web-based tool that supports mid-quarter utilisation calculations and projections, enabling more informed performance planning.

### Project Roadmap

#### Figure 1 - Utilisation Calculator Project Roadmap

![alt text](<assets/Project Overview/Utilisation Calculator Project Roadmap.png>)

## Project Requirements

For this project, I identified and documented requirements across functional, non-functional, and security categories to clearly define system behaviour, quality constraints, and protection mechanisms. This structured approach helped me ensure the project scope was well understood and provided a clear foundation for planning, development, and prioritisation.

### Functional Requirements

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

### Non-Functional Requirements

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

### Security Requirements

Security requirements define the measures and controls that must be implemented to protect the system from unauthorised access, data breaches, and other security threats.

| Req ID | Requirement                      | Description                                                                                                                  |
| ------ | -------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| SR-01  | Authentication Integration       | The system shall integrate with the Clerk authentication service for secure user authentication.                             |
| SR-02  | Authorisation and Access Control | The system shall ensure users can only access and manage their own utilisation data through enforced authorisation controls. |
| SR-03  | Token Validation                 | The system shall validate authentication tokens for presence, format, and integrity before processing requests.              |
| SR-04  | Environment Security             | The system shall securely manage environment variables, including secret keys and API credentials.                           |
| SR-05  | CORS Configuration               | The system shall enforce Cross-Origin Resource Sharing (CORS) policies to restrict access from unauthorised domains.         |

## Project User Personas

To support a clear understanding of the defined project requirements, I have created a set of user personas that represent the intended users of the system. These personas describe who the users are, what they are trying to achieve, and the key needs the application must support. They help guide development by keeping the design and functionality aligned to real user goals, while also reducing the risk of scope creep and supporting prioritisation of features.

### User Persona 1: Consultant (Primary User)

**Role:** Technical Consultant  
**Goal:** Track and improve billable utilisation during the quarter.  
**Key needs:**

- Create or initialise a profile to store utilisation data securely.
- Enter a date range, total hours, billable hours, and a target percentage to calculate utilisation.
- Receive clear results showing utilisation percentage, target status, and timestamp.

### User Persona 2: Consultant Tracking Performance Trends (Returning User)

**Role:** Senior Management Consultant  
**Goal:** Monitor utilisation patterns over time to understand performance trends.  
**Key needs:**

- View previous utilisation calculations in a structured list.
- Maintain accurate history by removing incorrect or outdated records when needed.

### User Persona 3: Consultant Needing Validation Support (Occasional User)

**Role:** Junior Management Consultant  
**Goal:** Complete calculations correctly without confusion or incorrect inputs.  
**Key needs:**

- Receive immediate and clear validation feedback when input is invalid.
- Understand what needs to be corrected (e.g., date ranges, positive numeric values, billable hours not exceeding total hours).

## Project Empathy Diagrams

### Primary Person: Technical Consultant (Kathy Theodora)

**Background**

- **Name:** Kathy Theodora
- **Role:** Senior Technical Consultant
- **Experience:** 5 years
- **Challenge:** Tracking utilisation via spreadsheets

#### Empathy Diagram

**SAYS**

- “I don’t know if I’m on target until the quarterly report”.
- “I’m worried my spreadsheet calculations are wrong”.
- “I want to track progress during the quarter”.

**THINKS**

- “Am I calculating this correctly?”
- “I need a better way than Excel”.
- “If I track earlier, I can adjust sooner”.

**DOES**

- Updates Excel regularly.
- Manually calculates utilisation.
- Double-checks formulas.
- Waits for quarterly reporting.

**FEELS**

- Frustrated with admin work.
- Uncertain about performance.
- Anxious about errors.
- Relieved when results confirm she’s on track.

**PAIN POINTS**

- No mid-quarter visibility.
- Spreadsheet errors and inconsistency.
- Time-consuming manual tracking.

**GOALS**

- Quick, accurate utilisation calculation.
- Mid-quarter performance insight.
- Track trends over time.

### Secondary Person: Consulting Manager (Robbin Stanford)

**Background**

- **Name:** Robbin Stanford
- **Role:** Practice Manager
- **Experience:** 8 years
- **Challenge:** Supporting team utilisation without real-time visibility

#### Empathy Diagram

**SAYS**

- “Quarterly reports are too late”.
- “Consultants need an easier way to track utilisation”.
- “We should be proactive, not reactive.”

**THINKS**

- “My team needs self-service tools”.
- “Spreadsheets don’t scale”.
- “Consistency would reduce confusion”.

**DOES**

- Reviews quarterly reports.
- Discusses utilisation in 1:1s.
- Shares spreadsheet templates.
- Responds when issues appear.

**FEELS**

- Responsible for team outcomes.
- Frustrated by limited visibility.
- Supportive but restricted by tooling.

**PAIN POINTS**

- Late insight into performance issues.
- Inconsistent calculation methods across the team.
- Manual processes don’t scale.

**GOALS**

- Enable consultants to self-monitor.
- Earlier identification of utilisation risk.
- Standardised tracking approach.

# Project Management

## Project Management Tool

To organise and manage development tasks, I used GitHub Projects to create a Kanban board tailored to the needs of my project. As this was a solo project, I intentionally kept the workflow simple and focused on the stages most relevant to my development process.

### Figure 2 - Utilisation Calculator Project Management Tool

![alt text](<assets/Project Management/Utilisation Calculator Project Management Tool.png>)

Figure 2 shows that the board consisted of the following columns:

- **To Do:** Tasks that had been created and were ready to be worked on. I followed the project roadmap to guide me when tickets were created, meaning any task added to this column was already sufficiently defined and unblocked for development.

- **In Progress:** Tasks that were actively being developed, including both new features and bug fixes.

- **Done:** Tasks that had been completed and merged into the develop branch, indicating that the associated functionality had been fully implemented and validated.

I did not include a separate Review column, as there were no external reviewers involved in this project. Instead, I reviewed my own changes during the pull request process before merging to ensure code quality, test coverage, and alignment with project requirements. Similarly, a dedicated Ready or Backlog column was not required, as tasks were only created or moved into the To Do column once they were ready to be worked on.

Using GitHub Projects alongside GitHub Issues provided a clear and centralised way for me to track progress throughout the development process. The Kanban board made it easy to see the current state of each task at a glance, helping me understand what was outstanding, what was actively being worked on, and what had already been completed. This visibility supported better task prioritisation and helped prevent context switching by allowing me to focus on a small number of active tasks at any given time. In addition, combining project boards with issue metadata such as labels and story points made it easier for me to assess remaining effort and plan development work efficiently, ensuring steady progress aligned with the project roadmap.

## Project Management Constraints

Typically, I work using Agile sprints in my professional role as part of a team of six to seven developers, testers, and business stakeholders, with regular sprint planning, showcases, and retrospectives. This approach is not practical for an individual academic project because, without a wider team to coordinate with or formal client-facing ceremonies to support, adopting sprint-based workflows would introduce unnecessary overhead without providing meaningful benefits.

I therefore chose a lightweight Kanban approach that prioritised flexibility and continuous progress. This allowed me to focus on delivering work incrementally while minimising work in progress and remaining responsive to unexpected issues. I do not believe that the absence of sprints negatively impacted my project management, however, if the project were to be expanded to include additional developers, testers, or business stakeholders, reintroducing a sprint-based Agile framework would be beneficial to support collaboration, planning, and review.

## Project Organisation

To manage development effectively and maintain a clear overview of progress, I established a structured approach to project organisation using GitHub’s built-in tooling. This approach focused on standardising how work was defined, prioritised, and tracked throughout the project lifecycle. By combining issue labels, story point estimation, and issue templates, I was able to organise tasks consistently, improve visibility across the backlog, and support more informed planning and decision-making during development.

### GitHub Issue Labels

To support the organisation and management of this project, I made use of GitHub issue labels to structure and categorise work items. In my professional experience, I had not previously relied on labels, as pull request titles were typically descriptive enough to indicate the nature of changes (for example, feature or bug fixes), and each pull request was linked to a Jira ticket that already provided additional context such as whether the work related to frontend or backend changes, along with story point estimates. As a result, labels were not something I had previously considered necessary when working alongside more comprehensive tooling.

For this project, however, I introduced a set of custom GitHub labels to help prioritise tasks, indicate relative size, and categorise issues by type. The advantage of this approach was its flexibility, allowing me to tailor labels specifically to the needs of the project. These custom labels made it easier to filter and organise the backlog, quickly assess key information for each issue, and determine which tickets were best suited to be addressed next. Figure 3 shows the complete set of labels I created, designed to provide an at-a-glance overview of important information for each issue.

#### Figure 3 - Issues and Pull Request Labels

![alt text](<assets/Project Management/Issues and Pull Request Labels.png>)

### GitHub Issue Story Points

To support consistent and realistic estimation throughout the project, I introduced custom story point labels within GitHub and assigned each issue a size based on the relative effort required to complete the work. The story points considered factors such as task complexity, the level of uncertainty involved, and the potential impact of the change, rather than focusing on exact time estimates. I chose to use a Fibonacci-based scale for story points, as it provides a simple and repeatable method for comparing work items while naturally accounting for increasing uncertainty as task size grows.

To ensure I applied estimates consistently, I used the following table guide when assigning story points to each ticket. This allowed me to size tasks relative to one another based on my understanding of the system, the scope of the change, and my own technical knowledge at the time of estimation.

| Story Points | Description                                                                          |
| ------------ | ------------------------------------------------------------------------------------ |
| 0.5          | Extremely simple, fully understood work requiring virtually no effort                |
| 1            | Small, clearly defined task with no unknowns and minimal implementation effort       |
| 3            | Moderate complexity work that is mostly understood with minor uncertainty            |
| 5            | Larger or more involved task with multiple parts and clear uncertainty               |
| 8            | Highly complex work with significant unknowns or broad impact                        |
| 13           | Very large or high-risk work with substantial uncertainty and complexity             |
| 21           | Exceptionally large, end-to-end work with major uncertainty and sustained complexity |

### GitHub Issue and Pull Request Templates

One of the initial stages of the project involved me setting up issue and pull request templates to standardise the way work items were created and managed. These templates ensured that each issue and pull request followed a consistent structure by prompting me to fill out predefined sections and key questions at the appropriate stages of development. To keep the templates relevant and focused, I created separate issue templates for feature requests and bug reports, as well as a dedicated pull request template to support consistent code review, validation, and traceability between changes and their associated issues.

#### Feature Template

Figure 4 shows the blank feature issue template before any details are entered. I designed this template to provide a consistent structure for documenting new features by including predefined sections such as Requirement ID, User Story, Description, Design Reference, Acceptance Criteria, Technical Notes, Tests, and Definition of Done. These sections reduce the effort required to create well-defined feature tickets by guiding me to consider all relevant aspects of a feature upfront. The template helps ensure that each feature is clearly linked to project requirements, follows a consistent user story format, and includes clear acceptance criteria to support development and testing.

##### Figure 4 - Feature Issue Template

![alt text](<assets/Project Management/Feature Issue Template.png>)

#### Bug Template

Figure 5 shows the blank bug issue template before any details are entered. I created this template to capture all information necessary for efficient bug identification and resolution, including sections such as Bug ID, Description, Steps to Reproduce, Expected Behaviour, Actual Behaviour, Impact, Evidence, Tests, and Definition of Done. By prompting structured input, the template encourages clear reproduction steps and comparison of expected versus actual behaviour, making it easier for me to understand, prioritise, and resolve defects while reducing investigation time.

##### Figure 5 - Bug Issue Template

![alt text](<assets/Project Management/Bug Issue Template.png>)

#### Pull Request Template

Figure 6 shows the blank pull request template before any details are entered. I developed this template to maintain consistency when creating pull requests and ensure that all necessary information is captured before code review and merge. The template includes key sections such as Linked Issue, Summary, Design Reference, Screenshots, Acceptance Criteria, Testing, and Documentation. These predefined sections guide me to clearly describe my changes, link work back to relevant issues, and confirm that testing and documentation requirements are met.

##### Figure 6 - Pull Request Template

![alt text](<assets/Project Management/Pull Request Template.png>)

# Project Design

Figma Link: [Click Here to See!](https://www.figma.com/design/kHI3gZeL9tn4n9C5s6KGsp/UtilisationCalculator?node-id=0-1&p=f&t=fGPwGsHbZ9nXALW3-0)

## Design Approach

For the Utilisation Calculator interface, I adopted the Atomic Design methodology introduced by Brad Frost to structure the user interface in a clear and scalable way. Atomic Design breaks the interface into hierarchical layers, beginning with fundamental elements (atoms), combining them into functional groups (molecules), and assembling them into larger interface sections (organisms). I chose this approach because it establishes a consistent design system, encourages the creation of reusable and modular components, and supports long-term scalability as the application evolves. In addition, Atomic Design aligns closely with React’s component-based architecture, making it straightforward to translate design concepts into maintainable and well-structured frontend code.

## Atomic Design Structure

### Atoms

#### CustomButton

I designed CustomButton as the standard button component used across the Utilisation Calculator interface. It enforces consistent styling and interaction behaviour while providing a small set of visual variants to clearly distinguish between different user actions (see Figure 7).

##### Figure 7 - CustomButton Figma Design

![alt text](<assets/Project Design/atoms/CustomButtonOne Figma Design.png>)

![alt text](<assets/Project Design/atoms/CustomButtonTwo Figma Design.png>)

![alt text](<assets/Project Design/atoms/CustomButtonThree Figma Design.png>)

![alt text](<assets/Project Design/atoms/CustomButtonFour Figma Design.png>)

#### CustomDatePicker

I designed CustomDatePicker to handle start and end date selection for utilisation calculations in a consistent and accessible way. It extends Material-UI’s DatePicker with custom styling, validation, and keyboard support to ensure reliable and user-friendly date input (see Figure 8).

##### Figure 8 - CustomDatePicker Figma Design

![alt text](<assets/Project Design/atoms/CustomDatePicker Figma Design.png>)

#### CustomDivider

I designed CustomDivider to provide consistent visual separation between sections of the interface. It helps organise content and maintain a clear visual hierarchy across forms, results, and historical data views (see Figure 9).

##### Figure 9 - CustomDivider Figma Design

![alt text](<assets/Project Design/atoms/CustomDivider Figma Design.png>)

#### CustomTypography

I designed CustomTypography to standardise text styling across the application. It defines consistent font sizes, weights, and colours to ensure readability, accessibility, and ease of maintenance (see Figure 10).

##### Figure 10 - CustomTypography Figma Design

![alt text](<assets/Project Design/atoms/CustomTypography Figma Design.png>)

#### CustomPagination

I designed CustomPagination to support navigation through larger sets of historical utilisation data. It provides clear page controls with keyboard and screen reader support to ensure accessibility and usability (see Figure 11).

##### Figure 11 - CustomPagination Figma Design

![alt text](<assets/Project Design/atoms/CustomPagination Figma Design.png>)

#### CustomProgressBar

I designed CustomProgressBar to visually represent utilisation percentages and progress toward targets. It uses colour-coded indicators to communicate status clearly and at a glance (see Figure 12).

##### Figure 12 - CustomProgressBar Figma Design

![alt text](<assets/Project Design/atoms/CustomProgressBar Figma Design.png>)

#### CustomTextField

I designed CustomTextField as the standard input component for capturing numerical utilisation data. It includes validation and error handling to prevent invalid input and provide clear feedback to users (see Figure 13).

##### Figure 13 - CustomTextField Figma Design

![alt text](<assets/Project Design/atoms/CustomTextField Figma Design.png>)

#### CustomTooltip

I designed CustomTooltip to provide contextual assistance through an information icon. It displays explanatory text on hover to clarify utilisation-related inputs and calculations without cluttering the interface (see Figure 14).

##### Figure 14 - CustomTooltip Figma Design

![alt text](<assets/Project Design/atoms/CustomTooltip Figma Design.png>)

#### CustomLoader

I designed CustomLoader to provide visual feedback during asynchronous operations such as data loading and calculations. It displays an animated progress indicator to clearly communicate that a request is in progress (see Figure 15).

##### Figure 15 - CustomLoader Figma Design

![alt text](<assets/Project Design/atoms/CustomLoader Figma Design.png>)

### Molecules

#### CustomToolbar

I designed CustomToolbar as the primary navigation header for the application. It combines CustomTypography for branding and context with a Clerk sign-out action, and is displayed consistently across all views to provide a clear and familiar navigation point (see Figure 16).

##### Figure 16 - CustomToolbar Figma Design

![alt text](<assets/Project Design/molecules/CustomToolbar Figma Design.png>)

#### UtilisationCalculatorMoleculeStep1Header

I designed UtilisationCalculatorMoleculeStep1Header to introduce the first step of the utilisation input process. It combines CustomTypography with CustomTooltip to explain how user input is used before data entry begins (see Figure 17).

##### Figure 17 - UtilisationCalculatorMoleculeStep1Header Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1Header Figma Design.png>)

#### UtilisationCalculatorMoleculeStep1StartDate

I designed UtilisationCalculatorMoleculeStep1StartDate to capture the start date for utilisation calculations. It combines CustomTypography with CustomDatePicker and includes validation to ensure valid date selection (see Figure 18).

##### Figure 18 - UtilisationCalculatorMoleculeStep1StartDate Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1StartDate Figma Design.png>)

#### UtilisationCalculatorMoleculeStep1EndDate

I designed UtilisationCalculatorMoleculeStep1EndDate to capture the end date for the calculation period. It combines CustomTypography with CustomDatePicker and includes validation to prevent invalid date ranges (see Figure 19).

##### Figure 19 - UtilisationCalculatorMoleculeStep1EndDate Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1EndDate Figma Design.png>)

#### UtilisationCalculatorMoleculeStep1TotalHours

I designed UtilisationCalculatorMoleculeStep1TotalHours to capture total working hours for the selected period. It combines CustomTypography with CustomTextField and includes validation to ensure numerical input (see Figure 20).

##### Figure 20 - UtilisationCalculatorMoleculeStep1TotalHours Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1TotalHours Figma Design.png>)

#### UtilisationCalculatorMoleculeStep1BillableHours

I designed UtilisationCalculatorMoleculeStep1BillableHours to capture billable working hours. It combines CustomTypography with CustomTextField and includes validation to ensure numerical input (see Figure 21).

##### Figure 21 - UtilisationCalculatorMoleculeStep1BillableHours Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1BillableHours Figma Design.png>)

#### UtilisationCalculatorMoleculeStep1TargetUtilisation

I designed UtilisationCalculatorMoleculeStep1TargetUtilisation to capture the target utilisation percentage. It combines CustomTypography with CustomTextField and includes validation to prevent invalid percentage values (see Figure 22).

##### Figure 22 - UtilisationCalculatorMoleculeStep1TargetUtilisation Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1TargetUtilisation Figma Design.png>)

#### UtilisationCalculatorMoleculeStep1Buttons

I designed UtilisationCalculatorMoleculeStep1Buttons to group the primary form actions for utilisation input. It combines two CustomButton atoms for submission and reset, using consistent spacing and styling to clearly communicate available actions (see Figure 23).

##### Figure 23 - UtilisationCalculatorMoleculeStep1Buttons Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep1Buttons Figma Design.png>)

#### UtilisationCalculatorMoleculeStep4Header

I designed UtilisationCalculatorMoleculeStep4Header to introduce the calculation results section. It uses CustomTypography for the section heading and a CustomButton to allow users to dismiss the results view (see Figure 24).

##### Figure 24 - UtilisationCalculatorMoleculeStep4Header Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep4Header Figma Design.png>)

#### UtilisationCalculatorMoleculeStep4LabeledProgressBar

I designed UtilisationCalculatorMoleculeStep4LabeledProgressBar to visualise utilisation performance against the target value. It combines CustomProgressBar with CustomTypography to display result text and percentage labels at fixed and dynamic positions (see Figure 25).

##### Figure 25 - UtilisationCalculatorMoleculeStep4LabeledProgressBar Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep4LabeledProgressBar Figma Design.png>)

#### UtilisationCalculatorMoleculeStep4UtilisationSummaryCard

I designed UtilisationCalculatorMoleculeStep4UtilisationSummaryCard to present key calculation results in a single summary view. It uses CustomTypography for data presentation and CustomDivider to visually separate content sections (see Figure 26).

##### Figure 26 - UtilisationCalculatorMoleculeStep4UtilisationSummaryCard Figma Design

![alt text](<assets/Project Design/molecules/UtilisationCalculatorMoleculeStep4UtilisationSummaryCard Figma Design.png>)

#### UtilisationHistoryMoleculeStep1Header

I designed UtilisationHistoryMoleculeStep1Header to introduce the utilisation history section. It combines CustomTypography with CustomTooltip to explain available history actions such as viewing and deleting records (see Figure 27).

##### Figure 27- UtilisationHistoryMoleculeStep1Header Figma Design

![alt text](<assets/Project Design/molecules/UtilisationHistoryMoleculeStep1Header Figma Design.png>)

#### UtilisationHistoryMoleculeStep1HistoryCard

I designed UtilisationHistoryMoleculeStep1HistoryCard to display individual historical utilisation records. It uses CustomTypography for record details and includes a CustomButton to allow deletion of saved history entries (see Figure 28).

##### Figure 28 - UtilisationHistoryMoleculeStep1HistoryCard Figma Design

![alt text](<assets/Project Design/molecules/UtilisationHistoryMoleculeStep1HistoryCard Figma Design.png>)

### Organisms

#### CustomAppBar

I designed CustomAppBar to act as the top-level header across the application. It uses the CustomToolbar molecule to provide consistent branding and access to key actions across all application views (see Figure 29).

##### Figure 29 - CustomAppBar Figma Design

![alt text](<assets/Project Design/organisms/CustomAppBar Figma Design.png>)

#### UtilisationCalculatorOrganism (Input)

I designed UtilisationCalculatorOrganism (Input) to form the complete utilisation calculation input interface by composing the Step 1 molecules into a single, structured workflow. It combines UtilisationCalculatorMoleculeStep1Header, UtilisationCalculatorMoleculeStep1StartDate, UtilisationCalculatorMoleculeStep1EndDate, UtilisationCalculatorMoleculeStep1TotalHours, UtilisationCalculatorMoleculeStep1BillableHours, UtilisationCalculatorMoleculeStep1TargetUtilisation, and UtilisationCalculatorMoleculeStep1Buttons to guide users through data entry in a clear and validated sequence (see Figure 30).

##### Figure 30 - UtilisationCalculatorOrganism (Input) Figma Design

![alt text](<assets/Project Design/organisms/UtilisationCalculatorOrganism (Input) Figma Design.png>)

#### UtilisationCalculatorOrganism (Result)

I designed UtilisationCalculatorOrganism (Result) to present utilisation calculation outcomes by composing the Step 4 molecules into a single results view. It combines UtilisationCalculatorMoleculeStep4Header, UtilisationCalculatorMoleculeStep4LabeledProgressBar, and UtilisationCalculatorMoleculeStep4UtilisationSummaryCard to display utilisation performance, target comparison, and supporting calculation details in a clear and structured format (see Figure 31).

##### Figure 31 - UtilisationCalculatorOrganism (Result) Figma Design

![alt text](<assets/Project Design/organisms/UtilisationCalculatorOrganism (Result) Figma Design.png>)

#### UtilisationHistoryOrganism

I designed UtilisationHistoryOrganism to present historical utilisation calculations in a structured and navigable view. It combines UtilisationHistoryMoleculeStep1Header and UtilisationHistoryMoleculeStep1HistoryCard to allow users to review and manage previously saved utilisation records in a clear and consistent format (see Figure 32).

##### Figure 32 - UtilisationHistoryOrganism Figma Design

![alt text](<assets/Project Design/organisms/UtilisationHistoryOrganism Figma Design.png>)

## Final Interface Layouts

The final interface layouts demonstrate how atomic, molecular, and organism-level components are assembled into the complete Utilisation Calculator application screens across all supported devices. These layouts reflect my mobile-first responsive design approach, where core functionality is established on smaller screens and progressively enhanced as additional screen space becomes available. Layout adjustments are primarily driven by screen width, resulting in distinct interface behaviours across the supported devices:

- **Desktop (≥1024px):** Uses the full width of the screen with a side-by-side layout, allowing users to enter data and view utilisation history at the same time without the need for scrolling.

- **Laptop (768px–1023px):** Retains the two-column layout found on desktop, with adjusted spacing to suit smaller screens while keeping both the calculator and history visible together.

- **Tablet (500px–767px):** Maintains the same side-by-side layout as desktop and laptop, with tighter spacing to accommodate reduced horizontal width while keeping both sections visible at once.

- **Large Mobile (390px–499px):** Switches to a vertical layout where the calculator and utilisation history stack on top of each other, with touch-friendly spacing and scrolling enabled.

- **Small Mobile (<390px):** Uses the same vertical layout as large mobile devices, but with more compact spacing and condensed components to maximise usable screen space.

Across all breakpoints, I use the same components consistently, with layout and spacing adapting to fit the available space. Rather than changing how components work, the interface adjusts how content is arranged, ensuring the application remains clear, easy to use, and visually consistent across all devices.

### Figure 33 - Utilisation Calculator (Input) Desktop Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Desktop Device Media Screen Final Figma Design.png>)

### Figure 34 - Utilisation Calculator (Input) Laptop Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Laptop Device Media Screen Final Figma Design.png>)

### Figure 35 - Utilisation Calculator (Input) Tablet Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Tablet Device Media Screen Final Figma Design.png>)

### Figure 36 - Utilisation Calculator (Input) Large Phone Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Large Phone Device Media Screen Final Figma Design.png>)

### Figure 37 - Utilisation Calculator (Input) Small Phone Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/input/Utilisation Calculator (Input) Small Phone Device Media Screen Final Figma Design.png>)

### Figure 38 - Utilisation Calculator (Result) Desktop Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Desktop Device Media Screen Final Figma Design.png>)

### Figure 39 - Utilisation Calculator (Result) Laptop Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Laptop Device Media Screen Final Figma Design.png>)

### Figure 40 - Utilisation Calculator (Result) Tablet Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Tablet Device Media Screen Final Figma Design.png>)

### Figure 41 - Utilisation Calculator (Result) Large Phone Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Large Phone Device Media Screen Final Figma Design.png>)

### Figure 42 - Utilisation Calculator (Result) Small Phone Device Media Screen Final Figma Design

![alt text](<assets/Project Design/mediaScreens/result/Utilisation Calculator (Result) Small Phone Device Media Screen Final Figma Design.png>)

# Project Development

## Development Overview

Once project planning, management, and designs were complete, I began developing the utilisation calculator application. I initialised the project by setting up the backend folder, consisting of a GraphQL API built with Node.js and TypeScript, connected to a MongoDB database via the Prisma ORM. This backend folder served as the foundational part of the application and established a structured approach that was later replicated for the frontend and infrastructure folders. I chose this methodical approach to ensure a clear separation of concerns between folders within the codebase, enable independent development and testing, and simplify debugging and long-term maintenance by isolating functionality into distinct and manageable folders.

### Project Timeline

#### Figure 43 - Utilisation Calculator Project Timeline

![alt text](<assets/Project Development/Utilisation Calculator Project Timeline.png>)

Figure 43 is a high-level representation of the project development timeline I followed, showing the 10-stage progression from initial project governance and backend infrastructure setup, through frontend development and CI/CD pipeline implementation, to final production deployment and stabilisation.

- **1. Project & Workflow Initialisation:** During this stage I established the initial project governance by introducing standardised GitHub issue and pull request templates. This stage defined how work was proposed and tracked throughout the project lifecycle, ensuring consistent documentation from the start.

- **2. Backend Infrastructure Setup:** During this stage I created the backend folder with its core infrastructure, project structure, and development tooling. This included setting up Express with Apollo GraphQL, Prisma for database modeling, TypeScript configuration, and Prettier for code formatting to ensure consistency and maintainability across the backend folder.

- **3. Backend Business Logic Implementation:** During this stage I implemented core backend functionality through GraphQL mutations and queries. This included user initialisation, utilisation calculation with precision handling and validation, historical calculation retrieval, and deletion operations, forming the complete backbone of the application's business logic with error handling and authentication checks.

- **4. Frontend Infrastructure & Data Layer Setup:** During this stage I initialised the frontend application using React, TypeScript, and Vite, then connected it to the backend by configuring the Apollo GraphQL client with Clerk authentication middleware. I implemented reusable hooks for all backend operations, enabling the frontend to consume backend data and mutations reliably with full type safety.

- **5. UI Component Development:** During this stage I developed user interface components incrementally using an ATOMIC design approach. I created basic atoms (buttons, inputs, loaders) first, followed by more complex molecules (toolbars, form sections, cards) and organisms (calculator interface, history section, navigation), with each layer built on the previous to compose meaningful UI sections with consistent Material-UI theming.

- **6. Page Assembly & Application Structure:** During this stage I assembled reusable UI components into complete application pages and templates. I finalised global application structure, including routing configuration, internationalisation support with English translations, Material-UI date localisation, and automatic user initialisation with country detection on sign-in.

- **7. CI/CD Pipeline Implementation:** During this stage I introduced automated workflows to build, test, and deploy both frontend and backend services to Google Cloud Platform (GCP). This included GitHub Actions configuration for continuous integration, Dockerising the backend, defining infrastructure as code with Terraform, and setting up secure Workload Identity authentication between GitHub and GCP.

- **8. Workflow & Dependency Refinement:** During this stage I adjusted repository configuration and dependency management to ensure CI/CD workflows triggered correctly and ran reliably. This included restoring package lock files to version control for consistent dependency installation, cleaning up unused dependencies, and making incremental changes to trigger and validate automated builds across the production environment.

- **9. Deployment Configuration & Domain Setup:** During this stage I finalised the frontend deployment by configuring a custom domain (https://utilisationcalculator.com), completing the transition from development to a production-ready application. I updated infrastructure configuration and deployment workflows to consistently reference the custom domain instead of environment-based bucket names.

- **10. Production Deployment & Stabilisation:** During this stage I executed multiple deployment cycles to release the application to production, identifying and resolving deployment-specific issues along the way. This included fixing missing dependency installation steps in workflows, resolving Google Cloud CLI setup issues, correcting frontend asset base path configuration, and addressing component styling inheritance bugs to ensure a stable production environment.

## CI/CD Pipeline

To ensure reliable deployments, I established a set of continuous integration and deployment pipelines utilising GitHub Actions. This automated the deployment of both frontend and backend services to GCP while enabling automated code quality assurance throughout the development lifecycle. I implemented a multi-workflow approach consisting of three distinct pipelines:

### Main CI Pipeline for Code Analysis and Testing

Figure 44 shows the Main CI Pipeline for Code Analysis and Testing that triggers on pull requests to the main branch. This workflow automates code quality checks, build validation, and unit testing for both frontend and backend components before considering deployment.

#### Figure 44 - Main CI Pipeline for Code Analysis and Testing (`pipeline.yml`)

![alt text](<assets/Project Development/Main CI Pipeline for Code Analysis and Testing.png>)

### Backend Deployment Pipeline

Figure 45 shows the Backend Deployment Pipeline that handles deployment of the Node.js and TypeScript GraphQL API to GCP when backend changes are pushed to the main branch. This workflow orchestrates Docker containerisation of the backend services, executes Prisma database migrations, and implements secure Workload Identity authentication.

#### Figure 45 - Backend Deployment Pipeline (`backend-deploy.yml`)

![alt text](<assets/Project Development/Backend Deployment Pipeline.png>)

### Frontend Deployment Pipeline

Figure 46 shows the Frontend Deployment Pipeline that manages React and TypeScript frontend deployment to GCP when frontend changes are pushed to the main branch. This workflow handles build optimisation through Vite bundling, generates static assets for production distribution and manages custom domain configuration.

#### Figure 46 - Frontend Deployment Pipeline (`frontend-deploy.yml`)

![alt text](<assets/Project Development/Frontend Deployment Pipeline.png>)

## Test Driven Development

I applied Test-Driven Development (TDD) during development where appropriate. I wrote unit tests before implementing functionality, which helped clarify requirements early and provided me immediate feedback by identifying code that did not behave as expected.

### Figure 47 - CustomLoader Unit Test TDD Approach

![alt text](<assets/Project Development/CustomLoader Unit Test TDD Approach.png>)

An example of this TDD approach is shown in Figure 47, where I fixed a bug in the CustomLoader component that prevented the color prop from being applied correctly. I first wrote a unit test (see commit "aaeea79") to confirm that the component correctly inherits CSS custom properties when the color prop is set to "inherit". The test creates a mock CSS environment with custom variables to validate that CustomLoader applies the expected styling. Writing the test first helped define the intended behaviour before changing the implementation, and provided immediate validation once the bug was resolved. I implemented the fix and merged it in [PR #62](https://github.com/BeansOnToast45987/UtilisationCalculator/pull/62).

## Usability & Accessibility

To evaluate the overall quality of the application beyond core functionality, I carried out usability and accessibility assessments using Google Lighthouse, which is an automated auditing tool available within Chrome DevTools. Lighthouse generates scores across four categories; Best Practices, Accessibility, SEO and Performance which provides me with quantitative results about my application.

### Application Best Practices Audit

Figure 48 demonstrates that the application achieved a **100/100** score in the Best Practices category. This indicates that I successfully followed modern development and security recommendations. Lighthouse identified one minor improvement area: missing source maps for some large JavaScript files. This does not affect users directly, however, adding source maps would make it easier for me to debug issues and maintain the application in the production environment.

#### Figure 48 – Application Best Practices Audit Results

![alt text](<assets/Project Development/Application Best Practices Audit Results.png>)

---

### Application Accessibility Audit

Figure 49 demonstrates that the application achieved a **94/100** score in the Accessibility category. This indicates that I successfully achieved a high level of compliance with automated accessibility checks. However, Lighthouse identified two primary areas for improvement:

- **1.** Insufficient colour contrast between foreground and background elements.
- **2.** Absence of a defined main landmark within the document structure.

Fixing these issues would involve adjusting colour choices so that text is easier to read and adding a clearer page structure to help users who rely on assistive technologies navigate the application more easily. Despite these minor issues, the application passed most accessibility checks, including those related to clear labelling, adaptable layouts, and screen reader support.

#### Figure 49 – Application Accessibility Audit Results

![alt text](<assets/Project Development/Application Accessibility Audit Results.png>)

---

### Application SEO Audit

Figure 50 demonstrates that the application achieved a **91/100** score in the Search Engine Optimisation (SEO) category. This indicates that I successfully implemented most SEO best practices, although SEO is not a primary concern for this internal application. Lighthouse identified that adding a meta description would further improve how the application appears in search results.

#### Figure 50 – Application SEO Audit Results

![alt text](<assets/Project Development/Application SEO Audit Results.png>)

---

### Application Performance Audit

Figure 51 demonstrates that the application achieved an **84/100** score in the Performance category. This indicates that I successfully ensured the interface loads quickly, remains visually stable during rendering, and responds efficiently to user interactions. Lighthouse identified that initial asset loading and JavaScript bundle size could be further optimised to improve overall performance.

#### Figure 51 – Application Performance Audit Results

![alt text](<assets/Project Development/Application Performance Audit Results.png>)

# Project Evaluation

## Requirements Evaluation

### Functional Requirements Evaluation

| Req ID | Requirement                    | Has requirement been met? | How has requirement been met                                                                                                                                                                                                                                                                                   |
| ------ | ------------------------------ | ------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR-01  | User Initialisation            | ✅                        | I met FR-01 by implementing an automatic user initialisation flow using an initializeUser GraphQL mutation. I created user profiles on sign-in through a frontend initialisation component, including country detection based on browser language settings.                                                    |
| FR-02  | Utilisation Input Fields       | ✅                        | I met FR-02 by implementing dedicated input components for StartDate, EndDate, TotalHours, BillableHours, and TargetUtilisation. I assembled these into a Formik-managed form with Yup validation, supported by backend schema definitions and validation services.                                            |
| FR-03  | Calculate Action               | ✅                        | I met FR-03 by implementing a complete calculation workflow using a Calculate submit button, Formik form handling, and a frontend GraphQL hook to trigger the backend mutation. I validated input, performed the calculation, stored results, and returned utilisation and target comparison data.             |
| FR-04  | Results Display                | ✅                        | I met FR-04 by implementing a dedicated results view using UtilisationCalculatorOrganism (Result). I displayed calculation output using a labelled progress bar and a summary card with clear success or error messaging based on target achievement.                                                          |
| FR-05  | Historical Data View           | ✅                        | I met FR-05 by implementing a utilisation history view using UtilisationHistoryOrganism with a GraphQL query hook to fetch records. I displayed history using structured cards with pagination, alongside clear loading, error, and no-data states.                                                            |
| FR-06  | Delete Functionality           | ✅                        | I met FR-06 by implementing a secure deletion workflow using a DeleteUtilisation GraphQL mutation with authentication and ownership checks. I provided delete actions on each history item with loading and error handling, automatic refetching, and pagination adjustment after deletion.                    |
| FR-07  | User Profiles                  | ✅                        | I met FR-07 by implementing persistent user profile storage using a Prisma User model with unique Clerk ID constraints. I managed profile creation through the initialisation mutation and used TypeScript types to enforce consistent data handling across frontend and backend.                              |
| FR-08  | Utilisation Records Management | ✅                        | I met FR-08 by persisting utilisation records using a Prisma UtilisationCalculation model including all required fields and timestamps. I stored records through the calculation mutation and retrieved them through the history query, supported by validation services and consistent TypeScript interfaces. |
| FR-09  | Utilisation Calculation        | ✅                        | I met FR-09 by implementing the utilisation calculation formula (Billable Hours / Total Hours) \* 100 in the backend service with rounding and precision handling. I prevented invalid input such as division by zero or billable hours exceeding total hours through strict validation.                       |
| FR-10  | Target Comparison              | ✅                        | I met FR-10 by implementing target comparison logic using calculatedUtilisation >= targetUtilisation, returned as a meetsTarget boolean. I used this value throughout the UI for conditional messaging and colour-coded feedback.                                                                              |

### Non-Functional Requirements Evaluation

| Req ID | Requirement                        | Has requirement been met? | How has requirement been met                                                                                                                                                                                                                                                 |
| ------ | ---------------------------------- | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-01 | Responsive Design                  | ✅                        | I met NFR-01 by implementing a responsive, mobile-first layout that adapts across desktop, laptop, tablet, and mobile devices. I used breakpoint-based styling and layout containers to ensure the calculator and history views remain clear and usable at all screen sizes. |
| NFR-02 | Performance                        | ✅                        | I met NFR-02 by optimising performance using Apollo caching, pagination for history records, and React memoisation where appropriate. I verified performance using Lighthouse, achieving an 84/100 score.                                                                    |
| NFR-03 | Data Integrity                     | ✅                        | I met NFR-03 by ensuring data consistency through Prisma schema constraints, strongly typed GraphQL schemas, and shared TypeScript interfaces. I enforced business rules using both backend validation services and matching frontend validation logic.                      |
| NFR-04 | Accessibility                      | ✅                        | I met NFR-04 by implementing accessibility-friendly UI components with semantic structure, keyboard navigation support, and ARIA labels for key interactions. I verified accessibility using Lighthouse and achieved a 94/100 score.                                         |
| NFR-05 | Input and Business Rule Validation | ✅                        | I met NFR-05 by implementing strict input validation for date ranges, numeric values, and business rules such as billable hours not exceeding total hours. I enforced the same rules in both the frontend, using Formik and Yup, and backend validation services.            |
| NFR-06 | Database Error Handling            | ✅                        | I met NFR-06 by implementing structured database error handling across service layers and GraphQL resolvers to ensure failures are handled safely and consistently. I also accounted for common edge cases such as user initialisation race conditions.                      |
| NFR-07 | Validation Error Handling          | ✅                        | I met NFR-07 by providing clear validation feedback through consistent field-level error states and user-friendly messages. I used Formik validation behaviour to ensure errors display at the correct time and guide users in correcting their input.                       |
| NFR-08 | GraphQL Error Handling             | ✅                        | I met NFR-08 by implementing consistent GraphQL error handling across backend resolvers and frontend hooks. Errors triggered predictable UI states to ensure users received clear feedback without breaking the application workflow.                                        |
| NFR-09 | Authentication Error Feedback      | ✅                        | I met NFR-09 by implementing user-friendly authentication error messages that remain non-sensitive. I ensured authentication failures are handled cleanly across both Clerk authentication flows and API requests.                                                           |
| NFR-10 | Input Sanitisation                 | ✅                        | I met NFR-10 by sanitising and validating all user input through strict typing and validation at both the frontend and backend. This prevented invalid formats and unsafe values from reaching database operations.                                                          |

### Security Requirements Evaluation

| Req ID | Requirement                      | Has requirement been met? | How has requirement been met                                                                                                                                                                                                                      |
| ------ | -------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| SR-01  | Authentication Integration       | ✅                        | I met SR-01 by integrating Clerk authentication across both the frontend and backend. I configured the frontend to attach Clerk tokens to GraphQL requests, and I validated these tokens in the backend before processing requests.               |
| SR-02  | Authorisation and Access Control | ✅                        | I met SR-02 by enforcing user ownership checks across all GraphQL operations. I ensured users can only access, create, and delete utilisation data linked to their own authenticated account.                                                     |
| SR-03  | Token Validation                 | ✅                        | I met SR-03 by validating authentication tokens before allowing access to backend services. I verified the token format, presence, and integrity to ensure requests come from authenticated users only.                                           |
| SR-04  | Environment Security             | ✅                        | I met SR-04 by managing secrets securely using environment configuration and production secret management. I ensured required environment variables are validated at runtime and prevented sensitive values from being exposed in source control. |
| SR-05  | CORS Configuration               | ✅                        | I met SR-05 by implementing strict CORS rules on the backend to restrict API access to authorised origins only. I configured allowed domains through environment variables to prevent unauthorised cross-origin requests.                         |

## Quality Assurance and Testing Evaluation

To evaluate overall reliability and reduce incident risk, I implemented automated unit testing across both the frontend and backend. This ensured core user workflows, validation rules, and error scenarios were consistently verified throughout development and deployment.

### Frontend Testing Results

Figure 52 demonstrates that the frontend achieved 99.52% test coverage across 27 test files containing 136 individual tests, all passing successfully. These tests validate key UI behaviour including component rendering, user interaction flows, form validation, GraphQL integration, and error handling. This level of coverage gives me confidence that frontend UI behaviour remains stable and consistent.

#### Figure 52 - Frontend Test Coverage

![Frontend Test Coverage](<assets/Project Evaluation/Frontend Test Coverage.png>)

### Backend Testing Results

Figure 53 demonstrates that the backend achieved 100% test coverage across 31 test files containing 216 individual tests, all passing successfully. These tests validate GraphQL resolvers, service-layer business logic, authentication enforcement, database operations, and failure conditions to ensure the API responds predictably under both valid and invalid inputs. This level of coverage gives me confidence that backend business logic and API behaviour remain stable and reliable.

#### Figure 53 - Backend Test Coverage

![Backend Test Coverage](<assets/Project Evaluation/Backend Test Coverage.png>)

## Evaluation Summary

Overall, this evaluation demonstrates that I successfully met all functional, non-functional, and security requirements defined at the start of the project. The completed application meets the project purpose by addressing the gap in utilisation tracking within my workplace, replacing manual spreadsheet calculations with a dedicated web-based tool that supports mid-quarter utilisation calculations and projections. As a result, I am confident that this project was a success.
