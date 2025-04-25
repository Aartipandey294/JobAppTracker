# JobAppTracker
A full-stack application to track job applications built with:

-  Backend: ASP.NET Core Web API (.NET 8) with SQLite
-  Frontend: Angular with Material UI
# Project Structure
JobAppTracker/ ── backend/ # ASP.NET Core API project 
               ── frontend/ # Angular 19 project

# Prerequisites
- [.NET 8 SDK](https://dotnet.microsoft.com/download)
- [Node.js + npm](https://nodejs.org/)
- [Angular CLI](https://angular.io/cli)

# Run the application - Backend
dotnet restore
dotnet ef database update
dotnet run
API runs at: https://localhost:7201
Swagger UI: https://localhost:7201/swagger

# Run the application - Frontend (Angular App)
cd frontend
npm install
ng serve
App runs at: http://localhost:4200

# Features
Add, update, or list job applications
Pagination on the application table
Only status and date editable during edit mode
Swagger integrated for backend API documentation
SQLite database with Entity Framework Core
Angular Material UI components
Form validation & toast notifications

# Backend Technology
ASP.NET Core Web API (.NET 8)
Entity Framework Core with SQLite
Swagger for API documentation

# Frontend Technolofy
Angular 19
Angular Material
RxJS + HttpClient
Reactive Forms

# Assumptions
Only status and dateApplied fields are editable during updates.
Backend is hosted at https://localhost:7201, and frontend communicates via CORS.
Project uses SQLite for demo purposes and ease of local development.
Minimal auth/security setup assumed for test environment.
