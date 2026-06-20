**OFFICE MANAGEMENT SYSTEM**
*An all-in-one platform for enterprise resource planning, task allocation, and real-time internal collaboration.*

The Office Management System is a centralized full-stack ecosystem designed to streamline corporate workflows, HR administrative processing, and workplace communication.

This document outlines the backend codebase, operational logic, database schemas, and real-time event systems. The complete React user interface is maintained as a decoupled application and can be accessed at the **Office Frontend Repository** ([https://github.com/alfred1001/OfficeManagementFrontend](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/alfred1001/OfficeManagementFrontend)).

---

### TABLE OF CONTENTS

1. Overview
2. Key System Features
3. System Architecture
4. Tech Stack Matrix
5. Modules & Access Control
6. How the Workflows Operate
7. Real-Time Messaging Engine
8. Database Design & Integrity
9. Getting Started & Deployment
10. Environment Configuration

---

### 1. OVERVIEW

Modern workplaces require cohesive tooling to eliminate the friction between administrative overhead and day-to-day productivity. The Office Management System answers this by unifying HR management tasks—such as employee lifecycle tracking and structured leave handling—with custom task delegation and an immersive company-wide event engine.

To keep workflows truly agile, the ecosystem features a natively interconnected instant-chat service, ensuring teams can collaborate instantly on operational action items without ever leaving the secure platform environment.

---

### 2. KEY SYSTEM FEATURES

* **Comprehensive Employee Lifecycle Control:** Administrators can seamlessly onboard, manage, or remove employee accounts within a centralized MySQL registry.
* **Scoped Task Management Framework:** Managers can delegate objectives to team members. Standard employees receive a custom workspace focusing strictly on their explicit work items.
* **Automated HR Leave Pipeline:** Employees can submit customized leave requests directly through their portal. Administrators can review, accept, or reject requests with immediate status updates.
* **Company-Wide Event Broadcasts:** Admins can publish organization-wide notices and calendar events, pinned instantly across all user dashboards.
* **Natively Integrated Chat Suite:** Implements persistent, real-time messaging channels powered by WebSockets to allow secure, low-latency communication across the organization.

---

### 3. SYSTEM ARCHITECTURE

The ecosystem relies on a strict **Separation of Concerns (SoC)**, dividing responsibilities cleanly between the frontend client repository and this backend service engine:

```
+-------------------------------------------------------------+
|               OFFICE MANAGEMENT ECOSYSTEM                   |
+-------------------------------------------------------------+
|                                                             |
|   [FRONTEND CLIENT REPOSITORY]                              |
|   React SPA User Interface                                  |
|   URL: https://github.com/alfred1001/Office_Frontend         |
|                                                             |
+------------------------------+------------------------------+
                               |
            HTTPS REST APIs    |   Bidirectional WebSockets
            & Session Cookies  |   (Socket.io Hub)
                               |
+------------------------------v------------------------------+
|   [BACKEND SERVICE ENGINE]                                  |
|   Node.js & Express API Server                              |
|   (This Repository)                                         |
+------------------------------+------------------------------+
                               |
                               |  SQL Queries & Pool Connections
                               |
+------------------------------v------------------------------+
|   [PERSISTENCE TIER]                                        |
|   MySQL Relational Database                                 |
+-------------------------------------------------------------+

```

---

### 4. TECH STACK MATRIX

| Layer | System Technology | Purpose / Functional Role |
| --- | --- | --- |
| **Frontend UI** | React.js | Client-side views, state management, and role rendering. |
| **Runtime Core** | Node.js | Asynchronous, event-driven JavaScript server runtime. |
| **Framework Layer** | Express.js | Core HTTP request routing, middleware stack, and REST APIs. |
| **Database Tier** | MySQL | Normalized relational storage engine for business states. |
| **Real-Time Hub** | Socket.io | Full-duplex WebSockets communication gateway. |
| **Security Layer** | JWT & Bcrypt | Cryptographic session tokens and secure password hashing. |

---

### 5. MODULES & ACCESS CONTROL

#### 5.1 Administrator Workspace

The central command desk reserved for executive and HR management personnel to:

* Register new company hires and manage employee profile parameters.
* Review pending leave requests with single-click Approval/Rejection triggers.
* Allocate, categorize, and assign target-driven milestones to specific staff members.
* Create and broadcast structural corporate timelines or announcements.

#### 5.2 Employee Self-Service Panel

A focused, distraction-free environment for individual workforce members to:

* Review explicit active task assignments and mark milestones as complete.
* Draft, submit, and track the real-time processing status of personal time-off requests.
* Monitor global company updates via the unified corporate timeline calendar.

#### 5.3 Enterprise Chat Workspace

A cross-cutting service layer available across all authenticated client sessions to send and receive text nodes instantaneously and track active online/offline presences across corporate profiles.

---

### 6. HOW THE WORKFLOWS OPERATE

#### 6.1 Leave Authorization Cycle

1. An employee submits a time-off application specifying their date range and justification.
2. The submission writes to the MySQL database under a PENDING state machine flag.
3. The Admin dashboard pulls the entry via an internal API query.
4. The Admin selects Accept or Reject; the Express.js route updates the underlying row utilizing safe database locks to guarantee processing accuracy.
5. The employee's client view re-renders automatically to showcase the updated outcome.

#### 6.2 Task Isolation & View Mapping

1. A manager publishes an objective assigning it specifically to a target User ID.
2. When an employee logs in, the React client passes their secure session token to the Express backend.
3. The server validates the identity and executes a scoped relational query:
* *SELECT * FROM tasks WHERE assigned_to = USER_ID;*


4. This ensures total view isolation, keeping individual performance targets secure, focused, and contextual.

---

### 7. REAL-TIME MESSAGING ENGINE

The embedded communication framework bypasses traditional HTTP long-polling loops in favor of persistent, bidirectional transmission lines powered by **Socket.io**.

* **Connection Orchestration:** The backend server maintains an internal, live dictionary mapping authenticated user tracking identifiers directly to unique connection sockets.
* **Isolated Distribution:** When a message packet arrives, the payload is parsed, written directly to the database history tables, and echoed instantly to the targeted recipient's live connection.
* **Presence Synchronization:** As workers enter or exit the system, presence heartbeats alter data arrays without necessitating aggressive full-page database refetches.

---

### 8. DATABASE DESIGN & INTEGRITY

The storage architecture relies on an organized relational structure inside **MySQL**, emphasizing normalization to ensure performance metrics stay stable under active corporate transactional volume.

* **Relational Enforcements:** Employs strong foreign-key constraints linking the `tasks` and `leave_requests` tables directly back to the primary `employees` master entity.
* **Cascade Configurations:** Enforces structural cascading parameters (`ON DELETE CASCADE`) to clean out old associated records safely when an employee account is removed from the system registry.

---

### 9. GETTING STARTED & DEPLOYMENT

#### 9.1 Prerequisites

Verify that the host server environment has the following software installed:

* Node.js (v18.x or higher)
* NPM (v9.x or higher)
* MySQL Server instance (v8.0 or higher)

#### 9.2 Backend Installation Steps

1. Clone this backend repository locally: `git clone https://github.com/alfred1001/Office_Management_Backend.git`
2. Navigate into the backend root folder: `cd Office_Management_Backend`
3. Acquire all structural software drivers: `npm install`
4. Set up your database schema configurations inside your local MySQL instance.
5. Boot the engine listener by executing: `npm start`

#### 9.3 Frontend Connection

To attach the interactive interface to this backend service, follow the installation instructions documented at the **Office Frontend Repository** ([https://github.com/alfred1001/Office_Frontend](https://www.google.com/url?sa=E&source=gmail&q=https://github.com/alfred1001/Office_Frontend)) and point the environment configurations to this running server.

---

### 10. ENVIRONMENT CONFIGURATION

Before launching the backend engine, create a secure file named `.env` in the root directory of this project and populate it with the following parameters:

* **PORT** = 5000
* **DB_HOST** = localhost
* **DB_USER** = root
* **DB_PASS** = your_secure_password
* **DB_NAME** = office_management_db
* **JWT_SECRET** = your_highly_random_cryptographic_secret_string
