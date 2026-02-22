The views directory contains all server-side rendered frontend templates for this application.
It is built using EJS (Embedded JavaScript) and follows the MVC (Model–View–Controller) architecture in a Node.js + Express.js environment.


This folder is responsible for:

Rendering dynamic UI pages

Maintaining consistent layouts

Managing reusable UI components

Displaying backend-driven data securely


📂 Component Details

🔹 includes/

Contains shared and reusable UI components used across multiple pages to maintain consistency and reduce duplication.

Typical usage:

Navigation bar

Footer

Header

Alerts & flash messages



🔹 layouts/

Defines base layout templates that structure the overall page design.

Responsibilities:

HTML boilerplate

Common head and body structure

Ensures uniform UI across all views


🔹 listings/

Handles all listing-related frontend views.

Includes pages for:

Viewing all listings

Viewing listing details

Creating new listings

Editing existing listings


Supports full CRUD UI operations.






🔹 users/

Manages user authentication and profile interfaces.

Includes:

Login page

Registration page

User profile views

Authentication-related UI










🔹 error.ejs

A centralized error handling template that displays:

404 (Page Not Found)

500 (Server Errors)

Custom error messages


🧰 Technologies & Tools

EJS (Embedded JavaScript Templates)

HTML5

CSS3 / Bootstrap

JavaScript (ES6+)




🔄 Rendering Workflow

1. Client sends a request to the server


2. Express route/controller processes the request


3. Required data is passed to an EJS template


4. EJS renders dynamic HTML


5. Final response is delivered to the browser




🧱 Architectural Pattern

This project follows the MVC Architecture:

Model → Database logic

View → UI templates (this folder)

Controller → Application logic & routing


This separation improves:

Code maintainability

Scalability

Readability






👨‍💻 Author

Nitin Mallesham Dasari
BCA Student
GitHub: SagarDasari2829



