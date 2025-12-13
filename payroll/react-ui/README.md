# Payroll Management System - React UI

A modern React application for managing employees and their roles in a payroll system.

## Features

- 📋 View all employees
- ➕ Add new employees
- ✏️ Edit employee details
- 🗑️ Delete employees
- 🎯 Role management with validation
- 🎨 Responsive Bootstrap-based UI
- ⚡ Real-time updates

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Spring Boot backend running on `http://localhost:8080`

## Installation

1. Navigate to the react-ui directory:
```bash
cd react-ui
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Start the development server:
```bash
npm start
```

The application will open automatically at `http://localhost:3000`.

### Production Build

Create an optimized production build:
```bash
npm run build
```

## API Endpoints Used

The React application communicates with the following Spring Boot endpoints:

- **GET** `/employees` - Get all employees
- **POST** `/employees` - Add a new employee
- **GET** `/employees/{id}` - Get a specific employee
- **PUT** `/employees/{id}` - Update an employee
- **DELETE** `/employees/{id}` - Delete an employee
- **GET** `/roles` - Get all available roles

## Project Structure

```
react-ui/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── EmployeeList.js
│   │   ├── EmployeeCard.js
│   │   ├── EmployeeForm.js
│   │   └── EditEmployeeForm.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Component Overview

### EmployeeList
- Fetches and displays all employees
- Handles employee deletion
- Manages component refresh

### EmployeeCard
- Displays individual employee information
- Shows employee ID, name, and role
- Provides edit and delete buttons

### EmployeeForm
- Form for adding new employees
- Fetches available roles
- Validates form inputs

### EditEmployeeForm
- Form for editing existing employees
- Pre-populated with current employee data
- Updates employee information

## Styling

The application uses Bootstrap 5 for styling with custom CSS for additional customization.

## Technologies Used

- **React 18.2** - UI framework
- **Axios** - HTTP client for API calls
- **Bootstrap 5** - CSS framework
- **React Scripts** - Build tool

## CORS Configuration

Make sure your Spring Boot backend has CORS enabled for requests from `http://localhost:3000`. 
Add the following to your Spring Boot application if not already configured:

```java
@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

## Troubleshooting

### Connection Error to Backend
- Ensure Spring Boot application is running on `http://localhost:8080`
- Check CORS configuration in the backend
- Verify the proxy setting in `package.json`

### Roles Not Loading
- Make sure the `/roles` endpoint is available in the backend
- Check browser console for error messages

### Build Errors
- Delete `node_modules` folder
- Run `npm install` again
- Clear npm cache: `npm cache clean --force`

## License

MIT
