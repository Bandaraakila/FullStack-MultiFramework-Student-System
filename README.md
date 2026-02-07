# Full-Stack Student & Course Management System

## 1. Project Overview
This project is a comprehensive full-stack application designed to demonstrate the integration of multiple backend and frontend technologies. It follows a Microservices-style architecture where data is distributed across two different ecosystems.

The system allows users to:
*   **Manage Students:** (via ASP.NET Core & MSSQL) Perform full CRUD operations including enrollment.
*   **Manage Courses:** (via Spring Boot & MySQL) Perform full CRUD operations and view course details.
*   **Cross-Platform Integration:** The Angular and React frontends consume data from both APIs simultaneously, showcasing "Simple Mapping" to link Student Enrollments (from .NET) with Course details (from Spring Boot).

## 2. Technologies Used

### Backend Architectures
*   **ASP.NET Core 8.0 Web API:**
    *   Entity Framework Core (Database First/Code First).
    *   MSSQL Server for Student and Enrollment data.
    *   JWT (JSON Web Token) Authentication.
    *   Swagger UI for API documentation.
*   **Spring Boot (Java 17):**
    *   Spring Data JPA for ORM.
    *   MySQL for Course data.
    *   Spring Security with JWT Authentication.
    *   OpenAPI (Swagger) for documentation.

### Frontend Architectures
*   **Angular (Standalone Components):**
    *   Services-based architecture.
    *   Angular Material & Bootstrap UI.
    *   RxJS for asynchronous API handling.
*   **React (Hooks API):**
    *   Functional Components with `useState` and `useEffect`.
    *   Axios for HTTP requests.
    *   React Router for navigation.
    *   Bootstrap for responsive styling.

## 3. Setup Instructions

### Prerequisites
*   .NET 8.0 SDK
*   JDK 17 or higher
*   Node.js (v18+)
*   MSSQL Server (LocalDB or Express)
*   MySQL Server (XAMPP/Wamp or MySQL Workbench)

### Database Setup
1.  **MSSQL:** Run the provided `MSSQL_Script.sql` to create the `StudentDB` and required tables.
2.  **MySQL:** Run the provided `MySQL_Script.sql` to create the `CourseDB`.

### Backend Configuration
1.  **ASP.NET Core:**
    *   Navigate to `/backend/dotnet-api/`.
    *   Update `appsettings.json` with your MSSQL connection string.
    *   Run using run button or command: `dotnet run`
2.  **Spring Boot:**
    *   Navigate to `/backend/springboot-api/`.
    *   Update `src/main/resources/application.properties` with your MySQL username/password.
    *   Run command: `mvn spring-boot:run`

### Frontend Configuration
1.  **Angular:**
    *   Navigate to `/frontend/angular-app/`.
    *   Run `npm install`.
    *   Run `ng serve`. Access at `http://localhost:4200`.
2.  **React:**
    *   Navigate to `/frontend/react-app/`.
    *   Run `npm install`.
    *   Run `npm start`. Access at `http://localhost:3000`.

## 4. Features & Functionality
*   **Security:** Both APIs are protected by JWT. Users must click the "Auth APIs" button on the frontends to authenticate.
*   **Search/Filter:** Real-time search functionality implemented on both Students and Courses lists.
*   **Enrollment Logic:** Enrollments are stored in the MSSQL database but mapped to Course names stored in the MySQL database during frontend rendering.


